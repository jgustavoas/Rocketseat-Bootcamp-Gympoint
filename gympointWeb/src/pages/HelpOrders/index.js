import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';

import { removeAttributeFrom, handleSubmit } from '~/functions/general';
import { dispatchToggle, displayToggleSwitch } from '~/functions/helporders';

export default function HelpOrders() {
  const dispatch = useDispatch();

  const [helpOrders, setHelpOrders] = useState([]);
  const [student, setStudent] = useState({
    read: false,
    mongoID: null,
    studentName: null,
    studentQuestion: null,
    questionDate: format(new Date(), 'yyyy-MM-dd', {
      locale: pt,
    }),
  });
  const { mongoID, studentName, studentQuestion, questionDate } = student;
  const [answer, setAnswer] = useState('');

  const disabled = useSelector(state => state.data.disabled);

  const callback = () => setAnswer('');

  const questionDateFormat = format(
    parseISO(questionDate),
    "dd 'de' MMMM 'de' yyyy",
    {
      locale: pt,
    }
  );

  async function loadHelpOrders() {
    const response = await api.get('help-orders');
    setHelpOrders(response.data);
  }

  useEffect(() => {
    loadHelpOrders();
  }, []);

  return (
    <>
      <header>
        <h1>Pedidos de ajuda</h1>
      </header>
      <div>
        <form id='helpOrderForm' style={{ display: 'none', marginTop: 0 }}>
          <span>Em {questionDateFormat}</span>
          <h2>{studentName} perguntou:</h2>
          <p>{studentQuestion}</p>
          <textarea
            id='answerText'
            name='answerText'
            value={answer}
            disabled={disabled}
            onClick={() => dispatchToggle(false, dispatch)}
            onChange={event => setAnswer(event.target.value)}
            onFocus={() => removeAttributeFrom('answerText')}
            placeholder='Resposta da equipe Gympoint...'
          />
          <div>
            <button
              disabled={disabled}
              onClick={() => {
                handleSubmit(dispatch, 'help-orders', mongoID, { answer }, [
                  ['answerText', 'textarea'],
                ]);
              }}
              type='button'
            >
              Enviar a resposta
            </button>
            <button
              className='greyButton'
              type='button'
              onClick={() => {
                loadHelpOrders();
                displayToggleSwitch(
                  'helpOrderForm',
                  'helpOrderTable',
                  dispatch,
                  callback
                );
              }}
            >
              Voltar para todos os pedidos
            </button>
          </div>
        </form>
        <table id='helpOrderTable' style={{ width: '100%' }}>
          <thead>
            <td>ALUNO</td>
            <td />
          </thead>
          <tbody>
            {helpOrders.map(helpOrder => (
              <tr>
                <td style={{ width: '100%' }}>{helpOrder.student}</td>
                <td>
                  <button
                    onClick={() => {
                      displayToggleSwitch(
                        'helpOrderTable',
                        'helpOrderForm',
                        dispatch,
                        callback
                      );
                      setStudent({
                        read: helpOrder.read,
                        mongoID: helpOrder._id,
                        studentName: helpOrder.student,
                        studentQuestion: helpOrder.question,
                        questionDate: helpOrder.createdAt,
                      });
                    }}
                    type='button'
                    className='blueMinimalButton'
                  >
                    responder
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
