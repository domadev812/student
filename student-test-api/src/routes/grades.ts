// Dependencies
import * as express from 'express';

// Controllers
import * as gradesController from '../controllers/grades.controller';

const router = express.Router();

router.get('/api/grades', gradesController.getGrades);

export = router;
