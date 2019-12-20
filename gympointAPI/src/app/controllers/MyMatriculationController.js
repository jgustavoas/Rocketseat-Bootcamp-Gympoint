import Matriculation from '../models/Matriculation';

class MyMatriculationController {
  async signin(req, res) {
    const aluno = await Matriculation.findOne({
      where: { id: req.body.id },
    });

    if (!aluno) {
      return res.status(400).json({ error: 'Número inválido de matrícula' });
    }

    // const { id, nome, email } = aluno;

    return res.json(aluno);
  }
}

export default new MyMatriculationController();
