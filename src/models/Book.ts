import db from '../config/database';
import { Book, BookWithAuthor } from '../types';

interface PaginationParams {
  page: number;
  limit: number;
  search?: string;
  author?: number;
}

export const findAllBooks = async ({
  page = 1,
  limit = 10,
  search,
  author,
}: PaginationParams): Promise<{ data: Book[]; total: number }> => {
  const query = db('books').select('*');

  if (search) {
    query.where('title', 'ilike', `%${search}%`);
  }

  if (author) {
    query.where({ author_id: author });
  }

  const total = await query.clone().count('* as count').first();
  const data = await query
    .limit(limit)
    .offset((page - 1) * limit)
    .orderBy('created_at', 'desc');

  return {
    data,
    total: Number(total?.count) || 0,
  };
};

export const findBookById = async (id: number): Promise<Book | undefined> => {
  return db('books').where({ id }).first();
};

export const createBook = async (
  book: Omit<Book, 'id' | 'created_at' | 'updated_at'>,
): Promise<Book> => {
  const bookData = {
    ...book,
    description: book.description || '',
    created_at: new Date(),
    updated_at: new Date(),
  };
  const [newBook] = await db('books').insert(bookData).returning('*');
  return newBook;
};

export const updateBook = async (
  id: number,
  book: Partial<Book>,
): Promise<Book | undefined> => {
  const updateData = {
    ...book,
    updated_at: new Date(),
  };
  const [updatedBook] = await db('books')
    .where({ id })
    .update(updateData)
    .returning('*');
  return updatedBook;
};

export const deleteBook = async (id: number): Promise<boolean> => {
  const count = await db('books').where({ id }).delete();
  return count > 0;
};

export const findBooksByAuthor = async (authorId: number): Promise<Book[]> => {
  return db('books').where({ author_id: authorId });
};

export const findBookWithAuthor = async (
  id: number,
): Promise<BookWithAuthor | undefined> => {
  const book = await db('books').where({ id }).first();
  if (!book) return undefined;

  const author = await db('authors').where({ id: book.author_id }).first();
  return { ...book, author };
};
