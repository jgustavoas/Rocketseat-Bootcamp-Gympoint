export function request(type, page, data) {
  return {
    type,
    payload: { page, data },
  };
}

/*
  Actions para operações CRUD:
  request('CREATE', page, formData);
  request('UPDATE', page, { id, formData });
  request('DELETE', page, id)

  'formData' é um objeto contendo os valores dos inputs nas respectivas páginas.

  Exemplos
  a) Cadastrar um aluno: request('CREATE', 'students', formData);
  b) Editar um plano: request('UPDATE', 'plans', { id, formData });
  c) Remover uma matrícula: request('DELETE', 'matriculations', id);

  Assim módulos da pasta 'store' foram reduzidos a dois tipos:
  1) Um exclusivo para autenticação ('auth')
  2) Outro genérico para operaçoes CRUD nas demais páginas da aplicação ('data')

  Essa refatoração evita um aumento da quantidade de arquivos e de pastas à medida que a aplicação fica mais complexa.
  Assim as páginas também ficam mais limpas e o código se torna muito mais fácil de manter e de escalar.
*/
