import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';

import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Container,
  HelpOrderButton,
  List,
  ButtonContainer,
  ItemContainer,
  ItemContainerHeader,
  ItemContainerHeaderLeft,
  ItemContainerHeaderLeftText,
  ItemContainerHeaderRight,
  HelpOrderText,
} from './styles';

import Background from '~/components/Background';

import api from '~/services/api';

function HelpOrders({ isFocused, navigation }) {
  const id = useSelector(state => state.auth.id);

  const [helpOrders, setHelpOrders] = useState([]);

  const buttonText = `Pedir auxílio`;

  async function loadHelpOrders(student_id) {
    const response = await api.get(`students/${student_id}/my-help-orders`);
    const { data } = response;

    setHelpOrders(
      data.map(helpOrder => ({
        ...helpOrder,
        formattedCreatedAt: formatRelative(
          parseISO(helpOrder.createdAt),
          new Date(),
          {
            locale: pt,
            addSuffix: true,
          }
        ),
      }))
    );
  }

  useEffect(() => {
    if (isFocused) {
      loadHelpOrders(id);
    }
  }, [id, isFocused]);

  return (
    <Background>
      <Container>
        <HelpOrderButton onPress={() => navigation.navigate('AskHelp')}>
          {buttonText}
        </HelpOrderButton>

        <List
          data={helpOrders}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <ButtonContainer
              onPress={() =>
                navigation.navigate('ReadAnswer', { hoId: item.id })
              }
            >
              <ItemContainer>
                <ItemContainerHeader content>
                  <ItemContainerHeaderLeft>
                    <Icon
                      name="check-circle"
                      size={16}
                      color={item.answer ? '#42cb59' : '#777'}
                    />
                    <ItemContainerHeaderLeftText content={item.answer}>
                      {item.answer ? 'Respondido' : 'Sem resposta'}
                    </ItemContainerHeaderLeftText>
                  </ItemContainerHeaderLeft>
                  <ItemContainerHeaderRight>
                    {item.formattedCreatedAt}
                  </ItemContainerHeaderRight>
                </ItemContainerHeader>
                <HelpOrderText content numberOfLines={4}>
                  {item.question}
                </HelpOrderText>
              </ItemContainer>
            </ButtonContainer>
          )}
        />
      </Container>
    </Background>
  );
}

export default withNavigationFocus(HelpOrders);
