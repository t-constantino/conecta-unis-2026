# Conecta Unis 2026

Plataforma conceitual e de demonstração voltada à conexão entre empresas e alunos do Grupo Unis, focada em vagas de estágio, trainees e microdesafios práticos para simplificar processos seletivos.

Desenvolvido como **projeto de extensão do curso de ADS da Faculdade Unis São Lourenço** para fins de **apresentação e avaliação acadêmica**.

> **Status do projeto:** Este projeto é **apenas uma demonstração (demo)**. O site **ainda não funciona de verdade de forma completa ou eficaz** e **não foi aprovado para ser oficializado**. Atualmente, apenas a visualização de contas criadas e mensagens funciona no ambiente, enquanto o fluxo de vagas no banco de dados e a exibição na lista de vagas publicadas ainda não funcionam direito.

## Link da Demonstração

Acesse a aplicação ao vivo na Vercel:
https://conecta-unis-2026.vercel.app/

## Acesso para Testes (Área Administrativa / Empresa)

Para testar as funcionalidades disponíveis na demonstração do painel administrativo, utilize as seguintes credenciais de teste:

- **E-mail:** `talles.admin@gmail.com`
- **Senha:** `adminsenha123`

## Avisos Importantes de Segurança & Privacidade

> 1. **E-mail Fictício:** O endereço `talles.admin@gmail.com` informado acima é fictício, elaborado apenas para o ambiente de demonstração e não existe na vida real.
>
> 2. **Proteção de Dados:** Este ambiente é estritamente de demonstração (Demo). **NÃO insira dados reais, pessoais ou sensíveis** em nenhum campo na seção Fale Conosco ou em qualquer outro formulário.
>
> 3. **Cadastro de Contas e Vagas:** Caso deseje cadastrar novas contas ou testar o fluxo de vagas, utilize sempre dados fictícios.

## Estado das Funcionalidades na Demo

- [x] **Painel Administrativo:** Visualização de mensagens recebidas e contas cadastradas no ambiente de teste.
- [ ] **Vagas no Banco de Dados e Vagas Publicadas:** Fluxo ainda não funcional de forma completa; vagas criadas não aparecem corretamente nas vagas publicadas.
- [x] **Fluxo de Publicação de Vagas (Interface/Etapas):** Formulário estruturado em etapas com campos de faixa salarial, formato de entrevista, microdesafio prático, compromisso de feedback em até 7 dias e pré-visualização.

## Tecnologias Utilizadas

- **Origem e Build:** Projeto exportado/iniciado a partir do Figma e empacotado com **Vite**
- **Front-end:** **React**, **TypeScript** e **Tailwind CSS**
- **Back-end & Serverless:** Funções serverless na Vercel (`/api`) com **bcryptjs**
- **Banco de Dados:** **Neon PostgreSQL** (`@neondatabase/serverless` / `@vercel/postgres`)
- **Hospedagem & Deploy:** **Vercel** (via GitHub)

## Contexto Acadêmico e Uso

Desenvolvimento e documentação apoiados com auxílio de IA (Gemini) para revisão de código, correção de erros de build e organização da documentação.
Projeto de extensão universitária desenvolvido para apresentação, avaliação e demonstração tecnológica, sem aprovação oficial para operação real.
