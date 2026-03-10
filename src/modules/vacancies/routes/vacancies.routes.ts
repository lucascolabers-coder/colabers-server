import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import VacanciesController from '../controllers/VacanciesController';

const vacanciesRouter = Router();
const vacanciesController = new VacanciesController();

vacanciesRouter.use(isAuthenticated);

vacanciesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      description: Joi.string().required(),
      requirements: Joi.string().required(),
    },
  }),
  vacanciesController.create,
);

vacanciesRouter.get('/', vacanciesController.index);

vacanciesRouter.post(
  '/apply',
  celebrate({
    [Segments.BODY]: {
      vacancy_id: Joi.string().uuid().required(),
    },
  }),
  vacanciesController.apply,
);

vacanciesRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  vacanciesController.delete,
);

vacanciesRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  vacanciesController.show,
);

export default vacanciesRouter;
