// Dependencies
import { NextFunction, Request, Response } from 'express';

// Models
import Course from '../models/Course';

// Errors
import InputError from '../errors/InputError';

/**
 * @openapi
 * /courses:
 *  post:
 *    summary: create new course
 *    tags: [Course]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - name
 *            properties:
 *              name:
 *                type: string
 *    responses:
 *      '200':
 *        description: return newly created course
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Course'
 *      '400':
 *        description: return input error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/InputError'
 */
export const createCourse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body;

    if (!name) {
      throw new InputError('Name is required', 'noName');
    }

    const course = await Course.create({ name });

    res.status(200).json(course);
  } catch (err) {
    next(err);
  }
};

/**
 * @openapi
 * /courses:
 *  get:
 *    summary: get all courses
 *    tags: [Course]
 *    responses:
 *      '200':
 *        description: return all available courses
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Course'
 */
export const getCourses = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const courses = await Course.findAll();

    res.status(200).json(courses);
  } catch (err) {
    next(err);
  }
};
