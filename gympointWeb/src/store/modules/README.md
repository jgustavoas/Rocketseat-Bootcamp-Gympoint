#   Refatorando todas as operações "CRUD" da aplicação para uma única *action* chamada "request"

###   Os módulos da aplicação foram resumidos em dois:
1) Um chamado "auth", exclusivo para autenticação de usuário do sistema.
2) Outro chamado "data", para operaçoes CRUD de todas as outras páginas da aplicação.

------------

### *"One action to rule them all"*
No arquivo `data/actions.js` existe somente uma *action*, chamada de "request":
```javascript
export function request(type, page, data) {
  return {
    type,
    payload: { page, data },
  };
}
```
### Formato:
```javascript
  request('CREATE', page, formData);
  request('UPDATE', page, { id, formData });
  request('DELETE', page, id)
```

  O objeto `formData` contém todos os valores dos inputs dos formulários das respectivas páginas.

####   Exemplos de uso:
1) Action para cadastrar um aluno:
```javascript
request('CREATE', 'students', formData);
```
No arquivo `saga.js`, os dados do formulário são enviados à API dentro de um objeto chamado "data".

```json
{ 
	"data": {
		"name":"John Doe", 
		"age":"50", 
		"email":"johndoe@email.com", 
		"weight":"75", 
		"height":"1.79"
		}
}
```


2) Action para editar um plano: 
```javascript
request('UPDATE', 'plans', { id, formData });
```

3) Action para remover uma matrícula: 
```javascript
request('DELETE', 'matriculations', id);
```

------------

