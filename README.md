# RocketSeat-Bootcamp-Gympoint
Entrega do desafio final (apenas versão Android da versão mobile)

Desenvolvido em ambiente Linux, inicialmente usando o sistema operacional <b>Solus 4.0</b> e finalizado no sistema operacional <b>Linux Lite 4.6</b>.

O Yarn foi usado como o gerenciador de pacotes de toda a aplicação.

------------

## # Instalação
Baixe o repositório numa pasta de sua preferência.

### Preparando o back-end
1. Abra o terminal e instale via Docker os *conteiners* para os bancos de dados Postgres, Mongo e Redis conforme abaixo. Se preferir, use outros nomes para os *conteiners* logo depois da flag  `--name`.
**Postgres**
```bash
$ docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres:11
```
**Mongo**
```bash
$ docker run --name gympoint_mongo -p 27017:27017 -d -t mongo
```
**Redis**
```bash
$ docker run --name gympoint_redis -p 6379:6379 -d -t redis:alpine
```

1. Inicialize os três containers no Docker via terminal:
```bash
$ docker start database
$ docker start gympoint_mongo 
$ docker start gympoint_redis
```
1. Use um gerenciador de banco de dados SQL de sua preferência (Postbird, DBeaver, Valentina Studio ou outro) e crie um banco de dados Postgres com o nome `gympoint` e encoding `UTF-8`. Use "postgres" como nome de usuário e "docker" como senha.

### Iniciando os servidores
A aplicação funciona com dois servidores em execução:
1. O principal, dos bancos de dados Postgres e Mongo;
1. O secundário, das filas ("***queues***") de trabalhos em segundo plano, para envio de e-mail e uso do banco de dado Redis.

No terminal, mude para a pasta `gympointAPI` e inicie o servidor principal com o comando:
```bash
$ yarn dev
```
A seguinte mensagem deve aparecer:
```
yarn run v<número da versão do yarn>
$ nodemon src/server.js
[nodemon] 1.19.4
[nodemon] to restart at any time, enter `rs`
[nodemon] watching dir(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node -r sucrase/register src/server.js`
Executing (default): SELECT 1+1 AS result
Conectado ao banco de dados com sucesso.
```
Para o servidor secundário, abra um novo terminal no mesmo diretório e execute:
```bash
$ yarn queue
```
A seguinte mensagem como esta deve aparecer:
```
yarn run v<número da versão do yarn>
$ nodemon --inspect src/queue.js
[nodemon] 1.19.4
[nodemon] to restart at any time, enter `rs`
[nodemon] watching dir(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node -r sucrase/register --inspect src/queue.js`
Debugger listening on ws://127.0.0.1:9229/a42a1802-5728-4ad1-b615-d3525245b409
For help, see: https://nodejs.org/en/docs/inspector
```

### Estruturando o banco de dados Postgres da aplicação (*running migrations*)
Com o terminal aberto do diretório `gympointAPI`, execute o seguinte comando:
```javascript
$ npx sequelize-cli db:migrate 
```

### Populando o banco de dados (*running seeds*)
Com o terminal aberto do diretório `gympointAPI`, execute o seguinte comando:
```javascript
$ npx sequelize-cli db:seed:all
```

