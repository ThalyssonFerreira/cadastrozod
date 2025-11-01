Painel de Agendamento e Suporte Técnico

Descrição:
Aplicação em Next.js e TypeScript com validação Zod, simulando um painel de atendimento técnico com geração de protocolo e chat interativo.

Funcionalidades

Formulário com validação via Zod

Geração automática de protocolo (PR-YYYYMMDD-####)

Tratamento e normalização de dados (useState, useMemo, useEffect)

Exibição dinâmica de erros

Login com e-mail, senha e protocolo

Redirecionamento para página de chat simulado

Tecnologias

Next.js

TypeScript

Zod

React Hooks

Tailwind CSS

Estrutura
app/
 ├─ page.tsx        # Formulário e login
 └─ fale/page.tsx   # Chat fake com bot
lib/
 ├─ validators.ts   # Schemas e validações Zod
 └─ utils.ts        # Normalização e protocolo

Execução
npm install
npm run dev


Acesse: http://localhost:3000



Next.js • React • TypeScript • Zod • Tailwind • Validação • Hooks • Front-end • UI Interativa • Chatbot Simulado
