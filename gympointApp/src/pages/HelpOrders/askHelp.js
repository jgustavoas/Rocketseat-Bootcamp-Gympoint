import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { Container, HelpOrderButton, Input } from './styles';

import Background from '~/components/Background';

import api from '~/services/api';

export default function AskHelp() {
  const id = useSelector(state => state.auth.id);

  const [myAskForHelp, setMyAskForHelp] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    const response = await api.post(`/students/${id}/my-help-orders`, {
      question: myAskForHelp,
    });

    if (response.data.ok) {
      setMyAskForHelp('');
      Alert.alert(
        'Pedido de ajuda enviado!',
        'Nossa equipe responderá o seu pedido de ajuda em breve.'
      );
    } else {
      Alert.alert('Erro', 'Pedido não enviado. Tente novamente mais tarde.');
    }

    setLoading(false);
  }

  return (
    <Background>
      <Container>
        <Input
          multiline
          editable
          numberOfLines={8}
          textAlignVertical="top"
          placeholder="Escreva seu pedido de ajuda aqui."
          onChangeText={setMyAskForHelp}
          value={myAskForHelp}
        />
        <HelpOrderButton loading={loading} onPress={handleSubmit}>
          Enviar pedido
        </HelpOrderButton>
      </Container>
    </Background>
  );
}
