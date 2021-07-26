import { RootState, Student, StudentQuery } from 'src/models';
import { StudentReducerType } from './studentReducer';

const selectStudentState = (state: RootState): StudentReducerType => state.student;

export const selectStudents = (state: RootState): Student[] => selectStudentState(state).students;

export const selectStudentLoading = (state: RootState): boolean => selectStudentState(state).loading;

export const selectStudentError = (state: RootState): string | undefined => selectStudentState(state).error;

export const selectStudentQuery = (state: RootState): StudentQuery => {
  const data = selectStudentState(state);

  return {
    page: data.page,
    perPage: data.perPage,
    searchText: data.searchText,
    courseId: data.courseId,
  };
};

export const selectStudentsTotal = (state: RootState): number => selectStudentState(state).total;
