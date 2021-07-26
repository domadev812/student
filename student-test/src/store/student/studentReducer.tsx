// model
import {
  ActionType, Action, Student, StudentQuery, PaginatedList,
} from 'src/models';
// redux
import createReducer from 'src/store/configuration/createReducer';

export interface StudentReducerType {
  loading: boolean;
  error?: string;
  students: Student[];

  total: number;
  perPage: number;
  page: number;
  searchText?: string;
  courseId?: number;
}
export const defaultState: StudentReducerType = {
  loading: false,
  students: [],

  total: 0,
  perPage: 10,
  page: 0,
};

function createStudentRequestReducer(state: StudentReducerType) {
  return {
    ...state,
    loading: true,
    error: undefined,
  };
}

function createStudentFailureReducer(state: StudentReducerType, { payload }: Action<string>) {
  return {
    ...state,
    loading: false,
    error: payload,
  };
}

function getStudentsRequestReducer(state: StudentReducerType, { payload }: Action<StudentQuery>) {
  return {
    ...state,
    students: [],
    loading: true,
    error: undefined,
    ...payload,
  };
}

function getStudentsSuccessReducer(state: StudentReducerType, { payload }: Action<PaginatedList<Student>>) {
  return {
    ...state,
    loading: false,
    students: payload.rows,
    total: payload.count,
  };
}

function getStudentsFailureReducer(state: StudentReducerType, { payload }: Action<string>) {
  return {
    ...state,
    loading: false,
    error: payload,
  };
}

export const studentReducer = createReducer<StudentReducerType>(defaultState, {
  [ActionType.CREATE_STUDENT_REQUEST]: createStudentRequestReducer,
  [ActionType.CREATE_STUDENT_FAILURE]: createStudentFailureReducer,
  [ActionType.GET_STUDENTS_REQUEST]: getStudentsRequestReducer,
  [ActionType.GET_STUDENTS_SUCCESS]: getStudentsSuccessReducer,
  [ActionType.GET_STUDENTS_FAILURE]: getStudentsFailureReducer,
});
