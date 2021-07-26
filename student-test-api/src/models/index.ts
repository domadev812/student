import { Sequelize } from 'sequelize-typescript';
import IDbModels from './models.d';

import sequelize from '../sequelize/sequelize';

type IGoGoSequelize = IDbModels & { sequelize: Sequelize };
const db = <IGoGoSequelize>(<unknown>sequelize.models);

db.sequelize = sequelize;

export default db;
