// Dependencies
import * as express from 'express';

// Controllers
import * as coursesController from '../controllers/courses.controller';

const router = express.Router();

router.post('/api/courses', coursesController.createCourse);

router.get('/api/courses', coursesController.getCourses);

export = router;
