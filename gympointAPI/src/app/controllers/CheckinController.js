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
        const intervalo4 = eachDayOfInterval({
          start: checkins[4].createdAt,
          end: checkins[3].createdAt,
        });
        const intervalo3 = eachDayOfInterval({
          start: checkins[3].createdAt,
          end: checkins[2].createdAt,
        });
        const intervalo2 = eachDayOfInterval({
          start: checkins[2].createdAt,
          end: checkins[1].createdAt,
        });
        const intervalo1 = eachDayOfInterval({
          start: checkins[1].createdAt,
          end: checkins[0].createdAt,
        });

        if (
          intervalo4.length <= 2 &&
          intervalo3.length <= 2 &&
          intervalo2.length <= 2 &&
          intervalo1.length <= 2
        ) {
          return res.status(200).json({
            impedido: `Você já fez 5 checkins dentro de cinco dias seguidos!`,
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
