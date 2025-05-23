# Bookstore API

A RESTful API for managing a bookstore, built with TypeScript, Express, and PostgreSQL.

## Features

- CRUD operations for books and authors
- Input validation using express-validator
- PostgreSQL database with Knex query builder
- TypeScript for type safety
- ESLint and Prettier for code quality
- Environment variable configuration
- Pagination support for list endpoints
- Search functionality for books and authors
- Proper error handling with meaningful messages
- Type-safe database operations with Knex

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Project Structure

```
src/
├── config/         # Configuration files
├── controllers/    # Route controllers
├── database/       # Database migrations and seeds
├── middlewares/    # Custom middlewares
├── models/         # Database models
├── routes/         # API routes
├── types/          # type definitions + interface
└── app.ts          # Application entry point
```

## Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd bookstore-api
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```
PORT=3000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=bookstoredb
DB_USER=postgres
DB_PASSWORD=your_password
```

4. Create the database:

```bash
createdb bookstoredb
```

5. Run migrations:

```bash
npm run migrate
```

## Development

Start the development server:

```bash
npm run dev
```

## Available Scripts

- `npm start`: Start the production server
- `npm run dev`: Start the development server with hot reload
- `npm run build`: Build the TypeScript code
- `npm run lint`: Run ESLint
- `npm run format`: Format code with Prettier
- `npm run migrate`: Run database migrations
- `npm run migrate:rollback`: Rollback database migrations
- `npm run seed`: Run database seeds

## API Endpoints

### Authors

- `GET /api/authors`: Get all authors (with pagination and search)
- `GET /api/authors/:id`: Get author by ID
- `POST /api/authors`: Create a new author
- `PUT /api/authors/:id`: Update an author
- `DELETE /api/authors/:id`: Delete an author
- `GET /api/authors/:id/books`: Get author with their books (with pagination)

### Books

- `GET /api/books`: Get all books (with pagination and search)
- `GET /api/books/:id`: Get book by ID
- `POST /api/books`: Create a new book
- `PUT /api/books/:id`: Update a book
- `DELETE /api/books/:id`: Delete a book
- `GET /api/books/:id/author`: Get book with author information
- `GET /api/books?author=6`: Get books by author ID (with pagination)

## Request/Response Examples

### Create Author

```json
POST /api/authors
{
  "name": "John Doe",
  "bio": "Famous author",
  "birthdate": "1990-01-01"
}
```

### Create Book

```json
POST /api/books
{
  "title": "The Great Book",
  "description": "A wonderful story",
  "published_date": "2024-01-01",
  "author_id": 1
}
```

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- 200: Success
- 201: Created
- 400: Bad Request (Validation errors)
- 404: Not Found
- 500: Internal Server Error

Example error response:

```json
{
  "errors": [
    {
      "msg": "Name is required",
      "param": "name",
      "location": "body"
    }
  ]
}
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the ISC License.
