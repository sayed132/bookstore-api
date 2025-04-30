# Database Migration Files for Bookstore API

This package contains the database migration files for setting up the Bookstore API database. These files are written in TypeScript and use Knex as the query builder.

## What's Included

1. `20240101000000_create_authors_table.ts`

   - Creates the authors table
   - Includes fields: id, name, bio, birthdate, timestamps
   - All fields are properly typed and constrained

2. `20240101000001_create_books_table.ts`
   - Creates the books table
   - Includes fields: id, title, description, published_date, author_id, timestamps
   - Sets up foreign key relationship with authors table
   - Implements cascade deletion

## Prerequisites

Before using these migration files, ensure you have:

1. Node.js installed (v14 or higher)
2. PostgreSQL installed (v12 or higher)
3. A PostgreSQL database created named `bookstoredb`

## Setup Instructions

1. Install required dependencies:

```bash
npm install knex typescript @types/node pg
```

2. Create a `knexfile.ts` in your project root:

```typescript
import type { Knex } from 'knex';
import dotenv from 'dotenv';

dotenv.config();

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'postgresql',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      database: process.env.DB_NAME || 'bookstoredb',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD,
    },
    migrations: {
      directory: './migrations',
    },
  },
};

export default config;
```

3. Create a `.env` file:

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=bookstoredb
DB_USER=postgres
DB_PASSWORD=your_password
```

4. Run the migrations:

```bash
npx knex migrate:latest
```

## Verifying the Setup

After running the migrations, you can verify the setup by:

1. Connecting to your database:

```bash
psql -d bookstoredb
```

2. Checking the tables:

```sql
\dt
```

3. Viewing table structures:

```sql
\d authors
\d books
```

## Rollback Instructions

If you need to undo the migrations:

```bash
npx knex migrate:rollback
```

## Important Notes

- The migrations are ordered by their timestamp prefixes
- Each migration includes both `up()` and `down()` functions
- Foreign key constraints are properly set up
- CASCADE deletion is enabled for books when an author is deleted
- Timestamps are automatically managed
- All fields are properly typed and constrained

## Support

If you encounter any issues or have questions, please refer to:

- Knex documentation: https://knexjs.org/
- PostgreSQL documentation: https://www.postgresql.org/docs/
