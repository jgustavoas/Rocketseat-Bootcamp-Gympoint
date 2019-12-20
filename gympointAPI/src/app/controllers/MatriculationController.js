import * as Yup from 'yup';
import { addMonths, parseISO } from 'date-fns';
import { zonedTimeToUtc, format } from 'date-fns-tz';
import pt from 'date-fns/locale/pt';
import { Op } from 'sequelize';

import Student from '../models/Student';
import Plan from '../models/Plan';
import Matriculation from '../models/Matriculation';

class MatriculationController {
  async index(req, res) {
    // Testando variáveis com acentuação
    const matrículas = await Matriculation.findAll({
      attributes: [
        'id',
        'student_id',
        'plan_id',
        'start_date',
        'end_date',
        'price',
        'active',
      ],
      include: [
        {
          model: Student,
          as: 'students',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Plan,
          as: 'plans',
          attributes: ['id', 'title', 'duration'],
        },
      ],
      where: {
        student_id: {
          [Op.ne]: null,
        },
        plan_id: {
          [Op.ne]: null,
        },
      },
      order: [['id', 'ASC']],
    });
    return res.json(matrículas);
  }

  async select(req, res) {
    const matrícula = await Matriculation.findOne({
      attributes: [
        'id',
        'student_id',
        'plan_id',
        'start_date',
        'end_date',
        'price',
        'active',
      ],
      include: [
        {
          model: Student,
          as: 'students',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Plan,
          as: 'plans',
          attributes: ['id', 'title', 'duration'],
        },
      ],
      where: {
        id: req.params.id,
      },
    });

    return res.json(matrícula);
  }

  async store(req, res) {
    // Usando o Yup para validar
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body.data))) {
      return res
        .status(400)
        .json({ error: 'Todos os campos são obrigatórios!' });
    }
    // fim da validação

    const { student_id, plan_id, start_date } = req.body.data;

    const start_dateFormat = format(
      zonedTimeToUtc(parseISO(start_date), 'Europe/London'),
      'yyyy-MM-dd 00:00:01.000',
      {
        locale: pt,
      }
    );

    const qualPlano = await Plan.findOne({
      where: { id: plan_id },
    });

    if (!qualPlano) {
      return res.status(400).json({ erro: 'Plano não localizado!' });
    }

    const { duration, price } = qualPlano;

    const precoTotal = price * duration;

    const end_date = addMonths(new Date(start_dateFormat), duration);

    const matriculaExiste = await Matriculation.findOne({
      where: { student_id },
    });

    if (matriculaExiste) {
      return res
        .status(400)
        .json({ error: `Esse aluno já está matriculado em um plano!` });
    }

    const inserirDados = {
      student_id,
      plan_id,
      start_date,
      end_date,
      price: precoTotal,
    };

    await Matriculation.create(inserirDados);

    return res.json({ inserirDados });
  }

  async update(req, res) {
    // Usando o Yup para validar
    const schema = Yup.object().shape({
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Todos os campos são obrigatórios!' });
    }
    // fim da validação Yup

    const { student_id, plan_id, start_date } = req.body;

    const start_dateFormat = format(
      zonedTimeToUtc(parseISO(start_date), 'Europe/London'),
      'yyyy-MM-dd 00:00:01.000',
      {
        locale: pt,
      }
    );

    const alunoMatriculado = await Matriculation.findOne({
      where: { student_id },
    });
    if (!alunoMatriculado) {
      return res
        .status(400)
        .json({ erro: 'Aluno não matriculado em um plano!' });
    }

    const matriculaDoAluno = alunoMatriculado.id;

    const qualPlano = await Plan.findOne({
      where: { id: plan_id },
    });

    if (!qualPlano) {
      return res.status(400).json({ erro: 'Plano não localizado!' });
    }

    const { duration, price } = qualPlano;

    const precoTotal = price * duration;

    const end_date = addMonths(new Date(start_dateFormat), duration);

    const inserirDados = {
      student_id,
      plan_id,
      start_date,
      end_date,
      price: precoTotal,
    };

    await Matriculation.update(inserirDados, {
      where: { id: matriculaDoAluno },
    });

    return res.json({ inserirDados });
  }

  async delete(req, res) {
    const { id } = req.body;
    const alunoMatriculado = await Matriculation.findOne({
      where: { student_id: id },
    });

    if (!alunoMatriculado) {
      return res.status(400).json({ erro: 'O aluno não está matriculado!' });
    }

    await Matriculation.destroy({
      where: {
        student_id: id,
      },
    });

    return res.json({
      sucesso: `O aluno foi desmatriculado com sucesso.`,
    });
  }
}

export default new MatriculationController();
