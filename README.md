# BuscaBat 🔋

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-Firestore%20%2B%20Auth-FFCA28?logo=firebase&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-build-646CFF?logo=vite&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green)

Marketplace de duas pontas para troca de bateria automotiva: o cliente encontra a
bateria compatível pelo melhor preço e agenda (ou pede na hora) o serviço; a loja
gerencia catálogo e pedidos; o dono da plataforma acompanha dados agregados de
vida útil, marca e perfil de clientes.

## Problema que resolve

- **Cliente**: bateria parou, não sabe qual comprar nem onde, precisa decidir rápido
  entre pedir agora ou agendar um horário.
- **Vendedor/Loja**: disponibilizar o serviço de troca e (fase 2) prever qual bateria
  tem maior chance de sair a seguir, com base em dados históricos.
- **Dono**: enxergar vida útil média por marca, produção, sazonalidade e perfil dos
  clientes num único painel.

## Stack

- [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- [Firebase](https://firebase.google.com/) (Authentication + Firestore)
- [React Router](https://reactrouter.com/)
- Deploy: [Vercel](https://vercel.com/)
- Testes: [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/)

## Estrutura do projeto

```
src/
├── firebase/       # inicialização e acesso ao Firebase (config, auth, firestore)
├── contextos/      # AuthContext — estado global de autenticação
├── hooks/          # useAuth, useAgendamentos, useDebounce
├── servicos/       # única camada que fala com o Firestore (agendamento, bateria, loja, usuário, avaliação)
├── paginas/        # telas por papel: auth/, cliente/, loja/, dono/
├── componentes/    # comuns/ (apresentação) e layout/ (Header, Footer, RotaProtegida)
├── utils/          # formatarPreco, formatarData, gerarIdempotencyKey
└── estilos/
tests/
scripts/            # seedFirestore.js — popula dados de teste consistentes
firestore.rules
firestore.indexes.json
```

Regra de arquitetura: **páginas nunca acessam o Firestore diretamente**, sempre
passam por `servicos/`. Isso mantém a lógica testável e evita regras de segurança
inconsistentes.

## Papéis de usuário

| Papel | O que faz |
|---|---|
| Cliente | busca bateria compatível, compara preço/loja, agenda ou pede na hora, avalia o serviço |
| Loja | cadastra catálogo e preços, recebe e gerencia pedidos |
| Dono | acompanha dashboard agregado (vida útil, marca, região, perfil de clientes) |

## Rodando localmente

```bash
git clone https://github.com/<seu-usuario>/buscabat.git
cd buscabat
npm install
cp .env.example .env.local   # preencha com suas chaves do Firebase
npm run dev
```

### Variáveis de ambiente (`.env.local`)

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_APP_ID=
```

### Popular dados de teste

```bash
node scripts/seedFirestore.js
```

### Rodar testes

```bash
npm run test
```

## Deploy das regras do Firestore

```bash
firebase deploy --only firestore:rules,firestore:indexes
```

## Decisões técnicas importantes

- **Preço** é sempre armazenado em centavos (inteiro) no Firestore — nunca `float`.
- **Datas/horários** são sempre salvos em UTC (`Timestamp`) e convertidos para o
  fuso local apenas na exibição.
- **Agendamento** usa `runTransaction` do Firestore para evitar que dois clientes
  reservem o mesmo horário na mesma loja, combinado com uma `idempotencyKey`
  gerada no cliente para evitar pedidos duplicados por duplo clique.
- **Regras de segurança** (`firestore.rules`) restringem leitura/escrita por papel:
  cliente só acessa seus próprios agendamentos, loja só edita seu próprio catálogo,
  dono tem leitura ampla para o dashboard.

## Roadmap

- [x] Estrutura do projeto e regras de segurança
- [ ] Fluxo de cadastro/login por papel
- [ ] Catálogo de loja + listagem de preços
- [ ] Fluxo de pedido do cliente (agora / agendado)
- [ ] Avaliações
- [ ] Dashboard do dono
- [ ] Painel preditivo (modelo treinado a partir de dataset do Kaggle)

## Contribuindo

1. Crie uma branch a partir de `main`: `git checkout -b feature/nome-da-feature`
2. Siga a regra de arquitetura do projeto: páginas nunca chamam o Firestore direto,
   sempre passe por `servicos/`
3. Rode `npm run test` antes de abrir o PR
4. Descreva no PR qual fluxo foi alterado (cliente / loja / dono) e, se mexer em
   `firestore.rules`, explique o motivo — é a camada mais sensível do projeto
5. Abra o Pull Request para `main` com uma descrição objetiva do que mudou

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
