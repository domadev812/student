import { takeLatest, fork, put } from 'redux-saga/effects';
import { getGradeApi } from 'src/apis';
import { ActionType, Grade } from 'src/models';
import { parseError } from 'src/utility/parseError';
import { getGradesFailure, getGradesSuccess } from './gradeActions';

function* getGrades() {
  try {
    const grades: Grade[] = yield getGradeApi();

    yield put(getGradesSuccess(grades));
  } catch (err) {
    yield put(getGradesFailure(parseError(err)));
  }
}

function* getStudentsWatcher() {
  yield takeLatest(ActionType.INIT_STORE as any, getGrades);
  yield takeLatest(ActionType.GET_GRADES_REQUEST as any, getGrades);
}

export default [fork(getStudentsWatcher)];
