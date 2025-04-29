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
    res.json({
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
    res.json(author);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch author' });
  }
};

export const createNewAuthor = async (req: Request, res: Response) => {
  try {
    const author = await createAuthor(req.body);
    res.status(201).json(author);
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
    res.json(author);
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
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete author' });
  }
};

export const getAuthorWithBooks = async (req: Request, res: Response) => {
  try {
    const author = await findAuthorWithBooks(Number(req.params.id));
    if (!author) {
      res.status(404).json({ error: 'Author not found' });
      return;
    }
    res.json(author);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch author with books' });
  }
};
