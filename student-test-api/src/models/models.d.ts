import Course from './Course';
import Grade from './Grade';
import Student from './Student';
import StudentCourseGrade from './StudentCourseGrade';

interface IDbModels {
  Course: typeof Course;
  Grade: typeof Grade;
  Student: typeof Student;
  StudentCourseGrade: typeof StudentCourseGrade;
}

export default IDbModels;
