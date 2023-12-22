export type Book = {
  name: string;
  authorId: number;
  description: string;
  photo?: string;
};

export type DatabaseBook = Book & {
  id: string;
};

export type InsertBook = Omit<DatabaseBook, 'id'>;

export type BookPatch = Partial<Book>;
