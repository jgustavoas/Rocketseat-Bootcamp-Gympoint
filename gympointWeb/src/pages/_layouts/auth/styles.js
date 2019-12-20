import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #ebebeb;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 250px;
  height: auto;
  background: #fff;
  text-align: center;
  border-radius: 4px;
  padding-top: 25px;
  padding-bottom: 25px;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;

    label {
      align-self: flex-start;
      margin-left: 25px;
      margin-top: 25px;
      font-size: 12px;
      font-weight: bold;
      color: #777;
    }

    input {
      background: #fff;
      border: 1px solid #eee;
      border-radius: 4px;
      width: 210px;
      height: 33px;
      padding: 0 15px;
      color: rgba(0, 0, 0, 0.3);
      margin: 0;

      &::placeholder {
        color: rgba(0, 0, 0, 0.3);
      }
    }

    span {
      color: #f27894;
      align-self: flex-start;
      margin-left: 25px;
      font-size: 12px;
      font-weight: bold;
    }

    button {
      margin: 25px 0 0;
      height: 33px;
      width: 210px;
      background: #ee4d64;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 14px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.05, '#ee4d64')};
      }
    }

    a {
      color: #ee4d64;
      margin-top: 15px;
      font-size: 16px;
      opacity: 0.8;

      &:hover {
        opacity: 1;
      }
    }
  }
`;
