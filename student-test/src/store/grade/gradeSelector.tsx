import { Grade, RootState } from 'src/models';
import { GradeReducerType } from './gradeReducer';

const selectStudentState = (state: RootState): GradeReducerType => state.grade;

export const selectGrades = (state: RootState): Grade[] => selectStudentState(state).grades;
