# API de Biblioteca de Games

Esta é uma API RESTful desenvolvida como parte do Trabalho 1 da disciplina de Desenvolvimento WEB - Backend. A aplicação permite o gerenciamento de uma biblioteca de jogos, incluindo funcionalidades de CRUD para usuários e jogos, com um sistema robusto de autenticação e autorização.

## Funcionalidades

* **CRUD completo** para as entidades de `Usuários` e `Games`.
* **Autenticação** de usuários com JSON Web Tokens (JWT).
* **Autorização** com Controle de Acesso Baseado em Papéis (RBAC), distinguindo usuários comuns de administradores.
* **Hashing de senhas** utilizando `bcrypt` para garantir a segurança dos dados dos usuários.
* **Validação de dados** de entrada com `express-validator`.
* **Persistência de dados** em um arquivo JSON local utilizando `lowdb`.
* **Arquitetura em Camadas** (Rotas, Controladores, Serviços, Repositórios) para separação de responsabilidades.
* **Gerenciamento de segredos** com variáveis de ambiente (`.env`).

## Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina:
* [Node.js](https://nodejs.org/en/) (versão 18.x ou superior recomendada)
* [npm](https://www.npmjs.com/) (geralmente instalado com o Node.js)

## Instalação e Configuração

Siga os passos abaixo para configurar e rodar o projeto localmente:

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/seu-usuario/seu-repositorio.git)
    ```

2.  **Navegue até o diretório do projeto:**
    ```bash
    cd seu-repositorio
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Configure as variáveis de ambiente:**
    Crie um arquivo chamado `.env` na raiz do projeto e adicione a seguinte variável. Ela é usada para assinar os tokens JWT.

    ```env
    # .env
    JWT_SECRET=coloque_aqui_uma_string_longa_e_aleatoria_para_seguranca
    ```

## ▶️ Executando a Aplicação

Para iniciar o servidor, execute o comando:

```bash
node app.js
```