import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import logo from '~/assets/logo.png';

import { signInRequest } from '~/store/modules/auth/actions';

import { Container, Logo, Form, FormInput, SubmitButton } from './styles';

export default function SignIn() {
  const dispatch = useDispatch();

  const [matriculation, setMatriculation] = useState('');

  // "useSelector" para selecionar o state "loading" que está no reducer de autenticação ("auth")
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit() {
    dispatch(signInRequest(matriculation));
  }

  return (
    <Container>
      <Logo source={logo} />
      <Form>
        <FormInput
          keyboardType="numeric"
          placeholder="Informe o ID da sua matrícula"
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
          value={matriculation}
          onChangeText={setMatriculation}
        />

        <SubmitButton loading={loading} onPress={handleSubmit}>
          Entrar no sistema
        </SubmitButton>
      </Form>
    </Container>
  );
}
