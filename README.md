<div align="center">
  <img src="./docs/img/logo.webp" width="200"  style="margin-bottom: 30px" alt="" />
  <br>
  <img src="https://img.shields.io/badge/maintainer-Ruan Barreto%20-blue.svg" alt="Maintainer">
  <img src="https://img.shields.io/badge/version-1.0.0-orange.svg" alt="Version">
  <img src="https://img.shields.io/badge/NodeJS-22.12.0-green.svg" alt="NodeJS">

  <h1 align="center">BRAIN AGRICULTURE</h1>
</div>

# Description

O `brain-agriculture` é responsável por gerenciar as fazendas cadastradas pelos usuários. Permitindo o mesmo a cadastrar o ano das culturas plantadas e as safras desse mesmo ano, tendo visão macro de todos os dados de sua fazenda. A aplicação disponibiliza de um dashboard para vizualização do resumo das fazendas disponíveis no sistema.

## Decisões Técnicas e Arquiteturais

### Arquitetura de software
Utilizei a abordagem do DDD.
Defini a **INFRA** sendo a minha camada mais externa da aplicação, responsável por se comunicar com agentes externos como bibliotecas, banco de dados e frameworks, abaixo da infraestrutura temos o **USE-CASES** que atráves de um **ADAPTER** se comunica com a camada mais interna da aplicação, o **CORE** onde se encontra as entidades. E esse caminho também é feito inverso como mostra a imagem.

![ddd](docs/img/ddd.svg)

### Arquitetura de solução
![ddd](docs/img/arq_solucao.svg)

Para uma vizualização mais detalhada, acesse a imagem disponivel aqui [Arquitetura Solução](docs/img/arq_solucao.png).

### Decisões Técnicas

Optei por utilizar o framework NestJS com TypeScript devido a sua organização e facilidade no desenvolvimento. O NestJS simplifica o desenvolvimento com o uso de decorators para definições de classes, além de oferecer um sistema eficiente de injeção de dependência, que facilita o gerenciamento de serviços. Ele também traz recursos como Guards (proteção de rotas), Interceptors (transformação de dados), Filters (tratamento personalizado de exceções), Pipes (validação e transformação de dados) e Middleware (execução antes de chegar ao controller). Segui também alguns dos princípios do SOLID como o *Single Responsibility Principle*, *Liskov Substitution Principle* e o *Dependency Inversion Principle*
a decisão foi manter a arquitetura simples, intuitiva e fácil de entender, onde o foco é em resolver o problema. Além disso, utilizei os seguintes patterns:
- [**Repository Pattern**](/src/infra/database/drizzle/repositories/farm/farm-repository.ts): para abstrair o acesso aos dados.
- [**Factory Pattern**](/src/infra/http/http.module.ts): para a criação e configuração de instâncias de objetos.
- [**InMemoryDatabase Pattern**](/test/mocks/repositories/in-memory-user-repository.ts): para simular um banco de dados em memória, facilitando testes e desenvolvimento.
> Os detalhes de uma tecnologia estão sempre mudando. Foque nos princípios. Dedique seu tempo e energia mental para entender conceitos e ideias, e concentre-se nos problemas a serem resolvidos." — Rich Hickey

### Testes unitários

