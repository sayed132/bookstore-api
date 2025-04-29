import db from '../config/database';
import { Author, AuthorWithBooks } from '../types';

interface PaginationParams {
  page: number;
  limit: number;
  search?: string;
}

export const findAllAuthors = async ({
  page = 1,
  limit = 10,
  search,
}: PaginationParams): Promise<{ data: Author[]; total: number }> => {
  const query = db('authors').select('*');

  if (search) {
    query.where('name', 'ilike', `%${search}%`);
  }

  // Get total count first
  const countResult = await db('authors')
    .count('* as count')
    .modify((queryBuilder) => {
      if (search) {
        queryBuilder.where('name', 'ilike', `%${search}%`);
      }
    })
    .first();

  // Get paginated data
  const data = await query
    .limit(limit)
    .offset((page - 1) * limit)
    .orderBy('created_at', 'desc');

  return {
    data,
    total: Number(countResult?.count) || 0,
  };
};

export const findAuthorById = async (id: number): Promise<Author | undefined> => {
  return db('authors').where({ id }).first();
};

export const createAuthor = async (
  author: Omit<Author, 'id' | 'created_at' | 'updated_at'>,
): Promise<Author> => {
  const authorData = {
    ...author,
    bio: author.bio || '',
    created_at: new Date(),
    updated_at: new Date(),
  };
  const [newAuthor] = await db('authors').insert(authorData).returning('*');
  return newAuthor;
};

export const updateAuthor = async (
  id: number,
  author: Partial<Author>,
): Promise<Author | undefined> => {
  const updateData = {
    ...author,
    updated_at: new Date(),
  };
  const [updatedAuthor] = await db('authors').where({ id }).update(updateData).returning('*');
  return updatedAuthor;
};

export const deleteAuthor = async (id: number): Promise<boolean> => {
  const count = await db('authors').where({ id }).delete();
  return count > 0;
};

export const findAuthorWithBooks = async (id: number): Promise<AuthorWithBooks | undefined> => {
  const author = await db('authors').where({ id }).first();
  if (!author) return undefined;

  const books = await db('books').where({ author_id: id });
  return { ...author, books };
};
