import * as childProcess from 'child_process';

// forces the config to be put in the env variables
import * as sequelize from './sequelize';

// force ts to not remove unused import
const s = sequelize;

childProcess.spawnSync(
  './node_modules/.bin/sequelize',
  process.argv.slice(2),
  { stdio: 'inherit' },
);
