import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Student from '../models/Student';
import HelpOrder from '../models/HelpOrder';
import HelpOrderSchema from '../schemas/HelpOrder';

// import Mail from '../../lib/Mail'; usando dentro com a biblioteca Queue

import Queue from '../../lib/Queue';
import HelpOrderReplyMail from '../jobs/HelpOrderReplyMail';

class MyHelpOrderController {
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

    const pedidoDeAjuda = await HelpOrder.findAll({
      where: { student_id: id },
      order: [['id', 'DESC']],
    });

    return res.json(pedidoDeAjuda);
  }

  async read(req, res) {
    const { id, hId } = req.params;
    const pedidoDeAjuda = await HelpOrder.findOne({
      where: { id: hId, student_id: id },
    });

    return res.json(pedidoDeAjuda);
  }

  async store(req, res) {
    const { id } = req.params;
    const { question } = req.body;

    const alunoExiste = await Student.findOne({
      where: { id },
    });
    if (!alunoExiste) {
      return res.status(400).json({
        erro: `Aluno não identificado!`,
      });
    }

    const { name, email } = alunoExiste;

    await HelpOrder.create({ student_id: id, question });

    const estePedido = await HelpOrder.findOne({
      where: { student_id: id },
      order: [['id', 'DESC']],
      limit: 1,
    });

    const question_id = estePedido.id;

    /**
     * Guardar o pedido de ajuda no MongoDB
     */
    await HelpOrderSchema.create({
      question,
      question_id,
      student_id: id,
      student: name,
      email,
    });

    return res.json({ ok: `Pedido de ajuda realizado com sucesso!` });
  }
}

export default new MyHelpOrderController();
