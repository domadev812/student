import {
  takeLatest, fork, put, select,
} from 'redux-saga/effects';
import { createStudentApi, getStudentsApi } from 'src/apis';
import {
  Action,
  ActionType,
  CreateStudent,
  PaginatedList,
  RootState,
  Student,
  StudentQuery,
} from 'src/models';
import { parseError } from 'src/utility/parseError';
import {
  createStudentFailure,
  createStudentSuccess,
  getStudentsFailure,
  getStudentsSuccess,
} from './studentActions';
import { selectStudentQuery } from './studentSelector';

function* getStudents({ payload }: Action<StudentQuery>) {
  try {
    let query = payload;

    if (!query) {
      const state: RootState = yield select();
      query = selectStudentQuery(state);
    }

    const students: PaginatedList<Student> = yield getStudentsApi(query.searchText, query.courseId, query.perPage, query.page);

    yield put(getStudentsSuccess(students));
  } catch (err) {
    yield put(getStudentsFailure(parseError(err)));
  }
}

function* createStudent({ payload }: Action<CreateStudent>) {
  try {
    const student: Student = yield createStudentApi(payload);

    yield put(createStudentSuccess(student));
  } catch (err) {
    yield put(createStudentFailure(parseError(err)));
  }
}

function* getStudentsWatcher() {
  yield takeLatest(ActionType.GET_STUDENTS_REQUEST as any, getStudents);
  yield takeLatest(ActionType.CREATE_STUDENT_SUCCESS as any, getStudents);
}

function* createStudentWatcher() {
  yield takeLatest(ActionType.CREATE_STUDENT_REQUEST as any, createStudent);
}

export default [fork(getStudentsWatcher), fork(createStudentWatcher)];
