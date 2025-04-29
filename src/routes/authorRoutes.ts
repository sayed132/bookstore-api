import { Router } from 'express';
import {
  createNewAuthor,
  deleteExistingAuthor,
  getAllAuthors,
  getAuthorById,
  getAuthorWithBooks,
  updateExistingAuthor,
} from '../controllers/AuthorController';
import { authenticate, authorize } from '../middlewares/auth';
import { validateAuthor, validateId, validateRequest } from '../middlewares/validation';

const router = Router();

router.get('/', getAllAuthors);
router.get('/:id', validateId, validateRequest, getAuthorById);
router.post(
  '/',
  // authenticate,
  // authorize(['admin']),
  validateAuthor,
  validateRequest,
  createNewAuthor,
);
router.put(
  '/:id',
  // authenticate,
  // authorize(['admin']),
  validateId,
  validateAuthor,
  // validateRequest,
  updateExistingAuthor,
);
router.delete(
  '/:id',
  // authenticate,
  // authorize(['admin']),
  validateId,
  validateRequest,
  deleteExistingAuthor,
);
router.get('/:id/books', validateId, validateRequest, getAuthorWithBooks);

export default router;
