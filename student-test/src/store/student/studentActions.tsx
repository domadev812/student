// model
import {
  ActionType, CreateStudent, PaginatedList, Student, StudentQuery,
} from 'src/models';

export const getStudentsRequest = (payload: StudentQuery) => ({
  type: ActionType.GET_STUDENTS_REQUEST,
  payload,
});

export const getStudentsSuccess = (payload: PaginatedList<Student>) => ({
  type: ActionType.GET_STUDENTS_SUCCESS,
  payload,
});

export const getStudentsFailure = (payload: string) => ({
  type: ActionType.GET_STUDENTS_FAILURE,
  payload,
});

export const createStudentRequest = (payload: CreateStudent) => ({
  type: ActionType.CREATE_STUDENT_REQUEST,
  payload,
});

export const createStudentSuccess = (payload: Student) => ({
  type: ActionType.CREATE_STUDENT_SUCCESS,
  payload,
});

export const createStudentFailure = (payload: string) => ({
  type: ActionType.CREATE_STUDENT_FAILURE,
  payload,
});
