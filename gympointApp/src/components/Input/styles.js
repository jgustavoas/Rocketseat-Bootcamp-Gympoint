import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 0 5px;
  height: 46px;
  background: #fff;
  border-radius: 4px;
  border: 1px solid #ccc;

  flex-direction: row;
  align-items: center;
`;

export const TextInput = styled.TextInput.attrs({
  placeholderTextColor: '#777',
})`
  flex: 1;
  font-size: 15px;
  margin-left: 10px;
  color: #777;
`;
