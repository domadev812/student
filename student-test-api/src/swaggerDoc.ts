// Dependencies
import * as swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import basicAuth from 'express-basic-auth';
import { Express } from 'express';

import pkg from '../package.json';

require('dotenv').config();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Student Test API',
      version: pkg.version,
      description: 'Express API with Swagger',
    },
    servers: [
      {
        url: 'http://localhost:8080/api',
        description: 'Local Server',
      },
    ],
    components: {
      schemas: {
        Course: {
          type: 'object',
          required: ['name'],
          properties: {
            id: {
              type: 'integer',
              format: 'int64',
            },
            name: {
              type: 'string',
            },
            createdAt: {
              type: 'string',
              format: 'datetime',
            },
            updatedAt: {
              type: 'string',
              format: 'datetime',
            },
          },
        },
        Grade: {
          type: 'object',
          required: ['score', 'letter'],
          properties: {
            id: {
              type: 'integer',
              format: 'int64',
            },
            score: {
              type: 'integer',
              format: 'int64',
            },
            letter: {
              type: 'string',
            },
            createdAt: {
              type: 'string',
              format: 'datetime',
            },
            updatedAt: {
              type: 'string',
              format: 'datetime',
            },
          },
        },
        Student: {
          type: 'object',
          required: ['firstName', 'lastName', 'email'],
          properties: {
            id: {
              type: 'integer',
              format: 'int64',
            },
            firstName: {
              type: 'string',
            },
            lastName: {
              type: 'string',
            },
            email: {
              type: 'string',
            },
            gpa: {
              type: 'integer',
              format: 'int64',
            },
            createdAt: {
              type: 'string',
              format: 'datetime',
            },
            updatedAt: {
              type: 'string',
              format: 'datetime',
            },
          },
        },
        StudentCourseGrade: {
          type: 'object',
          required: ['studentId', 'courseId', 'gradeId'],
          properties: {
            studentId: {
              type: 'integer',
              format: 'int64',
            },
            courseId: {
              type: 'integer',
              format: 'int64',
            },
            gradeId: {
              type: 'integer',
              format: 'int64',
            },
            createdAt: {
              type: 'string',
              format: 'datetime',
            },
            updatedAt: {
              type: 'string',
              format: 'datetime',
            },
          },
        },
        InputError: {
          type: 'object',
          required: ['code', 'message'],
          properties: {
            code: {
              type: 'string',
            },
            message: {
              type: 'string',
            },
          },
        },
      },
      parameters: {
        PageOffset: {
          name: 'offset',
          in: 'query',
          description: 'specifies the page number',
          schema: {
            type: 'integer',
            format: 'int64',
            default: 0,
          },
        },
        PageLimit: {
          name: 'limit',
          in: 'query',
          description: 'limits the number of items on a page',
          schema: {
            type: 'integer',
            format: 'int64',
            default: 25,
          },
        },
      },
    },
  },
  apis: ['./src/controllers/*.ts'],
};

const specs = swaggerJsDoc(options);

const initSwagger = (app: Express) => {
  app.use('/api-docs', basicAuth({
    users: {
      [process.env.BASIC_AUTH_USER]: process.env.BASIC_AUTH_PASSWORD,
    },
    challenge: true,
  }), swaggerUi.serve, swaggerUi.setup(specs));
};

export default initSwagger;
