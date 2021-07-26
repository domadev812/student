// Dependencies
import { NextFunction, Request, Response } from 'express';

// Errors
import InputError from '../errors/InputError';

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars
  next: NextFunction,
) => {
  if (err instanceof InputError) {
    // custom application error
    return res.status(400).json({ code: err.code, message: err.message });
  }

  // default to 500 server error
  return res.status(500).json({ message: err.message });
};

export default errorHandler;
