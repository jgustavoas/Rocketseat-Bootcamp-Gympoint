import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';

import { request } from '~/store/modules/data/actions';

export default function Dashboard() {
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

  const [disabled, setDisabled] = useState(false);

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

  function displayToggleSwitch(hiding, showing) {
    const toHide = document.getElementById(hiding);
    const toShow = document.getElementById(showing);

    toShow.style.display = 'block';
    toHide.style.display = 'none';

    setAnswer('');
    if (disabled) setDisabled(false);
  }

  function handleSubmit(page, id, formData) {
    const action = id
      ? request('UPDATE', page, {
          id,
          formData,
        })
      : request('CREATE', page, formData);
    dispatch(action);

    setDisabled(true);
  }

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
            value={answer}
            disabled={disabled}
            onChange={event => setAnswer(event.target.value)}
            placeholder='Resposta da equipe Gympoint...'
          />
          <div>
            <button
              disabled={disabled}
              onClick={() => handleSubmit('help-orders', mongoID, { answer })}
              type='button'
            >
              Enviar a resposta
            </button>
            <button
              className='greyButton'
              type='button'
              onClick={function() {
                loadHelpOrders();
                displayToggleSwitch('helpOrderForm', 'helpOrderTable');
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
                    onClick={function() {
                      displayToggleSwitch('helpOrderTable', 'helpOrderForm');
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
