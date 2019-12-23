import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
`;
export const Content = styled.div`
  height: 65px;
  max-width: 1024px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #eee;
    }

    a {
      font-weight: bold;
      color: #444;
      margin-right: 15px;
    }
  }

  aside {
    display: flex;
    align-items: center;

    button {
      border: 0;
      background: 0;
      font-size: 12px;

      &.blueMinimalButton {
        color: #298dba;
      }
      &.redMinimalButton {
        color: #ee4d64;
        margin-left: 5px;
      }
    }
  }
`;
export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;
  border-left: 1px solid #eee;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #333;
    }

    a {
      display: block;
      margin-top: 2px;
      font-size: 12px;
      color: #ee4d64;
    }
  }

  img {
    height: 32px;
    width: 32px;
    border-radius: 50%;
  }
`;
