import 'express-async-errors';
import express, { json } from 'express';
import helmet from 'helmet';
import { opportunityRouter } from './routes/opportunity.routes';
import { HandleErrors } from './middlewares/handleErrors.middleware';
import { userRouter } from './routes/user.routes';

export const app = express();

app.use(helmet());

app.use(json());

app.use('/opportunities', opportunityRouter);
app.use('/users', userRouter);
app.use(HandleErrors.execute);
