import * as path from 'path';
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import Umzug from 'umzug';

require('dotenv').config();
// Sequelize CLI loads its config as a JS file.
// However our configs are TS.  So this file
// converts our config to env variables that
// the JS file relies on.
// This is used by config.js to verify the env variables
// have been set via this file in case config.js is
// loaded directly.
process.env.SEQUELIZE_CONFIG_LOADED = 'true';

export const sequelizeConfig: SequelizeOptions = require('./config.js');

const sequelize = new Sequelize(sequelizeConfig);
export default sequelize;

function checkForMigrations(): Promise<Umzug.Migration[]> {
  // @ts-ignore
  const umzug = new Umzug({
    storage: 'sequelize',
    storageOptions: { sequelize },
    migrations: { path: path.resolve('src', 'sequelize', 'migrations') },
  });
  return umzug.pending();
}

export function performMigrations(): Promise<Umzug.Migration[]> {
  // @ts-ignore
  const umzug = new Umzug({
    storage: 'sequelize',
    storageOptions: { sequelize },
    migrations: {
      path: path.resolve('src', 'sequelize', 'migrations'),
      params: [sequelize.getQueryInterface(), Sequelize],
    },
    logging: console.log,
  });
  return umzug.up();
}

export function performSeeders(): Promise<Umzug.Migration[]> {
  // @ts-ignore
  const umzug = new Umzug({
    storage: 'sequelize',
    storageOptions: { sequelize },
    migrations: {
      path: path.resolve('src', 'sequelize', 'seeders'),
      params: [sequelize.getQueryInterface(), Sequelize],
    },
    logging: console.log,
  });
  return umzug.up();
}

export async function sequelizeInit() {
  const migrations = await checkForMigrations();

  if (process.env.NODE_ENV !== 'test') {
    if (migrations.length) {
      console.error(
        'Pending migrations need to be run:\n',
        migrations.map((migration) => migration.file).join('\n '),
        '\nUse this command to run migrations:\n npm run sequelize db:migrate or yarn sequelize db:migrate',
        '\nUse this command to run seeds:\n npm run sequelize db:seed:all or yarn sequelize db:seed:all',
      );

      if (process.env.NODE_ENV !== 'production') {
        process.exit(1);
      }
    }
  }
}
