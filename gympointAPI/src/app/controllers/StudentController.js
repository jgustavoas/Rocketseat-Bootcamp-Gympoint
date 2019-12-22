// Usa-se o formato abaixo porque esse pacote chamado Yup não possui "export default"
import * as Yup from 'yup';
import { Op } from 'sequelize';
import Student from '../models/Student';

class StudentController {
  async index(req, res) {
    const whereLike = req.query.name ? req.query.name : '';

    const aluno = await Student.findAll({
      where: {
        name: {
          [Op.iLike]: `%${whereLike}%`,
        },
      },
      order: [['name', 'ASC']],
    });

    if (!aluno) {
      return res
        .status(400)
        .json({ error: 'Nenhum aluno localizado no cadastro!' });
    }

    // const { id, nome, email } = aluno;

    return res.json(aluno);
  }

  async select(req, res) {
    const aluno = await Student.findOne({
      where: { id: req.params.id },
    });

    if (!aluno) {
      return res
        .status(400)
        .json({ error: 'Nenhum aluno localizado no cadastro!' });
    }

    // const { id, nome, email } = aluno;

    return res.json(aluno);
  }

  async store(req, res) {
    // Usando o Yup para validar
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number().required(),
      weight: Yup.number().required(),
      height: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body.data))) {
      return res
        .status(400)
        .json({ error: 'Todos os campos são obrigatórios!' });
    }
    // fim da validação

    const alunoExistePorEmail = await Student.findOne({
      where: { email: req.body.data.email },
    });

    if (alunoExistePorEmail) {
      return res
        .status(400)
        .json({ error: 'Outro aluno já existe com esse e-mail!' });
    }

    const { id, nome, email, idade, peso, altura } = await Student.create(
      req.body.data
    );

    return res.json({ id, nome, email, idade, peso, altura });
  }

  async update(req, res) {
    // Usando o Yup para validar
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      age: Yup.number().required(),
      weight: Yup.number().required(),
      height: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Todos os campos são obrigatórios!' });
    }
    // fim da validação

    const { email } = req.body;

    const aluno = await Student.findByPk(req.params.id);

    if (email !== aluno.email) {
      const alunoExistePorEmail = await Student.findOne({
        where: { email },
      });

      if (alunoExistePorEmail) {
        return res
          .status(400)
          .json({ error: 'Outro aluno já existe com esse e-mail!' });
      }
    }

    const { id, name } = await aluno.update(req.body);

    return res.json({ id, name, email });
  }

  async delete(req, res) {
    const { id } = req.body;
    const aluno = await Student.findByPk(id);

    if (aluno) {
      await Student.destroy({
        where: {
          id,
        },
      });

      return res.json({
        sucesso: `O cadastro do aluno foi deletado com sucesso!`,
      });
    }

    return res
      .status(400)
      .json({ erro: `O cadastro do aluno não pôde ser apagado!` });
  }
}

export default new StudentController();
