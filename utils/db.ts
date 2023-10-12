import { User, Book, UserReview, MySQLBook } from "../types";
import { slugify } from "./helpers";

export function createUser<T extends Partial<User>>(user?: T): User {
  return { id: "", reviews: [], ...user };
}

export function createBook<T extends Partial<Book>>(book?: T): Book {
  return {
    id: "",
    title: "",
    description: "",
    content: "",
    author: "",
    rating: 0,
    reviews: 0,
    embeddingCollectionName:
      book?.embeddingCollectionName ?? (book?.title && book.embeddings?.length ? slugify(book.title) : ""),
    createdAt: new Date().toISOString(),
    ...book,
    subjects: [...(book?.subjects ?? [])],
    embeddings: [...(book?.embeddings ?? [])]
  };
}

export function createUserReview<T extends Partial<UserReview>>(review?: T): UserReview {
  return { bookId: "", value: 0, ...review };
}

export function normalizeMySQLBook(mysqlBook: MySQLBook): Book {
  return { ...mysqlBook, embeddings: [], subjects: mysqlBook.subjects.split(", ") };
}
