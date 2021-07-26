import { combineReducers } from 'redux';

import { courseReducer } from 'src/store/course/courseReducer';
import { gradeReducer } from 'src/store/grade/gradeReducer';
import { studentReducer } from 'src/store/student/studentReducer';

export default () => combineReducers({
  course: courseReducer,
  grade: gradeReducer,
  student: studentReducer,
});
