# TIC TAC TOE ONLINE (Jogo da Velha Multiplayer)

Bem-vindo ao repositório do **Tic Tac Toe Online**, um projeto feito com foco total em **comunicação bi-direcional** utilizando **WebSockets**, **arquitetura limpa (clean-architecture)**, e tecnologias modernas como **Docker**, **Node.js**, **Express**, **TypeScript** e **React**!

---

## Qual a ideia deste repositório?

> O objetivo deste projeto é **maximizar o aprendizado em comunicação bi-direcional** com WebSockets, aplicando **arquitetura limpa (clean-architecture)** e testando ferramentas e tecnologias modernas em um ambiente realista e divertido.

Este projeto serve como uma jornada prática para quem quer:

* Entender como funciona a comunicação **cliente ↔ servidor** em tempo real
* Aplicar conceitos de **Sockets**, **Event-Driven Design**, e **Deploy com Docker**
* Aprender e se divertir desenvolvendo um game clássico multiplayer
* Desenvolver sem dependência de IAs (ChatGPT, Copilot, etc.) para maximizar o aprendizado 
> (Acabou sendo utilizado para desenvolver o frontend + ajudas com deploy's)

---

## Tecnologias Utilizadas

| Tecnologia             | Descrição                                                     |
| ---------------------- | ------------------------------------------------------------- |
| **TypeScript**         | Linguagem principal do projeto, para tipagem segura e robusta |
| **Socket.IO**          | Biblioteca de WebSocket para comunicação em tempo real        |
| **Express.js**         | Framework para construir a API do backend                     |
| **Redis / MongoDB**    | Banco de dados para persistência (em fase de testes)          |
| **Docker**             | Ambientes isolados para rodar os serviços facilmente          |
| **Next.js + React**    | Frontend moderno com SSR, SPA e WebSocket integrados          |
| **Vercel / Azure**     | Plataforma de deploy para publicar o projeto online           |

---

## Como rodar o projeto localmente

### Clonando o repositório

```bash
git clone https://github.com/KaioBorgesDev/TicTacToe-Online-.git
cd TicTacToe-Online-
```

### Rodando com Docker

Certifique-se de ter o Docker instalado. Depois, basta rodar:

```bash
docker compose up
```

> Isso iniciará os serviços localmente, permitindo partidas multiplayer entre usuários na sua máquina ou em rede local.

---

## Como acessar online

Você pode acessar o projeto hospedado (quando disponível) através do link de deploy:

**https://online-tic-tac-toe-virid.vercel.app/** — *Frontend hospedado na Vercel*

---

## Aprendizados e práticas

* WebSocket com **Socket.IO**
* Aplicação de **EventEmitter Pattern**
* Estrutura modular com **Express + TypeScript**
* Deploy com **Docker + Vercel**
* (Planejado) Persistência com **Redis** ou **MongoDB**
* Design de código escalável para jogos em tempo real
* Desenvolvimento sem assistência de IA para maximizar o aprendizado

---

## Estrutura do Projeto

```plaintext
TicTacToe-Online-/
├── client/          # Frontend React/Next.js
├── server/          # Backend Express + Socket.IO
├── shared/          # Tipos e utilitários compartilhados
├── docker-compose.yml
└── README.md
```

---

## Contribuições

Sinta-se à vontade para abrir uma *issue*, *pull request* ou simplesmente deixar uma estrela no projeto!

---

## Licença

Este projeto está licenciado sob a **MIT License**.

---

