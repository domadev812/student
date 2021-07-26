/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import { Express } from 'express';

// MODULES
import * as fs from 'fs';
import * as path from 'path';

require('dotenv').config();

/**
 * walkSync returns all the files in a directory (including files in nested folders) in an array
 * @param  {String} dir      directory in which you want to get the list of files of
 * @param  {Array}  filelist
 * @return {Array}          an array of paths to all the files in dir
 */
const walkSync = (dir: string, filelistParam: any[] = []) => {
  let filelist = filelistParam;
  fs.readdirSync(dir).forEach((file) => {
    filelist = fs.statSync(path.join(dir, file)).isDirectory()
      ? walkSync(path.join(dir, file), filelist)
      : filelist.concat(path.join(dir, file));
  });

  return filelist;
};

// Get the array of file paths
const fileList = walkSync(__dirname);

const filterTypes = (filePath: string) => {
  if (process.env.NODE_ENV !== 'production') {
    return filePath.endsWith('.ts');
  }
  return filePath.endsWith('.js');
};

const noIndexFile = (filePath: string) => !/index/.test(filePath);

const noAuthFile = (filePath: string) => !/auth/.test(filePath);

const noAuthenticationDirectories = (filePath: string) => !/\/oauthProviders\//.test(filePath);

const routePaths = fileList
  .filter(filterTypes)
  .filter(noIndexFile)
  .filter(noAuthFile)
  .filter(noAuthenticationDirectories);

const initRoutes = async (app: Express) => {
  // Call all the routes
  routePaths.forEach((routePath) => {
    let route = require(routePath);

    // check if a route exports multiple things, and
    // not a single route function it will export an object
    if (typeof route !== 'function' && route.router) {
      route = route.router;
    }

    app.use(route);
  });
};

export default initRoutes;
