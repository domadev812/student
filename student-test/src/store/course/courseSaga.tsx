import { takeLatest, fork, put } from 'redux-saga/effects';
import { createCourseApi, getCoursesApi } from 'src/apis';
import { Action, ActionType, Course } from 'src/models';
import { parseError } from 'src/utility/parseError';
import {
  createCourseFailure, createCourseSuccess, getCoursesFailure, getCoursesSuccess,
} from './courseActions';

function* getCourses() {
  try {
    const students: Course[] = yield getCoursesApi();

    yield put(getCoursesSuccess(students));
  } catch (err) {
    yield put(getCoursesFailure(parseError(err)));
  }
}

function* createCourse({ payload }: Action<string>) {
  try {
    const course: Course = yield createCourseApi(payload);
    yield put(createCourseSuccess(course));
  } catch (err) {
    yield put(createCourseFailure(parseError(err)));
  }
}

function* getCoursesWatcher() {
  yield takeLatest(ActionType.INIT_STORE as any, getCourses);
  yield takeLatest(ActionType.GET_COURSES_REQUEST as any, getCourses);
  yield takeLatest(ActionType.CREATE_COURSE_SUCCESS as any, getCourses);
}

function* createCourseWatcher() {
  yield takeLatest(ActionType.CREATE_COURSE_REQUEST as any, createCourse);
}

export default [fork(getCoursesWatcher), fork(createCourseWatcher)];
