

# Gallery Plus API

## Sobre
O Gallery Plus API é um backend desenvolvido em Node.js com NestJS, Prisma e PostgreSQL, focado no gerenciamento de álbuns e fotos. Permite cadastrar, organizar e armazenar imagens de forma eficiente, com recursos de busca, filtros, associação a múltiplos álbuns e integração com armazenamento em nuvem (Backblaze B2). Ideal para aplicações que precisam de um sistema robusto para manipulação de imagens e organização de galerias.

---

## Funcionalidades
- CRUD de álbuns
- CRUD de fotos
- Relacionar fotos a múltiplos álbuns
- Upload e armazenamento de imagens em nuvem (Backblaze B2)
- Busca de fotos por termo e filtro por álbum
- Configuração por variáveis de ambiente

## Tecnologias Utilizadas
- [NestJS](https://nestjs.com/) — framework para construção da API em Node.js
- [Prisma ORM](https://www.prisma.io/) — mapeamento objeto-relacional e acesso ao banco de dados
- [PostgreSQL](https://www.postgresql.org/) — banco de dados relacional utilizado
- [Docker](https://www.docker.com/) — conteinerização dos serviços para facilitar o desenvolvimento
- [Backblaze B2](https://www.backblaze.com/b2/cloud-storage.html) — armazenamento de imagens em nuvem
- [AWS SDK](https://aws.amazon.com/sdk-for-javascript/) — Backblaze disponibiliza uma API compatível com o Amazon S3. Isso significa que você pode usar as mesmas chamadas que faria no Amazon S3, apenas mudando a configuração do endpoint e das credenciais.
- [class-validator](https://github.com/typestack/class-validator) — validação de dados recebidos nos DTOs da aplicação
- [Zod](https://zod.dev/) — validação e tipagem de dados, especialmente útil para schemas e validação avançada

## Como rodar o projeto

### 1. Clone o repositório
```bash
git clone https://github.com/2joliveira/gallery-plus-api.git
cd gallery-plus-api
```

### 2. Instale as dependências
```bash
yarn install
# ou
npm install
```

### 3. Configure as variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto com as variáveis necessárias (veja exemplos em `src/env/`).

### 4. Suba o banco de dados com Docker
```bash
docker-compose up -d
```

### 5. Rode as migrations do Prisma
```bash
yarn prisma migrate dev
# ou
npx prisma migrate dev
```

### 6. Inicie a aplicação
```bash
yarn start:dev
# ou
npm run start:dev
```

## Scripts úteis
- `npm run start:dev`: inicia o servidor em modo desenvolvimento
- `npx prisma studio`: abre o Prisma Studio para visualizar o banco de dados

## Licença
MIT
Check out a few resources that may come in handy when working with NestJS:
