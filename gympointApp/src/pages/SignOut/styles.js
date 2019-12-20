import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
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

export const CheckinButton = styled(Button)`
  margin-top: 5px;
  margin-bottom: 20px;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 0, paddingTop: 0 },
})``;

export const ItemContainer = styled.View`
  height: 48px;
  background: #fff;
  border-radius: 4px;
  border: 1px solid #ddd;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;

export const CheckinNumber = styled.Text`
  color: #333;
  font-weight: bold;
  font-size: 16px;
`;

export const CheckinDate = styled.Text`
  color: #777;
  font-size: 16px;
`;
