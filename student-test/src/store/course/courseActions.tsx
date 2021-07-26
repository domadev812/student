// model
import { ActionType, Course } from 'src/models';

export const getCoursesRequest = () => ({
  type: ActionType.GET_COURSES_REQUEST,
});

export const getCoursesSuccess = (payload: Course[]) => ({
  type: ActionType.GET_COURSES_SUCCESS,
  payload,
});

export const getCoursesFailure = (payload: string) => ({
  type: ActionType.GET_COURSES_FAILURE,
  payload,
});

export const createCourseRequest = (payload: string) => ({
  type: ActionType.CREATE_COURSE_REQUEST,
  payload,
});

export const createCourseSuccess = (payload: Course) => ({
  type: ActionType.CREATE_COURSE_SUCCESS,
  payload,
});

export const createCourseFailure = (payload: string) => ({
  type: ActionType.CREATE_COURSE_FAILURE,
  payload,
});
