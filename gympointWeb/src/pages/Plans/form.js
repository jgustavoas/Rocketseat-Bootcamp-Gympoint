import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { MdArrowBack, MdCheck } from 'react-icons/md';
import api from '~/services/api';

import { request } from '~/store/modules/data/actions';

import history from '~/services/history';

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

  /* function handleSubmit(planFormData) {
    const { title, duration, price } = planFormData;
    const action = planId
      ? updatePlanRequest(planFormData)
      : newPlanRequest({ title, duration, price });
    dispatch(action);
  } */

  /* function handleSubmit(formData) {
    const { title, duration, price } = formData;
    const action = planId
      ? request('UPDATE', 'plans', {
          id: planId,
          rest: { title, duration, price },
        })
      : request('CREATE', 'plans', { title, duration, price });
    dispatch(action);
  } */

  /* function handleSubmit(page, id, formData) {
    const action = id
      ? request('UPDATE', page, {
          id,
          rest: formData,
        })
      : request('CREATE', page, formData);
    dispatch(action);
  } */

  function handleSubmit(page, id, formData) {
    const action = id
      ? request('UPDATE', page, {
          id,
          formData,
        })
      : request('CREATE', page, formData);
    dispatch(action);
  }

  function goTo(page) {
    history.push(`/${page}`);
  }

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
              handleSubmit('plans', planId, { title, duration, price })
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
                value={duration}
                type='text'
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
