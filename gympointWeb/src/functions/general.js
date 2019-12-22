import { request } from '~/store/modules/data/actions';
import history from '~/services/history';

// Funções gerais são aquelas comuns que ocorrem em várias páginas

// NAVEGAÇÃO PELAS PÁGINAS:
export function goTo(page) {
  history.push(`/${page}`);
}

// VALIDAÇÃO DE FORMULÁRIO:
// Esta função recebe como parâmetro uma array []
// Os inputs a serem validados ficam dentro de uma segunda array no seguinte formato: [nome_do_input, tipo_do_input]
// Ou seja, os inputs são inseridos na função como neste exemplo: [['nome', 'text'], ['email', 'email']]
export function formValidation(inputs) {
  let isValid = true; // O input começa válido por padrão.

  inputs.map(inputData => {
    // Usando map() para a array de cada input, sendo o primeiro item da array o nome do input, e o segundo item o tipo do input
    const inputName = inputData[0];
    const inputType = inputData[1];

    // Obtendo o valor do input pela sua id (nas páginas, a id é igual ao nome do input)
    const inputValue = document.getElementById(inputName).value;

    // Expressão regular para validar o formato do e-mail:
    // É uma camada a mais de validação além da que já existe nos navegadores para o input do tipo "email".
    const regexpEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    // Se o input for do tipo 'email' e seu valor não der match com a expressão regular acima, então invalidEmail = true.
    const invalidEmail =
      inputType === 'email' && !inputValue.match(regexpEmail);

    // Se o input for undefined, ou vazio, ou for um e-mail inválido, então exibir mensagem de erro.
    if (!inputValue || inputValue === '' || invalidEmail) {
      document.getElementById(inputName).placeholder = 'Preencha este campo!'; // Inserir uma mensagem no placeholder do input.
      document.getElementById(inputName).setAttribute('class', 'invalid'); // Inserir a classe CSS 'invalid' no input

      isValid = false; // O input não é válido
    }
  });

  return isValid;
}

// Quando há novo foco no input invalidado, limpar o CSS e o placeholder do input
export function removeAttributeFrom(id) {
  document.getElementById(id).removeAttribute('class', 'invalid');
  document.getElementById(id).placeholder = '';
}

// DELETAR ITENS
// A action foi refatorada nesta função (ver o arquivo 'store/modules/data/actions.js')
export function deleteItem(what, id, dispatch, page, callback) {
  const action = request('DELETE', page, id);

  if (window.confirm(`Apagar ${what}?`)) {
    dispatch(action);
  }
  return callback();
}

// SUBMISSÃO DO FORMULÁRIO
// As actions também foram refatoradas nesta função (ver o arquivo 'store/modules/data/actions.js')
export function handleSubmit(
  dispatch,
  page,
  id,
  formData,
  validateTheseInputs
) {
  const create = request('CREATE', page, formData);
  const update = request('UPDATE', page, { id, formData });

  const action = id ? update : create;

  formValidation(validateTheseInputs) && dispatch(action);
}
