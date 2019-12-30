import { eachDayOfInterval } from 'date-fns';
import Checkin from '../models/Checkin';
import Matriculation from '../models/Matriculation';
import Student from '../models/Student';

class CheckinController {
  async index(req, res) {
    const { id } = req.params;

    const alunoExiste = await Student.findOne({
      where: { id },
    });
    if (!alunoExiste) {
      return res.status(400).json({
        erro: `Aluno não identificado!`,
      });
    }

    const alunoMatriculado = await Matriculation.findOne({
      where: { student_id: id },
    });

    if (!alunoMatriculado) {
      return res.status(401).json({
        forbidden: `Aluno não matriculado!`,
      });
    }

    const checkins = await Checkin.findAll({
      where: { student_id: id },
      order: [['id', 'DESC']],
    });

    return res.json(checkins);
  }

  async store(req, res) {
    const { id } = req.params;

    const alunoExiste = await Student.findOne({
      where: { id },
    });
    if (!alunoExiste) {
      return res.status(400).json({
        erro: `Aluno não identificado!`,
      });
    }

    const alunoMatriculado = await Matriculation.findOne({
      where: { student_id: id },
    });

    if (!alunoMatriculado) {
      return res.status(401).json({
        forbidden: `Checkin não permitido para aluno não matriculado!`,
      });
    }

    const checkins = await Checkin.findAll({
      where: { student_id: id },
      order: [['createdAt', 'DESC']],
      limit: 5,
    });

    if (checkins.length > 0) {
      const quantosCheckins = checkins.length;

      if (quantosCheckins === 5) {
        const intervalo = eachDayOfInterval({
          start: checkins[4].createdAt,
          end: new Date(),
        });

        if (intervalo.length <= 7) {
          return res.status(200).json({
            impedido: `Você já fez 5 checkins dentro sete dias!`,
          });
        }
      }

      await Checkin.create({ student_id: id });

      return res.json({
        benvindo: `Checkin realizado com sucesso!`,
      });
    }

    await Checkin.create({ student_id: id });

    return res.json({
      benvindo: `Checkin realizado com sucesso! Este é o seu primeiro checkin.`,
    });
  }
}

export default new CheckinController();
