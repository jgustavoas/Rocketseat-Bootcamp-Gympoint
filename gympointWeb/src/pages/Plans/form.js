import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { MdArrowBack, MdCheck } from 'react-icons/md';
import api from '~/services/api';

import { goTo, removeAttributeFrom, handleSubmit } from '~/functions/general';

export default function PlansForm() {
  const dispatch = useDispatch();

  const [plan, setPlan] = useState([]);
  const { id, title, duration, price } = plan;

  const params = new URL(document.location).searchParams;
  const planId = params.get('id') ? params.get('id') : '';

  const totalPrice = !duration || !price ? 0 : duration * price;

  useEffect(() => {
    async function planData() {
      const response = await api.get(`plans/${planId}`);

      setPlan(response.data);
    }

    if (planId !== '') {
      planData();
    }
  }, [planId]);

  return (
    <>
      <header>
        <h1>Cadastro de plano</h1>
        <aside>
          <button
            type='button'
            className='greyButton'
            onClick={() => goTo('plans')}
          >
            <MdArrowBack size={16} color='#ee4d64' /> VOLTAR
          </button>
          <button
            type='button'
            onClick={() =>
              handleSubmit(
                dispatch,
                'plans',
                planId,
                { title, duration, price },
                [
                  ['title', 'text'],
                  ['duration', 'number'],
                  ['price', 'text'],
                ]
              )
            }
          >
            <MdCheck size={16} color='#fff' /> SALVAR
          </button>
        </aside>
      </header>
      <div>
        <form>
          <label htmlFor='name'>NOME DO PLANO</label>
          <input
            onChange={event =>
              setPlan({
                id,
                title: event.target.value,
                duration,
                price,
              })
            }
            onFocus={() => removeAttributeFrom('title')}
            value={title}
            type='text'
            name='title'
            id='title'
          />
          <div>
            <div>
              <label htmlFor='name'>MESES DE DURAÇÃO</label>
              <input
                onChange={event =>
                  setPlan({
                    id,
                    title,
                    duration: event.target.value,
                    price,
                  })
                }
                onFocus={() => removeAttributeFrom('duration')}
                value={duration}
                type='number'
                name='duration'
                id='duration'
              />
            </div>
            <div>
              <label htmlFor='name'>PREÇO MENSAL (R$)</label>
              <input
                onChange={event =>
                  setPlan({
                    id,
                    title,
                    duration,
                    price: event.target.value,
                  })
                }
                value={price}
                onFocus={() => removeAttributeFrom('price')}
                type='text'
                name='price'
                id='price'
              />
            </div>
            <div>
              <label htmlFor='name'>PREÇO TOTAL (R$)</label>
              <input
                disabled='disabled'
                value={totalPrice}
                type='text'
                name='totalPrice'
                id='totalPrice'
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
