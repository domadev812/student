// Dependencies
import { NextFunction, Request, Response } from 'express';
import { Op, WhereOptions } from 'sequelize';

// Models
import Course from '../models/Course';
import Grade from '../models/Grade';
import Student from '../models/Student';
import StudentCourseGrade from '../models/StudentCourseGrade';

// Errors
import InputError from '../errors/InputError';

/**
 * @openapi
 * /students:
 *  post:
 *    summary: create new student
 *    tags: [Student]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - email
 *            properties:
 *              firstName:
 *                type: string
 *              lastName:
 *                type: string
 *              email:
 *                type: string
 *              courseGrades:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    courseId:
 *                      type: integer
 *                    gradeId:
 *                      type: integer
 *    responses:
 *      '200':
 *        description: return newly created student
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Student'
 *      '400':
 *        description: return input error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/InputError'
 */
export const createStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;

    if (!data.email) {
      throw new InputError('Email is required', 'noEmail');
    }

    if (!data.courseGrades?.length) {
      throw new InputError('Course and Grade are required', 'noCourseGrade');
    }

    const student = Student.build(
      {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        studentCourseGrades: data.courseGrades,
      },
      {
        include: [StudentCourseGrade],
      },
    );

    await student.save();

    res.status(200).json(student);
  } catch (err) {
    next(err);
  }
};

/**
 * @openapi
 * /students:
 *  get:
 *    summary: get paginated search results for students
 *    tags: [Student]
 *    parameters:
 *      - name: search
 *        in: query
 *        description: search key for either of firstName, lastName, email
 *        schema:
 *          type: string
 *      - name: email
 *        in: query
 *        description: search by email
 *        schema:
 *          type: string
 *      - name: courseId
 *        in: query
 *        description: search by courseId
 *        schema:
 *          type: integer
 *      - $ref: '#/components/parameters/PageOffset'
 *      - $ref: '#/components/parameters/PageLimit'
 *    responses:
 *      '200':
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                count:
 *                  type: integer
 *                rows:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Student'
 */
export const getStudents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const search = req.query.search as string;
    const email = req.query.email as string;
    const courseId = req.query.courseId as string;
    const offset = Number(req.query.offset) || 0;
    const limit = Number(req.query.limit) || 25;

    const studentCriteria: any = {};

    const studentCourseGradeCriteria: WhereOptions<StudentCourseGrade> = {};

    if (search) {
      studentCriteria[Op.or] = [
        { firstName: { [Op.like]: `%${search}%` } },
        { lastName: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
      ];
    }

    if (email) {
      studentCriteria.email = email;
    }

    if (courseId) {
      studentCourseGradeCriteria.courseId = courseId;
    }

    const result = await Student.findAndCountAll({
      where: studentCriteria,
      include: [
        {
          model: StudentCourseGrade,
          where: studentCourseGradeCriteria,
          include: [
            {
              model: Grade,
            },
            {
              model: Course,
            },
          ],
        },
      ],
      distinct: true,
      offset,
      limit,
    });

    const records = result.rows.map((student) => student.toJSON());

    res.status(200).json({
      count: result.count,
      rows: records,
    });
  } catch (err) {
    next(err);
  }
};
