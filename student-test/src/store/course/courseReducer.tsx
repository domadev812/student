// model
import { ActionType, Action, Course } from 'src/models';
// redux
import createReducer from 'src/store/configuration/createReducer';

export interface CourseReducerType {
  loading: boolean;
  error?: string;
  courses: Course[];
}
export const defaultState: CourseReducerType = {
  loading: false,
  courses: [],
};

function createCourseRequestReducer(state: CourseReducerType) {
  return {
    ...state,
    loading: true,
    error: undefined,
  };
}

function createCourseFailerReducer(state: CourseReducerType, { payload }: Action<string>) {
  return {
    ...state,
    loading: false,
    error: payload,
  };
}

function getCoursesRequestReducer(state: CourseReducerType) {
  return {
    ...state,
    loading: true,
    error: undefined,
  };
}

function getCoursesSuccessReducer(state: CourseReducerType, { payload }: Action<Course[]>) {
  return {
    ...state,
    loading: false,
    courses: payload,
  };
}

function getCoursesFailureReducer(state: CourseReducerType, { payload }: Action<string>) {
  return {
    ...state,
    loading: false,
    error: payload,
  };
}

export const courseReducer = createReducer<CourseReducerType>(defaultState, {
  [ActionType.CREATE_COURSE_REQUEST]: createCourseRequestReducer,
  [ActionType.CREATE_COURSE_FAILURE]: createCourseFailerReducer,
  [ActionType.GET_COURSES_REQUEST]: getCoursesRequestReducer,
  [ActionType.GET_COURSES_SUCCESS]: getCoursesSuccessReducer,
  [ActionType.GET_COURSES_FAILURE]: getCoursesFailureReducer,
});
