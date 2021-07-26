import express from 'express';
import cors from 'cors';

import errorHandler from './middlewares/errorHandlers';

import { sequelizeInit } from './sequelize/sequelize';
import initRoutes from './routes';
import initSwagger from './swaggerDoc';

require('dotenv').config();

sequelizeInit();

const app = express();

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false, limit: '50mb' }));

// parse application/json
app.use(express.json({ limit: '50mb' }));

initRoutes(app);

initSwagger(app);

app.use(errorHandler);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`server listening to ${port}`);
});
