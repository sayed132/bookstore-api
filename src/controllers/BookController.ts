import { Request, Response } from 'express';
import {
  createBook,
  deleteBook,
  findAllBooks,
  findBookById,
  findBookWithAuthor,
  updateBook,
} from '../models/Book';

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search as string;
    const author = req.query.author ? Number(req.query.author) : undefined;

    const { data, total } = await findAllBooks({ page, limit, search, author });

    if (data.length === 0) {
      return res.json({
        message: 'No books found',
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
      message: 'Books fetched successfully',
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  try {
    const book = await findBookById(Number(req.params.id));
    if (!book) {
      res.status(404).json({ error: 'Book not found' });
      return;
    }
    res.json({
      message: 'Single Book fetched successfully',
      data: book,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch book' });
  }
};

export const createNewBook = async (req: Request, res: Response) => {
  try {
    const book = await createBook(req.body);
    res.status(200).json({
      message: 'Book created successfully',
      data: book,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create book' });
  }
};

export const updateExistingBook = async (req: Request, res: Response) => {
  try {
    const book = await updateBook(Number(req.params.id), req.body);
    if (!book) {
      res.status(404).json({ error: 'Book not found' });
      return;
    }
    res.json({
      message: 'Book updated successfully',
      data: book,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update book' });
  }
};

export const deleteExistingBook = async (req: Request, res: Response) => {
  try {
    const success = await deleteBook(Number(req.params.id));
    if (!success) {
      res.status(404).json({ error: 'Book not found' });
      return;
    }

    res.status(200).json({
      message: 'Book deleted successfully',
      deletedCount: 1,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete book' });
  }
};

export const getBookWithAuthor = async (req: Request, res: Response) => {
  try {
    const book = await findBookWithAuthor(Number(req.params.id));
    if (!book) {
      res.status(404).json({ error: 'Book not found' });
      return;
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch book with author' });
  }
};
