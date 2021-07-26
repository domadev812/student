// Dependencies
import { NextFunction, Request, Response } from 'express';

// Models
import Grade from '../models/Grade';

/**
 * @openapi
 * /grades:
 *  get:
 *    summary: get all grades
 *    tags: [Grade]
 *    responses:
 *      '200':
 *        description: return all available grades
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Grade'
 */
// eslint-disable-next-line import/prefer-default-export
export const getGrades = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const grades = await Grade.findAll();

    res.status(200).json(grades);
  } catch (err) {
    next(err);
  }
};
