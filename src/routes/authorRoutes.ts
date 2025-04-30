import { Router } from 'express';
import {
  createNewAuthor,
  deleteExistingAuthor,
  getAllAuthors,
  getAuthorById,
  getAuthorWithBooks,
  updateExistingAuthor,
} from '../controllers/AuthorController';
import {
  validateAuthor,
  validateId,
  validateRequest,
} from '../middlewares/validation';

const router = Router();

router.get('/', getAllAuthors);
router.get('/:id', validateId, validateRequest, getAuthorById);
router.post('/', validateAuthor, validateRequest, createNewAuthor);
router.put(
  '/:id',
  validateId,
  validateAuthor,
  validateRequest,
  updateExistingAuthor,
);
router.delete('/:id', validateId, validateRequest, deleteExistingAuthor);
router.get('/:id/books', validateId, validateRequest, getAuthorWithBooks);

export default router;
