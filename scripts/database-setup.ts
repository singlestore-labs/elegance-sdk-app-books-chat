import { ObjectId, createEleganceServerClient } from "@singlestore/elegance-sdk/server";
import { readFileSync } from "fs";
import "dotenv/config";

import { Book } from "../types";
import { createBook, createUser, withDirname } from "../utils";

async function main() {
  const datasetPaths = {
    books: withDirname(import.meta.url, "../datasets/books.json"),
    booksWithContentEmbeddings: withDirname(import.meta.url, "../datasets/booksWithContentEmbeddings.json")
  };

  const datasets = {} as Record<keyof typeof datasetPaths, Book[]>;

  for (const [name, path] of Object.entries(datasetPaths) as [keyof typeof datasetPaths, string][]) {
    try {
      datasets[name] = JSON.parse(readFileSync(path, "utf-8"));
    } catch (error) {
      datasets[name] = [];
    }
  }

  const booksWithEmbeddings = datasets.booksWithContentEmbeddings.map(book => {
    return createBook({ ...book, id: new ObjectId().toString() });
  });

  const collectionNames = { books: "books", users: "users" };

  const collectionNamesWithEmbeddings = booksWithEmbeddings.map(({ embeddingCollectionName }) => {
    return embeddingCollectionName;
  });

  const allCollectionNames = [...Object.values(collectionNames), ...collectionNamesWithEmbeddings];

  const books = [...datasets.books, ...booksWithEmbeddings].map(({ content, embeddings, ...book }) => {
    return createBook({ ...book, id: new ObjectId().toString() });
  });

  const sampleUser = createUser({ id: new ObjectId().toString() });

  datasets.books = [];
  datasets.booksWithContentEmbeddings = [];

  if (process.env.KAI_URI) {
    await kaiSetup();
  }

  if (process.env.MYSQL_HOST) {
    await mysqlSetup();
  }

  async function kaiSetup() {
    const kaiEleganceServerClient = createEleganceServerClient("kai", {
      connection: { uri: process.env.KAI_URI!, database: `books_chat_kai` },
      openai: { apiKey: process.env.OPENAI_API_KEY }
    });

    const {
      connection: { db }
    } = kaiEleganceServerClient;

    const isDatabaseValid = await validateDatabase();

    if (isDatabaseValid) {
      console.log("Kai: Database is valid.");
    } else {
      await resetDatabase();
    }

    async function validateDatabase() {
      console.log("Kai: Validating database...");

      const dbCollectionsMeta = await Promise.all(
        (
          await db().collections()
        ).map(async collection => [collection.collectionName, await collection.countDocuments()])
      );

      return allCollectionNames.every(name => {
        const collectionMeta = dbCollectionsMeta.find(meta => meta[0] === name);
        return !!collectionMeta?.[1];
      });
    }

    async function resetDatabase() {
      console.log("Kai: Database reset...");
      await db().dropDatabase();
      await createCollections();
      await insertData();
      console.log("Kai: The database setup is complete.");

      async function createCollections() {
        console.log("Kai: Creating collections...");

        await Promise.all(Object.values(collectionNames).map(name => db().createCollection(name)));

        await Promise.all(
          collectionNamesWithEmbeddings.map(name => {
            return db().createCollection(name, { columns: [{ id: "embedding", type: "LONGBLOB NOT NULL" }] } as any);
          })
        );
      }

      async function insertData() {
        console.log("Kai: Inserting books...");
        await db().collection(collectionNames.books).insertMany(books);

        console.log("Kai: Inserting embeddings...");
        await Promise.all(
          booksWithEmbeddings.map(book => {
            const data = book.embeddings.map(({ text, embedding }) => ({
              text,
              embedding: kaiEleganceServerClient.ai.embeddingToBuffer(embedding)
            }));

            return db().collection(book.embeddingCollectionName).insertMany(data);
          })
        );

        console.log("Kai: Inserting a user sample");
        await db().collection(collectionNames.users).insertOne(sampleUser);
      }
    }
  }

  async function mysqlSetup() {
    const dbName = `books_chat_mysql`;

    const mysqlEleganceServerClient = createEleganceServerClient("mysql", {
      connection: {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.DB_PASSWORD,
        database: dbName
      },
      openai: {
        apiKey: process.env.OPENAI_API_KEY
      }
    });

    const { connection } = mysqlEleganceServerClient;
    const { tablePath } = connection;

    const isDatabaseValid = await validateDatabase();

    if (isDatabaseValid) {
      console.log("MySQL: Database is valid.");
    } else {
      await resetDatabase();
    }

    async function validateDatabase() {
      console.log("MySQL: Validating database...");
      try {
        const allTablesMeta = await Promise.all(
          allCollectionNames.map(async name => {
            const count = ((await connection.query(`SELECT COUNT(*) FROM ${tablePath(name)}`))[0] as any)[0];
            return [name, Object.values(count)[0]];
          })
        );

        return allCollectionNames.every(name => {
          const collectionMeta = allTablesMeta.find(meta => meta[0] === name);
          return !!collectionMeta?.[1];
        });
      } catch (error) {
        return false;
      }
    }

    async function resetDatabase() {
      console.log("MySQL: Database reset...");
      await dropTables();
      await createCollections();
      await insertData();
      console.log("MySQL: The database setup is complete.");

      async function dropTables() {
        const tables = (
          await connection.query(
            `SELECT table_name AS name FROM information_schema.tables WHERE table_schema = '${dbName}'`
          )
        )[0] as { name: string }[];

        await Promise.all(tables.map(({ name }) => connection.query(`DROP TABLE IF EXISTS ${tablePath(name)}`)));
      }

      async function createCollections() {
        console.log("MySQL: Creating tables...");

        await Promise.all([
          connection.query(`CREATE TABLE ${tablePath(collectionNames.books)} (
            id VARCHAR(255) PRIMARY KEY,
            title VARCHAR(1000) NOT NULL,
            description TEXT,
            content TEXT,
            author VARCHAR(255) NOT NULL,
            rating DECIMAL(3, 1) NOT NULL,
            reviews INT NOT NULL,
            embeddingCollectionName VARCHAR(255) NOT NULL,
            createdAt VARCHAR(255) NOT NULL,
            subjects TEXT
          )`),

          connection.query(`CREATE TABLE ${tablePath(collectionNames.users)} (
            id VARCHAR(255) PRIMARY KEY,
            reviews JSON
          )`),

          collectionNamesWithEmbeddings.map(name => {
            return connection.query(`CREATE TABLE ${tablePath(name)} (
              text TEXT,
              embedding LONGBLOB NOT NULL
            )`);
          })
        ]);
      }

      async function insertData() {
        console.log("MySQL: Inserting books...");

        const mysqlBooks = books.map(({ embeddings, subjects, ...book }) => {
          delete (book as any)._id;
          return {
            ...book,
            subjects: subjects.join(", ")
          };
        });

        await connection.query(
          `INSERT INTO ${tablePath(collectionNames.books)} (${Object.keys(mysqlBooks[0]).join(", ")}) VALUES ?`,
          [mysqlBooks.map(Object.values)]
        );

        console.log("MySQL: Inserting embeddings...");
        await Promise.all(
          booksWithEmbeddings.map(book => {
            const data = book.embeddings.map(({ text, embedding }) => ({
              text,
              embedding: mysqlEleganceServerClient.ai.embeddingToBuffer(embedding)
            }));

            return connection.query(
              `INSERT INTO ${tablePath(book.embeddingCollectionName)} (text, embedding) VALUES ?`,
              [data.map(Object.values)]
            );
          })
        );

        console.log("MySQL: Inserting a user sample");
        await connection.query(`INSERT INTO ${tablePath(collectionNames.users)} (id, reviews) VALUES (?, ?)`, [
          sampleUser.id,
          JSON.stringify(sampleUser.reviews)
        ]);
      }
    }
  }

  process.exit(0);
}

main();
