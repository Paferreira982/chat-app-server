# Chat App Backend
Este é o backend do Chat App, um aplicativo de chat em tempo real.

## Principais Tecnologias
- Node.js   
- Express
- Socket.io
- MongoDB

## Instalação
1. Clone o repositório
2. Configure o banco de dados MongoDB

É necessário ter o MongoDB instalado na máquina. Caso não tenha, siga as instruções de instalação no site oficial: https://docs.mongodb.com/manual/installation/, ou utilize um serviço de banco de dados como o MongoDB Atlas.

Também é possível utilizar o Docker para rodar o MongoDB. Para isso, execute o seguinte comando no terminal:
```bash docker run -d -p 27017:27017 --name meu-mongodb mongo:latest ```

Substitua `meu-mongodb` pelo nome que desejar para o container. 

3. Instale as dependências <br>
```npm install```

4. Configure as variáveis de ambiente.

Todas as variáveis de ambiente possuem valores padrão, mas podem ser alteradas no contexto da aplicação.

Variáveis de ambiente:
- `PORT`: Porta em que o servidor irá rodar. Padrão: 4000;
- `MONGODB_URI`: URI de conexão com o banco de dados MongoDB. Padrão: mongodb://localhost:27017/ixcsoft;
- `JWT_SECRET`: Chave secreta para a geração de tokens JWT. Padrão: secret;
- `SALT_ROUNDS`: Número de rounds para a geração de hashes de senhas. Padrão: 10;

5. Inicie o servidor em ambiente de desenvolvimento <br>
```npm run dev```

## Arquitetura
A arquitetura do projeto escolhida foi DDD (Domain-Driven Design), Clean Architecture, SOLID e princípios de arquitetura hexagonal. A estrutura de pastas do projeto é organizada da seguinte forma:

- `src/`: Código-fonte da aplicação
  - `domain/`: Regras de negócio da aplicação;
  - `infra/`: Implementações de repositórios, serviços e adaptadores;
  - `useCases/`: Casos de uso da aplicação;

## Processo de desenvolvimento
Inicialmente o projeto foi pensado para ser executado em um monolito, que atendiam todas as necessidades do teste. Porém a utilização do NextJs como framework para o frontend, me fez repensar a arquitetura do projeto, e optei por separar o backend do frontend, pelo principal motivo do tempo estar limitado e como eu não possuo muita experiênia com NextJs, achei que seria mais produtivo focar no desenvolvimento do backend, enquanto tentava superar os desafios desse framework novo para mim.

### Backend
O backend foi relativamente tranquilo de migrar, como todo o código estava bem modularizado, foi fácil separar o backend do frontend. Um benéficio de ter a separação do código em camadas, para seguir os princípios de arquitetura hexagonal, e também para facilitar a manutenção do código.

Features entregues:
- Autenticação de usuários;
- Cadastro de usuários;
- Envio de mensagens;
- Arquitetura DDD, Clean Architecture, SOLID e princípios de arquitetura hexagonal;
- Abstração de repositórios e serviços;
- Schemas de validação de dados;
- ORM para comunicação com o banco de dados;
- WebSocket para comunicação em tempo real;
- Tipagem de dados;
- Tratamento de erros;
- Criação da base para entidades, repositório e casos de uso (classes abstratas e interfaces);

Features que foram planejadas, mas devido ao cenário de tempo, não foram implementadas:
- Testes unitários;
- Testes de integração;
- Autenticação do WebSocket;
- Dockerização do projeto;
- Cache de requisições;
- Documentação da API;
- Facilitar configuração de ambiente com variáveis de ambiente de forma mais clara e através de um arquivo .env;

## Conclusão
Devido ao escopo do projeto, principalmente por conta da utilização de um framework frontend ao qual não estou muito familiarizado, não consegui entregar todas as features que gostaria. Porém, acredito que o projeto está bem estruturado e organizado, e que com mais tempo, seria possível implementar todas as features planejadas, trazendo mais segurança e escalabilidade para a aplicação.

Acesse o frontend do Chat App [aqui](https://github.com/Paferreira982/chat-app/tree/develop).
