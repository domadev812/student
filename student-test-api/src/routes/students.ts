// Dependencies
import * as express from 'express';

// Controllers
import * as studentsController from '../controllers/students.controller';

const router = express.Router();

router.post('/api/students', studentsController.createStudent);

router.get('/api/students', studentsController.getStudents);

export = router;
