import { NextFunction, Request, Response } from 'express';
import { body, param, validationResult } from 'express-validator';

export const validateAuthor = [
  body('name').notEmpty().withMessage('Name is required'),
  body('birthdate').isDate().withMessage('Valid birthdate is required'),
  body('bio').optional().isString(),
];

export const validateBook = [
  body('title').notEmpty().withMessage('Title is required'),
  body('published_date')
    .isDate()
    .withMessage('Valid published date is required'),
  body('author_id').isInt().withMessage('Valid author ID is required'),
  body('description').optional().isString(),
];

export const validateId = [
  param('id').isInt().withMessage('Valid ID is required'),
];

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
};
