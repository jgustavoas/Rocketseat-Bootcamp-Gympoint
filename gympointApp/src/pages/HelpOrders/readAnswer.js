import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';

import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';

import {
  Container,
  ScrollContainer,
  List,
  ItemContainer,
  ItemContainerHeader,
  ItemContainerHeaderLeft,
  ItemContainerHeaderLeftText,
  ItemContainerHeaderRight,
  HelpOrderText,
} from './styles';

import Background from '~/components/Background';

import api from '~/services/api';

function HelpOrder({ isFocused, navigation }) {
  const id = useSelector(state => state.auth.id);

  const { hoId } = navigation.state.params;

  const [helpOrder, setHelpOrder] = useState([]);

  async function loadHelpOrder(student_id, helpOrderId) {
    const response = await api.get(
      `students/${student_id}/my-help-orders/${helpOrderId}`
    );
    const { data } = response;

    const read = {
      ...data,
      formattedCreatedAt: formatRelative(parseISO(data.createdAt), new Date(), {
        locale: pt,
        addSuffix: true,
      }),
      formattedUpdateddAt: formatRelative(
        parseISO(data.createdAt),
        new Date(),
        {
          locale: pt,
          addSuffix: true,
        }
      ),
    };

    setHelpOrder([read]);
  }

  useEffect(() => {
    if (isFocused) {
      loadHelpOrder(id, hoId);
    }
  }, [hoId, id, isFocused]);

  return (
    <Background>
      <Container>
        <ScrollContainer>
          <List
            answerPage
            data={helpOrder}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <ItemContainer answerPage>
                <ItemContainerHeader content={item.question}>
                  <ItemContainerHeaderLeft>
                    <ItemContainerHeaderLeftText>
                      SUA PERGUNTA
                    </ItemContainerHeaderLeftText>
                  </ItemContainerHeaderLeft>
                  <ItemContainerHeaderRight>
                    {item.formattedCreatedAt}
                  </ItemContainerHeaderRight>
                </ItemContainerHeader>
                <HelpOrderText content>{item.question}</HelpOrderText>

                <ItemContainerHeader content={item.answer} answerText>
                  <ItemContainerHeaderLeft>
                    <ItemContainerHeaderLeftText>
                      NOSSA RESPOSTA
                    </ItemContainerHeaderLeftText>
                  </ItemContainerHeaderLeft>
                  <ItemContainerHeaderRight>
                    {item.formattedUpdateddAt}
                  </ItemContainerHeaderRight>
                </ItemContainerHeader>
                <HelpOrderText content={item.answer}>
                  {item.answer}
                </HelpOrderText>
              </ItemContainer>
            )}
          />
        </ScrollContainer>
      </Container>
    </Background>
  );
}

export default withNavigationFocus(HelpOrder);
