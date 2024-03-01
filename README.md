**Attention**: The code in this repository is intended for experimental use only and is not fully tested, documented, or supported by SingleStore. Visit the [SingleStore Forums](https://www.singlestore.com/forum/) to ask questions about this repository.


## Getting Started

1. Sign up for [SingleStore](https://www.singlestore.com/) and create `books_chat_mysql` and/or `books_chat_kai` databases
2. Create an `.env` file based on the `.env.sample` file
3. Install dependencies by running: `npm i`
4. Start the application by running: `sh ./scripts/start.sh`
5. Open [http://localhost:3000](http://localhost:3000) with your browser.

## Development

1. Sign up for [SingleStore](https://www.singlestore.com/) and create `books_chat_mysql` and/or `books_chat_kai` databases
2. Create an `.env` file based on the `.env.sample` file
3. Install dependencies once by running: `npm i`
4. Setup a database by running: `npm run db:setup`
5. Build the application once by running: `npm run build`
6. Start development environment by running: `npm run dev`
7. Open [http://localhost:3000](http://localhost:3000) with your browser.

## Connection Type

1. If you have a `mysql` db, the `NEXT_PUBLIC_CONNECTION_TYPE` variable must have the value `mysql`
2. If you have a `kai` db, the `NEXT_PUBLIC_CONNECTION_TYPE` variable must have the value `kai`
3. If you have both databases, `NEXT_PUBLIC_CONNECTION_TYPE` variable must have the value `mysql,kai`
