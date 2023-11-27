export type Book = {
  name: string;
  authorId: number;
  description: string;
  photo?: string;
};

export type DatabaseBook = Book & {
  id: string;
  rating: number;
  ratingTotal: number;
  pages: number;
  totalViews: number;
  favorites: number;
};

export type InsertBook = Omit<DatabaseBook, 'id'>;

export type BookPatch = Partial<Book>;
