import { Router } from 'express';
import {
  createNewBook,
  deleteExistingBook,
  getAllBooks,
  getBookById,
  getBookWithAuthor,
  updateExistingBook,
} from '../controllers/BookController';
import {
  validateBook,
  validateId,
  validateRequest,
} from '../middlewares/validation';

const router = Router();

router.get('/', getAllBooks);
router.get('/:id', validateId, validateRequest, getBookById);
router.post('/', validateBook, validateRequest, createNewBook);
router.put(
  '/:id',
  validateId,
  validateBook,
  validateRequest,
  updateExistingBook,
);
router.delete('/:id', validateId, validateRequest, deleteExistingBook);
router.get('/:id/author', validateId, validateRequest, getBookWithAuthor);

export default router;
