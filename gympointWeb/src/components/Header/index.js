import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { signOut } from '~/store/modules/auth/actions';

import logo from '~/assets/logo_header.png';

import { Container, Content, Profile } from './styles';

export default function Header() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} height={25} alt='Gympoint' />
          <Link to='/students'>ALUNOS</Link>
          <Link to='/plans'>PLANOS</Link>
          <Link to='/matriculations'>MATRÍCULAS</Link>
          <Link to='/helporders'>PEDIDOS DE AJUDA</Link>
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>{user.name}</strong>
              <button
                type='button'
                className='redMinimalButton'
                onClick={handleSignOut}
              >
                Sair do sistema
              </button>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
