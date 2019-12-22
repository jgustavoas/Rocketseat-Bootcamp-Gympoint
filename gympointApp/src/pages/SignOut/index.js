import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';

import { signOut } from '~/store/modules/auth/actions';

import { Container, CheckinButton } from './styles';

import Background from '~/components/Background';

function Checkins() {
  const id = useSelector(state => state.auth.id);

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const buttonText = `CONFIRMAR SAÍDA`;

  function handleSignOut() {
    dispatch(signOut(id));
  }

  return (
    <Background>
      <Container>
        <CheckinButton loading={loading} onPress={handleSignOut}>
          {buttonText}
        </CheckinButton>
      </Container>
    </Background>
  );
}

export default withNavigationFocus(Checkins);
