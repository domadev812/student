import { all, put } from 'redux-saga/effects';
import { ActionType } from 'src/models';

// redux
import course from 'src/store/course/courseSaga';
import grade from 'src/store/grade/gradeSaga';
import student from 'src/store/student/studentSaga';

export default function* start() {
  yield all([...course, ...grade, ...student]);
  yield put({
    type: ActionType.INIT_STORE, // custom onInit action
  });
}
