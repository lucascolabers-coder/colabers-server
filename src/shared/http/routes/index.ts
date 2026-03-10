import { Router } from 'express';
import usersRouter from '@modules/users/routes/users.routes';
import sessionsRouter from '@modules/users/routes/sessions.routes';
import vacanciesRouter from '@modules/vacancies/routes/vacancies.routes';

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({
    status: 'ok',
    service: 'colabers-api',
  });
});

routes.get('/health', (req, res) => {
  return res.json({
    status: 'ok',
  });
});

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/vacancies', vacanciesRouter);

export default routes;
