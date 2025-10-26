# 🎬 MovieDB - React + TypeScript + TMDB API

Uma aplicação web moderna desenvolvida em **React + TypeScript** que consome a **API pública do TMDB** para listar, buscar e favoritar filmes.  
O projeto com foco em **performance, organização e responsividade**.

---

## 🚀 Tecnologias Utilizadas

- ⚛️ **React 18 + Vite**
- 🧩 **TypeScript**
- 🎨 **Tailwind CSS**
- 🗂 **Redux Toolkit**
- 🌐 **Axios**
- 💖 **Lucide React** (ícones)
- ⚙️ **React Router DOM**
- 🔑 **.env** para variáveis de ambiente
- ✅ **ESLint + Type Checking**

---

## 📁 Estrutura de Pastas

```
src/
├── app/               # Configuração da store Redux e hooks globais
├── components/        # Componentes reutilizáveis 
├── features/          # Slices e thunks do Redux Toolkit
│   ├── movies/
│   ├── favorites/
│   └── ui/
├── pages/             # Páginas principais (Home, Detalhes, Favoritos, 404)
├── routes/            # Configuração das rotas
├── services/          # Configuração de API (axios)
├── assets/            # Imagens e ícones
└── main.tsx           # Ponto de entrada da aplicação
```

---

## 🧭 Funcionalidades Implementadas

### 🏠 Home
- Exibe a listagem de **filmes populares**.
- Cada card mostra **poster, nota e botão de favoritar**.
- Layout totalmente **responsivo e centralizado**.
- Indicadores de **carregamento e erro**.

### 🔍 Busca
- Campo de busca centralizado no header.
- Integração direta com o endpoint `/search/movie`.
- Resultados exibidos em grid com mesmo layout da Home.
- Mantém o termo pesquisado visível no input.

### 🎬 Detalhes do Filme
- Exibe **informações completas** de um filme: título, sinopse, gêneros, duração, data e nota.
- Imagem de fundo grande com **design fiel ao TMDB**.
- Botão estilizado para **adicionar/remover dos favoritos**.
- Link para página oficial do filme (quando disponível).
- Totalmente responsivo (layout adaptável entre desktop e mobile).

### ❤️ Favoritos
- Exibe todos os filmes favoritados via **Redux persistido**.
- Opção para **remover individualmente** ou limpar tudo.
- Exibição centralizada com **layout elegante**.
- Estado vazio com mensagem e botão para explorar filmes.
- Clique em um card redireciona para a tela de detalhes.

### 🚫 Página 404
- Tela moderna e responsiva para rotas inexistentes.
- Ícone de alerta (Lucide React), texto explicativo e botões:
  - 🔙 Voltar para Home
  - ❤️ Ir para Favoritos

---

## 🧠 Estado Global (Redux Toolkit)

O estado global é dividido em **três slices** principais:

| Slice | Responsabilidade |
|--------|------------------|
| `moviesSlice` | Carregar filmes populares e detalhes de filmes |
| `favoritesSlice` | Gerenciar filmes favoritados pelo usuário |
| `uiSlice` | Estados de interface (loading, erros, etc.) |

Os dados são obtidos via **thunks assíncronos** que consomem os endpoints da API TMDB e armazenam o resultado na store global.

---

## 🔧 Configuração e Execução

### 1️⃣ Clonar o repositório
```bash
git clone https://github.com/Alefy00/themovie.git
cd tmdb-movies-app
```

### 2️⃣ Instalar dependências
```bash
npm install
```

### 3️⃣ Criar o arquivo `.env`
Crie um arquivo na raiz do projeto com o seguinte conteúdo:

```bash
VITE_TMDB_LANG=pt-BR
VITE_TMDB_API_TOKEN=seu_token_aqui
```

> 💡 Exemplo de arquivo `.env.example` incluído no projeto para referência.

Você pode gerar o **token Bearer** acessando [https://developer.themoviedb.org](https://developer.themoviedb.org).

---

### 4️⃣ Rodar o servidor de desenvolvimento
```bash
npm run dev
```

O projeto rodará em:
```
http://localhost:5173
```

---

### 5️⃣ Gerar build de produção
```bash
npm run build
```

E para rodar localmente:
```bash
npm run dev
```

---

## 📸 Layout e Responsividade

- 🎨 **Modo escuro** padrão com tons de azul e cinza.
- 🖥️ **Desktop:** Cards dispostos em 5 a 6 colunas.
- 📱 **Mobile:** Layout em 1 ou 2 colunas, campos de busca reposicionados.
- 🧭 **Header fixo** com logo, campo de busca centralizado e navegação à direita.

---

## 🧩 Bibliotecas Adicionais

| Biblioteca | Uso |
|-------------|-----|
| `lucide-react` | Ícones vetoriais (Heart, AlertTriangle, etc.) |
| `axios` | Requisições HTTP à API TMDB |
| `react-router-dom` | Navegação entre páginas |
| `@reduxjs/toolkit` | Estado global e thunks |
| `tailwindcss` | Estilização responsiva e utilitária |

---

## 🧠 Conceitos Aplicados

- **Hooks customizados** (`useAppDispatch`, `useAppSelector`)
- **Tipagem completa** com TypeScript (`MovieLite`, `MovieDetail`)
- **Organização modular** por feature
- **Persistência de estado global**
- **Resiliência de rede** (tratamento de erros e loading)
- **Design system responsivo** com Tailwind
- **Boas práticas de semântica e acessibilidade**

---


## 🧭 Contatos

📧 **Email:** alefy_sx@hotmail.com 
💼 **LinkedIn:** [https://www.linkedin.com/in/alefy-xavier-developer/](https://www.linkedin.com/in/alefy-xavier-developer/)  
💻 **Portfólio:** [https://www.alefyxavier.com.br/](https://www.alefyxavier.com.br/)
