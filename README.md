# Express.js REST API Boilerplate

A robust and scalable Express.js boilerplate designed for building RESTful APIs with TypeScript, Docker, and comprehensive testing support.

---

## 🚀 Features

- **TypeScript** for static typing and enhanced developer experience
- **Dockerized** setup for consistent development and deployment environments
- **ESLint** integration for code quality and consistency
- **Jest** for unit and integration testing
- **Environment-based configuration** using `.env` files
- **Makefile** for streamlined development workflows
- **Modular project structure** for scalability and maintainability

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v22 or later)
- [NVM](https://github.com/nvm-sh/nvm) (use node version manager)
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/tjkusnadi/express.git
   cd express
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

---

## 🐳 Docker Usage

### Build and Run with Docker Compose

```bash
docker-compose up --build
```

---

## 🧪 Running Tests

### Run Integration test

```bash
npm run test:integration
```

---

## 🧰 Available Scripts

- `npm run dev` - Start the development server with hot reloading
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start the production server
- `npm run test:integration` - Run all tests
- `npm run lint` - Lint the codebase
- `npm run lint:fix` - Automatically fix lint of the codebase
- `make list` - View available Makefile commands

---


## 🙌 Acknowledgements

- [Express.js](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js
- [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript that compiles to plain JavaScript
- [Docker](https://www.docker.com/) - Platform for developing, shipping, and running applications
- [Jest](https://jestjs.io/) - Delightful JavaScript Testing Framework
