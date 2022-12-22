import express from 'express';
import morgan from 'morgan';
import { PrismaClient } from '@prisma/client';
import { nanoid } from 'nanoid';

const genId = () => nanoid(16);

const db = new PrismaClient({
  log: ['error', 'query', 'info', 'warn'],
});

const seedDatabase = async () => {
  console.log('Seeding database...');

  const submissionCount = await db.submission.count();

  if (submissionCount === 0) {
    await db.submission.createMany({
      data: [
        {
          id: genId(),
          submittedAt: new Date(),
          data: {
            name: 'Zomer',
            twitter: 'zomeru',
          },
        },
        {
          id: genId(),
          submittedAt: new Date(),
          data: {
            name: 'John Doe',
            twitter: 'john_doe',
          },
        },
      ],
    });
    console.log('Database seeded.');
  }
};
seedDatabase();

const app = express();

app.use(morgan('dev'));

app.get('/', async (req, res) => {
  const submissions = await db.submission.findMany();

  res.json(submissions);
});

const port = Number(process.env.PORT) || 8080;

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is listening on port ${port}`);
});
