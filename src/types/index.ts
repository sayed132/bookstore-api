export interface Author {
  id: number;
  name: string;
  bio?: string;
  birthdate: Date;
  created_at: Date;
  updated_at: Date;
}

export interface Book {
  id: number;
  title: string;
  description?: string;
  published_date: Date;
  author_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface AuthorWithBooks extends Author {
  books: Book[];
}

export interface BookWithAuthor extends Book {
  author: Author;
}
