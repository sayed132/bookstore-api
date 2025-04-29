import { Request, Response } from 'express';
import {
  createAuthor,
  deleteAuthor,
  findAllAuthors,
  findAuthorById,
  findAuthorWithBooks,
  updateAuthor,
} from '../models/Author';

export const getAllAuthors = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search as string;

    const { data, total } = await findAllAuthors({ page, limit, search });

    if (data.length === 0) {
      return res.json({
        message: 'No authors found',
        data: [],
        pagination: {
          page,
          limit,
          total: 0,
          totalPages: 0,
        },
      });
    }

    res.json({
      message: 'Authors fetched successfully',
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch authors' });
  }
};

export const getAuthorById = async (req: Request, res: Response) => {
  try {
    const author = await findAuthorById(Number(req.params.id));
    if (!author) {
      res.status(404).json({ error: 'Author not found' });
      return;
    }
    res.json({
      message: 'Single Author fetched successfully',
      data: author,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch author' });
  }
};

export const createNewAuthor = async (req: Request, res: Response) => {
  try {
    const author = await createAuthor(req.body);
    res.status(200).json({
      message: 'Author created successfully',
      data: author,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create author' });
  }
};

export const updateExistingAuthor = async (req: Request, res: Response) => {
  try {
    const author = await updateAuthor(Number(req.params.id), req.body);
    if (!author) {
      res.status(404).json({ error: 'Author not found' });
      return;
    }
    res.json({
      message: 'Author updated successfully',
      data: author,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update author' });
  }
};

export const deleteExistingAuthor = async (req: Request, res: Response) => {
  try {
    const success = await deleteAuthor(Number(req.params.id));
    if (!success) {
      res.status(404).json({ error: 'Author not found' });
      return;
    }

    res.json({
      message: 'Author deleted successfully',
      deletedCount: 1,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete author' });
  }
};

export const getAuthorWithBooks = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const author = await findAuthorWithBooks(
      Number(req.params.id),
      page,
      limit,
    );

    if (!author) {
      res.status(404).json({ error: 'Author not found' });
      return;
    }

    if (author.books.data.length === 0) {
      return res.json({
        message: 'Author found but no books available',
        data: {
          author: author.author,
          books: {
            data: [],
            pagination: {
              page,
              limit,
              total: 0,
              totalPages: 0,
            },
          },
        },
      });
    }

    res.json({
      message: 'Author with books fetched successfully',
      data: {
        author: author.author,
        books: {
          data: author.books.data,
          pagination: {
            page,
            limit,
            total: author.books.total,
            totalPages: Math.ceil(author.books.total / limit),
          },
        },
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch author with books' });
  }
};
