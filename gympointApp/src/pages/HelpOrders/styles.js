import { Platform } from 'react-native';
import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import Button from '~/components/Button';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'position',
})`
  flex: 1;
  padding: 20px;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #333;
  font-weight: bold;
  align-self: center;
  margin-top: 30px;
  margin-bottom: 15px;
`;

export const HelpOrderButton = styled(Button)`
  margin-top: 5px;
  margin-bottom: 20px;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 0, paddingTop: 0 },
})`
  margin-bottom: ${props => (props.answerPage ? '0' : '72px')};
`;

export const ScrollContainer = styled.View`
  height: auto;
  padding: 4px 1px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #fff;
`;

export const ButtonContainer = styled(RectButton)`
  height: auto;
  margin-bottom: 10px;
`;

export const ItemContainer = styled.View`
  height: auto;
  max-height: ${props => (props.answerPage ? 'auto' : '176px')};
  background: #fff;
  border-radius: 4px;
  border: ${props => (props.answerPage ? 'none' : '1px solid #ddd')};
  padding: 24px;
`;

export const ItemContainerHeader = styled.View`
  display: ${props => (props.content ? 'flex' : 'none')};
  flex: 1;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  margin-top: ${props => (props.answerText ? '24px' : '0')};
`;
export const ItemContainerHeaderLeft = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 180px;
`;
export const ItemContainerHeaderLeftText = styled.Text`
  color: ${props => (props.content ? '#42cb59' : '#777')};
  font-size: 14px;
  margin-left: 4px;
  font-weight: bold;
`;
export const ItemContainerHeaderRight = styled.Text`
  color: #777;
  font-size: 14px;
  width: 150px;
  text-align: right;
`;

export const HelpOrderText = styled.Text`
  color: #999;
  ${props => !props.content && 'display: none'};
  font-size: 16px;
  text-align: justify;
  line-height: 24px;
`;

export const Input = styled.TextInput`
  background: #fff;
  border-radius: 4px;
  border: 1px solid #ddd;
  color: #777;
  margin-bottom: 16px;
  padding: 16px;
  font-size: 16px;
`;
