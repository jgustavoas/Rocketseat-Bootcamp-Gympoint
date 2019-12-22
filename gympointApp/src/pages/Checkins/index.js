import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';

import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';

import {
  Container,
  CheckinButton,
  List,
  ItemContainer,
  CheckinNumber,
  CheckinDate,
} from './styles';

import Background from '~/components/Background';

function Checkins({ isFocused }) {
  const id = useSelector(state => state.auth.id);

  const [checkins, setCheckins] = useState([]);
  const [loading, setLoading] = useState(false);

  const buttonText = `Novo check-in`;

  async function loadCheckins(student_id) {
    const response = await api.get(`students/${student_id}/checkins`);
    const { data } = response;

    setCheckins(
      data.map(checkin => ({
        ...checkin,
        formattedCreatedAt: formatRelative(
          parseISO(checkin.createdAt),
          new Date(),
          {
            locale: pt,
            addSuffix: true,
          }
        ),
        numberOfCheckin: data.indexOf(checkin) + 1,
      }))
    );
  }

  useEffect(() => {
    if (isFocused) {
      loadCheckins(id);
    }
  }, [id, isFocused]);

  async function handleCheckin() {
    setLoading(true);
    const response = await api.post(`students/${id}/checkins`);

    if (response.data.benvindo) {
      Alert.alert('Benvindo!', 'Check-in realizado com sucesso.');
    } else {
      Alert.alert(
        'Impedido',
        'Você já fez cinco check-ins em cinco dias seguidos.'
      );
    }

    loadCheckins(id);
    setLoading(false);
  }

  return (
    <Background>
      <Container>
        <CheckinButton loading={loading} onPress={handleCheckin}>
          {buttonText}
        </CheckinButton>

        <List
          data={checkins}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <ItemContainer>
              <CheckinNumber>Check-in #{item.numberOfCheckin}</CheckinNumber>
              <CheckinDate>{item.formattedCreatedAt}</CheckinDate>
            </ItemContainer>
          )}
        />
      </Container>
    </Background>
  );
}

export default withNavigationFocus(Checkins);
