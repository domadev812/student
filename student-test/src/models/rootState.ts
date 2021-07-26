import { CourseReducerType } from 'src/store/course/courseReducer';
import { GradeReducerType } from 'src/store/grade/gradeReducer';
import { StudentReducerType } from 'src/store/student/studentReducer';

export interface RootState {
  course: CourseReducerType;
  grade: GradeReducerType;
  student: StudentReducerType;
}