Para os testes unitários, escolhi o [Vitest](https://vitest.dev/), uma ferramenta moderna para testes em JavaScript e TypeScript, construída com base no ESBuild o mesmo motor utilizado por ferramentas como Vite e TSX. O Vitest se destaca por sua integração nativa com TypeScript, eliminando a necessidade de configurações adicionais. Em comparação, o [Jest](https://jestjs.io/pt-BR/) requer configurações extras para suportar ESModules e TypeScript.

## Tecnologias

Esse software utilizou as tecnologias:

<ul>
  <li>
    <a href="https://nodejs.org/">
      <img src="https://cdn.svgporn.com/logos/nodejs-icon.svg" alt="Node" width="20">
      Node 22 or higher
    </a>
  </li>
  <li>
    <a href="https://www.typescriptlang.org/">
      <img src="https://cdn.svgporn.com/logos/typescript-icon.svg" alt="TypeScript" width="20">
      TypeScript
    </a>
  </li>
  <li>
    <a href="https://nestjs.com/">
      <img src="https://cdn.svgporn.com/logos/nestjs.svg" alt="Nest" width="20">
      NestJS
    </a>
  </li>
  <li>
    <a href="https://docs.docker.com/">
      <img src="https://cdn.svgporn.com/logos/docker-icon.svg" alt="Docker" width="20">
      Docker
    </a>
  </li>
  <li>
    <a href="https://vitest.dev/">
      <img src="https://vitest.dev/logo.svg" alt="Vitest" width="20">
      Vitest
    </a>
  </li>
  <li>
    <a href="https://eslint.org/docs/latest/">
      <img src="https://cdn.svgporn.com/logos/eslint.svg" alt="Eslint" width="20">
      Eslint
    </a>
  </li>
  <li>
    <a href="https://prettier.io/docs/en/options.html">
      <img src="https://cdn.svgporn.com/logos/prettier.svg" alt="Prettier" width="20">
      Prettier
    </a>
  </li>
  <li>
    <a href="https://helmetjs.github.io/">
      🛡️Helmet
    </a>
  </li>
  <li>
    <a href="https://www.postgresql.org/">
      <img src="https://cdn.svgporn.com/logos/postgresql.svg" alt="PostgreSQL" width="20">
      PostgreSQL
    </a>
  </li>
  <li>
    <a href="https://ejs.co/">
      <img src="https://img.icons8.com/color/512/ejs.png" alt="EJS" width="20">
      EJS
    </a>
  </li>
  <li>
    <a href="https://orm.drizzle.team/">
      <img src="https://imgildev.gallerycdn.vsassets.io/extensions/imgildev/vscode-drizzle-snippets/1.1.0/1713981660600/Microsoft.VisualStudio.Services.Icons.Default" alt="Drizzle" width="20">
      Drizzle ORM
    </a>
  </li>
  <li>
    <a href="https://jwt.io/">
      <img src="https://cdn.worldvectorlogo.com/logos/jwt-3.svg" alt="JWT" width="20">
      JSON Web Tokens (JWT)
    </a>
  </li>
  <li>
    <a href="https://swagger.io/">
      <img src="https://cdn.svgporn.com/logos/swagger.svg" alt="Swagger" width="20">
      Swagger
    </a>
  </li>
</ul>

## Routes
Rotas da API. É Necessário estar com a API-KEY inserida para utilizar as rotas.

### POST /api/user
Responsável por criar um usuário. Não necessita de token de autenticação, apenas a API-KEY.

![createUserRoute](docs/routes/create-user/create-user.svg)

### Example input payload
```json
{
  "name": "John Doe",
  "email": "john_doe@test.com",
  "cpfCnpj": "00630094047",
  "password": "johnDoePassword"
}
```

### Example output
Se o usuário for criado com sucesso.
```json
{
  "statusCode": "201",
  "message": "User created"
}
```

Se o e-email do usuário já existir.
```json
{
  "statusCode": "409",
  "path": "/api/user",
  "message": "CPF/CNPJ already registered",
  "error": "Conflict"
}
```

Se o CPF ou CNPJ do usuário já existir.
```json
{
  "statusCode": "409",
  "path": "/api/user",
  "message": "User \"john.doe@test.com\" already exists.",
  "error": "Conflict"
}
```
### POST /api/sessions
Responsável por logar o usuário gerando um token de acesso.

![createUserRoute](docs/routes/authenticate/authenticate.svg)

### Example input payload
```json
{
  "email": "john_doe@test.com",
  "password": "johnDoePassword"
}
```

### Example output
Se as credenciais do usuário estiverem corretas.
```json
{
  "statusCode": "200",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

Se as credenciais estiverem incorreta.
```json
{
  "statusCode": 401,
  "path": "/api/sessions",
  "message": "Credentials are not valid.",
  "error": "Unauthorized"
}
```

### POST /api/farm
Responsável por criar uma fazenda atrelado ao ID do usuário logado, só é permitido usar a rota estando logado.

![createUserRoute](docs/routes/farm/create-farm/create-farm.svg)

### Example input payload
```json
{
  "name": "Fazenda Família Doe",
  "city": "Minas Gerais",
  "state": "MG",
  "totalArea": 1000,
  "arableArea": 600,
  "vegetationArea": 400
}
```

### Example output
Se a fazenda for criada com sucesso.
```json
{
  "statusCode": "201",
  "message": "Farm created"
}
```

Se a soma da área de vegetação e área agricultável ultrapassagem a área total da fazenda.
```json
{
  "statusCode": "400",
  "path": "/api/farm",
  "message": "A soma da área agricultável da fazenda (1500) e área de vegetação (111) não pode exceder a área total da fazenda (1000).",
  "error": "Bad Request"
}
```
Erros internos.
```json
{
  "statusCode": "500",
  "message": "Internal server error"
}
```
### GET /api/farm
Responsável por buscar todas as fazendas atrelado ao ID do usuário logado, só é permitido usar a rota estando logado.

![createUserRoute](docs/routes/farm/get-all-farms/get-all-farms.svg)

### Example input payload
Não possui JSON de input, rota apenas de consultas.
```json
{}
```

### Example output
Se existir fazendas atreladas ao usuário.
```json
{
  "statusCode": 201,
  "farms": [
    {
      "id": "8d7033d8-f65b-468e-82b4-cf7d727eb352",
      "name": "Fazenda Família Doe",
      "city": "Minas Gerais",
      "state": "MG",
      "totalArea": 1000,
      "arableArea": 600,
      "vegetationArea": 400
    }
  ]
}
```

Se não existir nenhuma fazenda atrelada ao usuário.
```json
{
  "statusCode": "404",
  "path": "/api/farm",
  "message": "User 8aae8577-1c26-4dc4-a881-e498ff364516 has no farms registered.",
  "error": "Not Found"
}
```
Erros internos.
```json
{
  "statusCode": "500",
  "message": "Internal server error"
}
```

### GET /api/farm/${farmId}
Responsável por buscar a fazenda passada por id, a fazenda que foi buscada deve estar atrelado ao ID do usuário logado, só é permitido usar a rota estando logado.

![createUserRoute](docs/routes/farm/get-farm-by-id/get-farm-by-id.svg)

### Example input payload

Esta rota utiliza um **path parameter** para fornecer o `farmId`. Não há necessidade de enviar um JSON no corpo da requisição.

**Path Parameter**:
- `farmId` (string): O ID da fazenda a ser buscada.

### Example output
Se a fazenda estiver atreladas ao usuário.
```json
{
  "statusCode": 201,
  "farms": {
    "id": "8d7033d8-f65b-468e-82b4-cf7d727eb352",
    "name": "Fazenda Família Doe",
    "city": "Minas Gerais",
    "state": "MG",
    "totalArea": 1000,
    "arableArea": 600,
    "vegetationArea": 400
  }
}
```

Se a fazenda não existir.
```json
{
  "statusCode": "404",
  "path": "/api/farm",
  "message": "Farm 8aae8577-1c26-4dc4-a881-e498ff364516 not found.",
  "error": "Not Found"
}
```
Erros internos.
```json
{
  "statusCode": "500",
  "message": "Internal server error"
}
```
### DELETE /api/farm/${farmId}
Responsável por buscar a fazenda passada por id, e deletar no banco de dados a fazenda que foi buscada deve estar atrelado ao ID do usuário logado, só é permitido usar a rota estando logado.

![createUserRoute](docs/routes/farm/delete-farm/delete-farm.svg)

### Example input payload

Esta rota utiliza um **path parameter** para fornecer o `farmId`. Não há necessidade de enviar um JSON no corpo da requisição.

**Path Parameter**:
- `farmId` (string): O ID da fazenda a ser buscada.

### Example output
Se a fazenda for deletada com sucesso.
```json
{
  "statusCode": "200",
  "message": "Farm 06fffe10-f2ef-4293-8a66-b4095a3f9876 deleted"
}
```

Se a fazenda não existir.
```json
{
  "statusCode": "404",
  "path": "/api/farm",
  "message": "Farm 8aae8577-1c26-4dc4-a881-e498ff364516 not found.",
  "error": "Not Found"
}
```
Erros internos.
```json
{
  "statusCode": "500",
  "message": "Internal server error"
}
```

### POST /api/harvests
Responsável por criar uma safra para uma fazenda atrelado ao ID do usuário logado, só é permitido usar a rota estando logado.

![createUserRoute](docs/routes/harvests/create-harvests/create-harvests.svg)

Esta rota utiliza um **path parameter** para fornecer o `farmId`.

**Path Parameter**:
- `farmId` (string): O ID da fazenda a ser cadastrado a safra.

### Example input payload
```json
{
  "year": "2023"
}
```

### Example output
Se a safra for criada com sucesso.
```json
{
  "statusCode": "201",
  "message": "Harvests created"
}
```

Se o ano for maior que o ano atual.
```json
{
  "statusCode": "400",
  "path": "/api/harvests/9739cb43-e078-4085-b7a9-1700dadeec4d",
  "message": "Year must be a valid 4-digit number between 1900 and 2025",
  "error": "Bad Request"
}
```
Se o a fazenda não for encontrada.
```json
{
  "statusCode": "404",
  "path": "/api/farm",
  "message": "Farm 8aae8577-1c26-4dc4-a881-e498ff364516 not found.",
  "error": "Not Found"
}
```
Erros internos.
```json
{
  "statusCode": "500",
  "message": "Internal server error"
}
```

### GET /api/harvests
Responsável por buscar todas as safras das fazendas atrelado ao ID do usuário logado, só é permitido usar a rota estando logado.

![createUserRoute](docs/routes/harvests/get-all-harvets/get-all-harvests.svg)

### Example input payload
Não possui JSON de input, rota apenas de consultas.
```json
{}
```

### Example output
Se existir fazendas com safras atreladas ao usuário.
```json
{
  "statusCode": 201,
  "farms": [
    {
      "id": "8d7033d8-f65b-468e-82b4-cf7d727eb352",
      "name": "Fazenda Família Doe",
      "city": "Minas Gerais",
      "state": "MG",
      "totalArea": 1000,
      "arableArea": 600,
      "vegetationArea": 400
    }
  ],
  "harvests": [
    {
      "id": "610db7bf-ec40-43bb-9797-102d59b96ed5",
      "year": "2010"
    }
  ]
}
```

Se não existir nenhuma fazenda atrelada ao usuário.
```json
{
  "statusCode": "404",
  "path": "/api/farm",
  "message": "User 8aae8577-1c26-4dc4-a881-e498ff364516 has no farms registered.",
  "error": "Not Found"
}
```
Erros internos.
```json
{
  "statusCode": "500",
  "message": "Internal server error"
}
```

### GET /api/harvests/${farmId}
Responsável por buscar a safra passada por id, a safra que foi buscada deve estar atrelado a fazenda que o usuário logado possui, só é permitido usar a rota estando logado.

![createUserRoute](docs/routes/harvests/get-farm-by-id/get-farm-by-id.svg)

### Example input payload

Esta rota utiliza um **path parameter** para fornecer o `harvestsId`. Não há necessidade de enviar um JSON no corpo da requisição.

**Path Parameter**:
- `harvestsId` (string): O ID da fazenda a ser buscada.

### Example output
Se a safra da fazenda estiver atreladas ao usuário.
```json
{
  "statusCode": 201,
  "farms": {
    "id": "8d7033d8-f65b-468e-82b4-cf7d727eb352",
    "farmId": "0c04b19a-04c8-4931-a64d-f24357b9071b",
    "harvestId": "c8403b92-2e42-44bf-9236-6a2e96e6805d",
    "year": "2023"
  }
}
```

Se a safra da fazenda não existir.
```json
{
  "statusCode": "404",
  "path": "/api/harvests/8aae8577-1c26-4dc4-a881-e498ff364516",
  "message": "Harvests 8aae8577-1c26-4dc4-a881-e498ff364516 not found.",
  "error": "Not Found"
}
```
Erros internos.
```json
{
  "statusCode": "500",
  "message": "Internal server error"
}
```

### DELETE /api/harvests/${harvestsId}
Responsável por buscar a safra passada por id, e deletar no banco de dados, a safra que foi buscada deve estar atrelado a uma fazenda que pertence ao usuário logado, só é permitido usar a rota estando logado.

![createUserRoute](docs/routes/harvests/delete-harvests/delete-harvests.svg)

### Example input payload

Esta rota utiliza um **path parameter** para fornecer o `harvestsId`. Não há necessidade de enviar um JSON no corpo da requisição.

**Path Parameter**:
- `harvestsId` (string): O ID da fazenda a ser buscada.

### Example output
Se a safra for deletada com sucesso.
```json
{
  "statusCode": "200",
  "message": "Harvests 06fffe10-f2ef-4293-8a66-b4095a3f9876 deleted"
}
```

Se a safra não existir.
```json
{
 {
  "statusCode": "404",
  "path": "/api/harvests/8aae8577-1c26-4dc4-a881-e498ff364516",
  "message": "Harvests 8aae8577-1c26-4dc4-a881-e498ff364516 not found.",
  "error": "Not Found"
}
}
```
Erros internos.
```json
{
  "statusCode": "500",
  "message": "Internal server error"
}
```

### POST /api/crops/${harvestsId}
Responsável por criar uma cultura para uma safra de uma fazenda atrelado ao ID do usuário logado, só é permitido usar a rota estando logado.

![createUserRoute](docs/routes/crops/create-crop/create-crop.svg)

Esta rota utiliza um **path parameter** para fornecer o `harvestsId`.

**Path Parameter**:
- `harvestsId` (string): O ID da Safra a ser cadastrado a cultura de plantação.

### Example input payload
```json
{
  "area": 1000,
  "cropName": "Soja"
}
```

### Example output
Se a área agricultável da fazenda for menor que a área da cultura.
```json
{
  "statusCode": "400",
  "path": "/api/crops/8aae8577-1c26-4dc4-a881-e498ff364516",
  "message": "The arable area 800 is smaller than the harvest area 600000.",
  "error": "Bad Request"
}
```

Se não encontrar a safra.
```json
{
  "statusCode": "404",
  "path": "/api/harvests/8aae8577-1c26-4dc4-a881-e498ff364516",
  "message": "Harvests 8aae8577-1c26-4dc4-a881-e498ff364516 not found.",
  "error": "Not Found"
}
```

Erros internos.
```json
{
  "statusCode": "500",
  "message": "Internal server error"
}
```

### GET /api/crops
Responsável por buscar todas as culturas das safras de fazendas atrelado ao usuário logado, só é permitido usar a rota estando logado.

![createUserRoute](docs/routes/crops/get-all-crops/get-all-crops.svg)

### Example input payload
Não possui JSON de input, rota apenas de consultas.
```json
{}
```

### Example output
Se existir fazendas com safras atreladas ao usuário.
```json
{
  "statusCode": 201,
  "crops": [
    {
      "id": "9739cb43-e078-4085-b7a9-1700dadeec4d",
      "name": "Fazenda Família Doe",
      "harvests": [
        {
          "id": "02a2b891-593c-4d47-bcc6-4a56fb756a8f",
          "year": "2023",
          "crops": [
            {
              "id": "056adfde-ca97-4e49-be88-54686d159357",
              "name": "Soja",
              "area": 1000
            },
            {
              "id": "7c3e667c-9a03-45aa-b32a-af082458317b",
              "name": "Café",
              "area": 2000
            }
          ]
        }
      ]
    }
  ]
}
```

Se não existis culturas das safras de fazendas atrelado ao usuário logado
```json
{
  "statusCode": "404",
  "path": "/api/crops",
  "message": "Crops not found",
  "error": "Not Found"
}
```
Erros internos.
```json
{
  "statusCode": "500",
  "message": "Internal server error"
}
```

### GET /api/crops/${cropId}
Responsável por buscar a cultura das safras de fazendas atrelado ao usuário logado pelo ID. Só é permitido usar a rota estando logado.

![createUserRoute](docs/routes/crops/get-crop-by-id/get-crop-by-id.svg)

### Example input payload

Esta rota utiliza um **path parameter** para fornecer o `cropId`. Não há necessidade de enviar um JSON no corpo da requisição.

**Path Parameter**:
- `cropId` (string): O ID da fazenda a ser buscada.

### Example output
Se a safra da fazenda estiver atreladas ao usuário.
```json
{
  "statusCode": 201,
  "crop": {
    "farm": {
      "id": "f0b1ddaf-ec62-4ded-a315-91733fb71b61",
      "name": "Fazenda Família Doe 2",
      "harvests": [
        {
          "id": "d00b62c8-bf3d-4980-a830-cf12c987cb23",
          "year": "2004",
          "crops": [
            {
              "id": "5c4c6225-045e-437d-b8f9-21281cb177e9",
              "name": "Feijao",
              "area": 3000,
              "createdAt": "2025-01-16T17:25:20.566Z"
            }
          ]
        }
      ]
    }
  }
}
```

Se não existis a cultura da safra de fazenda atrelado ao usuário logado.
```json
{
  "statusCode": "404",
  "path": "/api/crops/8aae8577-1c26-4dc4-a881-e498ff364516",
  "message": "Crop 8aae8577-1c26-4dc4-a881-e498ff364516 not found.",
  "error": "Not Found"
}
```
Erros internos.
```json
{
  "statusCode": "500",
  "message": "Internal server error"
}
```

### DELETE /api/crops/${cropId}
Responsável por buscar a cultura das safras de fazendas atrelado ao usuário logado pelo ID e deletar do banco de dados. Só é permitido usar a rota estando logado.

![createUserRoute](docs/routes/crops/delete-crop/delete-crop.svg)

### Example input payload

Esta rota utiliza um **path parameter** para fornecer o `harvestsId`. Não há necessidade de enviar um JSON no corpo da requisição.

**Path Parameter**:
- `harvestsId` (string): O ID da fazenda a ser buscada.

### Example output
Se a cultura foi deletada com sucesso.
```json
{
  "statusCode": "200",
  "message": "Crop 06fffe10-f2ef-4293-8a66-b4095a3f9876 deleted"
}
```

Se a cultura não existir.
```json
{
  "statusCode": "404",
  "path": "/api/crops/8aae8577-1c26-4dc4-a881-e498ff364516",
  "message": "Crop 8aae8577-1c26-4dc4-a881-e498ff364516 not found.",
  "error": "Not Found"
}
```
Erros internos.
```json
{
  "statusCode": "500",
  "message": "Internal server error"
}
```

### GET /api/dashboard
Responsável por gerar dados e gráficos em uma página estática com:
Dados gerais:
- Total de fazendas cadastradas (quantidade).
- Total de hectares registrados (área total).

Dados do gráfico:
- Por estado.
- Por cultura plantada.
- Por uso do solo (área agricultável e vegetação).

**Acesse a página estática dos gráficos neste endereço** http://localhost:3333/api/dashboard

![createUserRoute](docs/routes/dashboard/create-dashboard.svg)

### Example input payload
Não possui JSON de input, rota apenas de consultas.
```json
{}
```

### Example output
Se o dashboard for criado com sucesso. lembrando que deve existir dados no banco de dados para o dashboard ser criado.
**Acesse a página estática dos gráficos neste endereço** http://localhost:3333/api/dashboard


## Executando a Aplicação em Ambiente de Desenvolvimento

### 1. **Instale as dependências**
Certifique-se de instalar as dependências do projeto usando um dos gerenciadores de pacotes listados abaixo:

```bash
npm install
pnpm install
yarn
```

> Escolha o gerenciador de pacotes que preferir. Recomenda-se seguir o padrão utilizado no projeto.

---

### 2. **Verifique os pré-requisitos**
- **Node.js**: Confirme que o Node.js está instalado na sua máquina. Se necessário, faça o download e instale a versão apropriada [aqui](https://nodejs.org/en/download/package-manager).
- **Docker**: Certifique-se de que o Docker está instalado e configurado. Caso precise, consulte o guia de instalação do Docker para sua plataforma [aqui](https://docs.docker.com/desktop/setup/install/windows-install/).

---

### 3. **Inicie o banco de dados no docker**
Suba o banco de dados em um contêiner Docker no modo em segundo plano:
```bash
docker compose up -d
```

---

### 4. **Criar arquivo .env com váriaveis de ambiente**
Crie um arquivo .env na raiz do seu projeto com as seguintes variáveis:
```
PORT=3333
ARGON2_TYPE=2
ARGON2_TIME_COST=8
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/brain-agriculture?schema=public"
JWT_PRIVATE_KEY=LS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0tCk1JSUV2UUlCQURBTkJna3Foa2lHOXcwQkFRRUZBQVNDQktjd2dnU2pBZ0VBQW9JQkFRQ1lMbUpCdVVvdjlUMWgKTzZrVkt2Slo1d0M3MjdrRm5zVFFqdzZOTnVBakN6MndPWHkzNWNlVVQ4NEF2bnBENnFTbmJFSjJEQXUrSFcyTApwMnhrV2F3VjBZSzA2cTF5bUpnaGY2L1JJSkhMa3VYSTFXbEdpbzUyVVBLN2sxMGNXVnRQdHpuME1xSjI2OFRhCkR2cmo1SngzYkhUMHFhbXZKc2lrTkhhdU4vMWJ1WjV0TEROT056bUVNdGtTWFNPVFBSYkpTWjU0T2xSSkJNUGQKRVA0VzJiYklDblBENE03NDhsQUYwTU9CT1BMNVA1bmEvaElEbGw4TDQyY1FDSG1lMkVSbTkyOXhzWHhsRUxDSApIS1dnTlVRYkwxTXN0bjkxZ2lMUUZIaVYyUENCb3dpQ0w1Z29TVXEzTTJWWm5rT2pBeW96NWV1b1NkRUNtVTczClNSeXQxV296QWdNQkFBRUNnZ0VBUHBZczhNek1kd2JNRkpZZHhzZmYzaHVFRUw2ZnpIRHNqcjJYQlhyQkdZaUEKK1YzYkxpS0JQenpIQTBWVE1XVnFERFVZN0VXdCtxVk5yVGJRL0VCbzVweEF2amtaMWx4dGpMRmYxSWtwak9qQQpPaVdTNDJFT2tCaGdpOFppYjh0TUkyKytsUERTSWtoNnNCZWpGV0NxL082TTl5WmowOVlHaEluVEdYbUxhRkkrCm9Xdm44TlB3VVlob0YrL2IxZkRiL3Y2Y3AvQ05pUlRrcE44SmI3RU80UGg0MEl1NVNXbkh0MEwwVzMvaDR4eWMKRWJOcXZjRDUrV2FhY0NZTlJrQjlKaUhQVTg4MkUvZFZYSnJLdUJWSTM0ek1EelNaOXp1bFkrYmwvVlpoN1QwaQpxRU0zaHdRSzBJVFRJTWR3Nmc2dnA3QnpLZ3ZDVXcrVUFwUTFEZ3J4bVFLQmdRQzFDekhzYXh0WUhNQU54bGlDCkd3Z0dCYU1MVFVoN0JzbWp5bFZTYUMyck5XSnRES1FlOFR0RlkrNFFLV0htY2RuY3owZmJCaG91ZGtrOXZ4em0KZ2dEbW5mL3NPQ0pDczNOdEF3SStpeUVlMU1UUXRWMDd4ck9sKzVtNzloczljUjB2akduazhxeHhGemh6cUlpSApKZkNLRzBKc2hiY3pIU2hBR2pwRWhVZ25sd0tCZ1FEWE1BME5FTlZnRllwRzJuWFVpdE9IN1lDdVhXVnM3WVlKCjZxS3dIR2hNeVRXcHBRRlllZVBYcW1ZZVpCU29yU05IZFJadlcvbGJjZ0gxRFFZVVlMVHpnKzBaTVU5aGVyUFAKRkpoUWxTMnF6THNKbXB2SmIzbythZEJocGxhdWRpdUZ1YVE3Skk3djV1Vlc2QWFJYW13bG16VDF5ZjYxemZISQpzejdqaU44RnhRS0JnR3FVMnFFcU5RRGNmQndmNXI5QmxxbWs2K1dkYTh3eHBNZXVPQ2k1ZUJsUTVrNzRvQzR2CktndWgxdWJnMWVmS29zMmhvZFhKYytSaWNwL05RUUJiREppMzc1QnJRNUF0QVFqdU9vWURkazRtU0cvdU5hTVoKU1cydi8wTnVrWDdNZHJnbFc3b1RPMzJnZy9WakJHMDc0cTRMZWtGVlB4THlXVjNUa3ZYLzJRaWxBb0dBYUUvaApzN2k2UnFhS2JraE9JQ2JmM1o5eTVwTmRyRTBEMGVETTFtUWU1MElPWWxzYmFPRkZZbkUycVhySVRQQUpEd1dpClIzOGxSSC9pbFFDb05zNmVTUUZsdVBXZlRsaWx1emQza25DT1A2S1k5RkhmUE9sdUw3MHBoM3lUdm1TSU9uM0EKTCs5TDN0MWx4UmdhdXB3a0txS3ZMSXFyajBQeTllQjJGdVJ0Z0NVQ2dZRUFrQW9BZWpJY0g3ZUdVVTYrbVlLOApSMkl3Y05wd2doZkZJVHhsWGZXN2JaVEsvSWt3L2VQM2dLS3BBNXBqWmo5R3BGYVFzVWJGR2tqcFBYME5aZDlkCmRsYlZsYlhqUmVTVUJUOVJvZms2ZE1nYjRWQjNwNGlTamF3Z1RxQTlJV3dSVEdYYXN1SXIyR3luSGU3dTZlYkkKN1ZvOUY5SlFuSTl5N2poT0lNSXRqRDA9Ci0tLS0tRU5EIFBSSVZBVEUgS0VZLS0tLS0K
JWT_PUBLIC_KEY=LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlJQklqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FROEFNSUlCQ2dLQ0FRRUFtQzVpUWJsS0wvVTlZVHVwRlNyeQpXZWNBdTl1NUJaN0UwSThPalRiZ0l3czlzRGw4dCtYSGxFL09BTDU2UStxa3AyeENkZ3dMdmgxdGk2ZHNaRm1zCkZkR0N0T3F0Y3BpWUlYK3YwU0NSeTVMbHlOVnBSb3FPZGxEeXU1TmRIRmxiVDdjNTlES2lkdXZFMmc3NjQrU2MKZDJ4MDlLbXByeWJJcERSMnJqZjlXN21lYlN3elRqYzVoRExaRWwwamt6MFd5VW1lZURwVVNRVEQzUkQrRnRtMgp5QXB6dytETytQSlFCZEREZ1RqeStUK1oydjRTQTVaZkMrTm5FQWg1bnRoRVp2ZHZjYkY4WlJDd2h4eWxvRFZFCkd5OVRMTFovZFlJaTBCUjRsZGp3Z2FNSWdpK1lLRWxLdHpObFdaNURvd01xTStYcnFFblJBcGxPOTBrY3JkVnEKTXdJREFRQUIKLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0tCg==
API_KEY=G5dNGLixUdy4xh4X2zWlSFVa8WVgPBwPGNCi0eX37Ws/OeHGsdBCdJS6X5AYkM/h0ldidFWfm0vyKw3HyL71zA==
NODE_ENV=dev
```

---

### 5. **Gerar tabelas, migrations e popular o banco de dados**
O caminho para as seed é esse aqui: [seeds](/src/infra/database/drizzle/seeds/run-seed.ts)

1. **Gere as tabelas e aplique as migrations no banco de dados**:
   ```bash
   npm run drizzle:generate
   npm run drizzle:push
   ```

2. **Se preferir, você pode popular o banco de dados com dados de exemplo usando uma seed**:
   ```bash
   npm run seed
   ```
3. **O Drizzle possui uma interface para visualizar o banco de dados**:
   ```bash
    npm run drizzle:studio
   ```
   Basta acessar o endereço que aparecer no seu terminal

   ![drizzleStudio](/docs/img/d_studio.png)



### 6. **Inicie a aplicação**
Execute a aplicação localmente:
```bash
npm run start
```

#### 4.1. **Modo debug**
Se preferir, você pode iniciar a aplicação diretamente no modo de **debug**. Basta configurar e iniciar o debugger da sua IDE:

![debug](docs/img/debug_tutorial.png)


### 7. **Acesse a aplicação**
Agora basta acessar a aplicação em:
[http://localhost:3333/](http://localhost:3333/)

Você será redirecionado automaticamente para a documentação **Swagger** da API, onde poderá explorar e testar os endpoints. 🚀

Lembre-se de adicionar a API-KEY no swagger antes de começar a testar as rotas.
```
G5dNGLixUdy4xh4X2zWlSFVa8WVgPBwPGNCi0eX37Ws/OeHGsdBCdJS6X5AYkM/h0ldidFWfm0vyKw3HyL71zA==
```

1) Clique no botão **Auhtorize** na interface do Nest
![nest](docs/img/nest_tuto_1.png)

2) Coloque a API-KEY no espaço onde está solicitando e clique em **Auhtorize**
![nest](docs/img/nest_tuto_2.png)

3) Pronto, você está logado utilizando a API-KEY e está autorizado a testar as rotas. 🚀
![nest](docs/img/nest_tuto_3.png)

## Executando Testes

### Para rodar todos os testes:
   ```bash
   npm test
   ```

### Para gerar um relatório de cobertura com Vitest:
   ```bash
   npm run test:coverage
   ```

### Para visualizar a interface do Vitest:
   ```bash
   npm run test:ui
   ```
