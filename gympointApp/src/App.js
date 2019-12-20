import React from 'react';
import { useSelector } from 'react-redux';

import createRoute from './routes';

export default function App() {
  // "useSelector" para selecionar o state "signed" que está no reducer de autenticação ("auth")
  const signed = useSelector(state => state.auth.signed);

  // Aqui o motivo de transformar em função a exportação do arquivo "routes.js" que foi importado aqui com o nome de createRoute
  // Com o estado de "signed" obtido pelo "useSelector" acima, passamos esse estado como parâmetro na função do arquivo "routes.js"
  // Dependendo de true ou false no estado de "signed" a função retorna o grupo de rotas adequado
  const Routes = createRoute(signed);

  return <Routes />;
}
