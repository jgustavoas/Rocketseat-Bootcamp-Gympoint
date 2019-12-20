import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import { store } from '~/store';

// O acento ~ indica a pasta "src" graças ao arquivo config-override.js na raiz da aplicação
// Isso é útil para não ter que usar uma série de "../../" para localizar uma pasta (voltando níveis).
// Com esse override, é como buscar a página avançando níveis, já que sempre parte da pasta "src"
// Isso também ajuda quando um arquivo com alguma importação ou o arquivo que é importado for movido dentro da pasta "src"
// Uma configuração complementar para funcionando do VS Code é feita no arquivo "jsconfig.json"
// Esse "jsconfig.json" permite que o VS Code consiga encontrar o arquivo através de Ctrl+clique depois que passamos a usar o sinal ~
import AuthLayout from '~/pages/_layouts/auth';
import DefaultLayout from '~/pages/_layouts/default';

// Dentro da função abaixo estamos passando as propriedades do componente "Route" de index.js desta mesma pasta
// Desestruturamos essas propriedades, separando a propriedade "component" e isPrivate (criada pelo Deigo)
// Todas as demais propriedades criadas foram colocadas na propriedade "rest" usando o rest operator.
export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {
  const { signed } = store.getState().auth;
  // const signed = true;

  if (!signed && isPrivate) {
    return <Redirect to='/' />;
  }

  if (signed && !isPrivate) {
    return <Redirect to='/students' />;
  }

  const Layout = signed ? DefaultLayout : AuthLayout;

  // return <Route {...rest} component={Component} />;
  return (
    <Route
      {...rest}
      render={props => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};
