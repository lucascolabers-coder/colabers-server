import app from './app';
import { initializeDatabase } from '@shared/typeorm';

const port = Number(process.env.PORT) || 3333;

initializeDatabase()
  .then(() => {
    app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`Server started on port ${port}!`);
    });
  })
  .catch(error => {
    // eslint-disable-next-line no-console
    console.error('Failed to initialize database connection', error);
    process.exit(1);
  });
