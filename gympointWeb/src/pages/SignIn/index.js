/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.png';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido!')
    .required('O seu e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  // Nos parâmetros de "handleSubmit", desestruturar 'data', que vem do formulário
  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img src={logo} width={108} alt='GoBarber' />

      <Form schema={schema} onSubmit={handleSubmit}>
        <label htmlFor='email'>SEU E-MAIL</label>
        <Input type='email' name='email' id='email' placeholder='Seu e-mail' />
        <label htmlFor='password'>SUA SENHA</label>
        <Input
          type='password'
          name='password'
          id='password'
          placeholder='Sua senha secreta'
        />

        <button type='submit'>{loading ? 'Carregando...' : 'Acessar'}</button>
      </Form>
    </>
  );
}
