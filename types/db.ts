export type Book = {
  id: string;
  title: string;
  description?: string;
  content?: string;
  author: string;
  subjects: string[];
  rating: number;
  reviews: number;
  createdAt: string;
  embeddings: { text: string; embedding: number[] }[];
  embeddingCollectionName: string;
};

export type MySQLBook = Omit<Book, "subjects" | "embeddings"> & { subjects: string };

export type UserReview = {
  bookId: string;
  value: number;
};

export type User = {
  id: string;
  reviews: UserReview[];
};

export type MySQLUser = Omit<User, "reviews"> & { reviews: string };
