import { zonedTimeToUtc, format } from 'date-fns-tz';
import pt from 'date-fns/locale/pt';
import Student from '../models/Student';
import HelpOrder from '../models/HelpOrder';
import HelpOrderSchema from '../schemas/HelpOrder';

import HelpOrderReplyMail from '../jobs/HelpOrderReplyMail';
import Queue from '../../lib/Queue';

class HelpOrderController {
  async index(req, res) {
    // No mongoDB a parte de ordenação, os limites de exibição etc. dos resultados é feita...
    // ...com uma sequência de métodos encadeados ("chaining") por pontos.
    const pedidoDeAjuda = await HelpOrderSchema.find({
      read: false,
    })
      .sort({ createdAt: 'desc' })
      .limit(20);

    return res.json(pedidoDeAjuda);
  }

  async select(req, res) {
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
    });

    return res.json(pedidoDeAjuda);
  }

  async read(req, res) {
    const { id } = req.params;

    const pedidoExiste = await HelpOrder.findOne({
      where: { id },
    });
    if (!pedidoExiste) {
      return res.status(400).json({
        erro: `Pedido de ajuda não localizado!`,
      });
    }

    const pedidoNoMongo = await HelpOrderSchema.findOne({
      read: false,
      question_id: id,
    });

    const dadosDoPedido = { pedidoExiste, pedidoNoMongo };

    return res.json(dadosDoPedido);
  }

  async reply(req, res) {
    const pedidoDeAjuda = await HelpOrderSchema.findOne({
      read: false,
      _id: req.params.id,
    });

    const { question_id } = pedidoDeAjuda;

    const { answer } = req.body;

    const enviarResposta = await Queue.add(HelpOrderReplyMail.key, {
      pedidoDeAjuda,
      answer,
      pt,
    });

    if (enviarResposta) {
      const marcarComoLido = await HelpOrderSchema.findByIdAndUpdate(
        req.params.id,
        { read: true },
        { new: true }
      );

      const answerDateFormat = format(
        zonedTimeToUtc(new Date(), 'Europe/London'),
        'yyyy-MM-dd HH:mm:ss.000',
        {
          locale: pt,
        }
      );

      await HelpOrder.update(
        {
          answer,
          answer_at: answerDateFormat,
        },
        {
          where: { id: question_id },
        }
      );

      return res.json(marcarComoLido);
    }
    return res.status(400).json({ erro: 'Resposta não enviada' });
  }
}

export default new HelpOrderController();
