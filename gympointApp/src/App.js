import React from 'react';
import { useSelector } from 'react-redux';

import createRoute from './routes';

export default function App() {
  const signed = useSelector(state => state.auth.signed);

  // Com o estado de "signed" obtido pelo "useSelector" acima, passamos esse estado como parâmetro na função do arquivo "routes.js"
  // Dependendo de true ou false no estado de "signed", a função retorna o grupo de rotas adequado.
  const Routes = createRoute(signed);

  return <Routes />;
}
