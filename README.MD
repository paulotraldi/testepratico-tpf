# Teste Prático TPF

Este projeto tem como objetivo, a manutenção dos cadastros de usuários, cursos e associar os usuários aos respectivos cursos.

É composta por duas aplicações:

* Backend: API Rest, desenvolvida em Nodejs com banco de dados MariaDB versão(10.4.21), cujo objetivo é prover para a aplicação frontend toda a manutenção dos dados.


* Fronted: Desenvolvida em React, cujo objetido é a manutenção dos casdastros de usuários, cursos e associar os usuários aos cursos.

## 🔧 Instalação Backend

Configurações:

Execute o comando na pasta raiz `backend` para instalar as depdendências:

```bash
npm i
```

A aplicação está configurada para rodar na porta 3003, caso seja necessário, pode ser alterada editdando a primeira linha do arquivo `./src/api.js`

```bash
const port = 3003
```

### Banco de dados
Requisito: MariaDB

* Criar o database (nome sugerido: testepratico)
* Rodar o script `./db/script_create_database.sql` no database criado, para criação dos objetos da base de dados.
* As configurações de acesso ao banco de dados estão definidas no arquivo `./src/config.js`, define-as de acordo com as suas configurações
```bash
cfgBb : {
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'testepratico'
    }
```

️ Executando
Para iniciar a aplicação, acesse a pasta `backend` e execute o comando:
```bash
npm start
```

### 📄 Documentação

```bash
A documentação da Api pode ser acessada através da url http://`<app_host>`:`<app_port>`/api-docs 
```


## 🔧 Instalação Frontend

Execute o comando na pasta `backend` para instalar as depdendências:

```bash
npm i
```

️ Executando
Para iniciar a aplicação, acesse a pasta `frontend` e execute o comando:
```bash
npm start
```

### Credencial de acesso default

```bash
Usuário: admin@dominio.com
Senha: admin
```


## 📋 Pré-requisitos

* Nodejs
* MariaDB

## 🛠️ Construído com

* [Nodejs](https://nodejs.org/en/)
* [React](https://pt-br.reactjs.org/)


## 📌 Versão
1.0.0


## ✒️ Autor

* **Paulo Henrique Tradi** - *DevOps, Full Stack* 