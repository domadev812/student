import { CourseActionType } from './coursesTypes';
import { GradeActionType } from './gradeTypes';
import { StudentActionType } from './studentTypes';

export interface Action<T> {
  type: IActionType;
  payload: T;
}

enum BasicType {
  INIT_STORE = 'ON_INIT',
}

export type IActionType = BasicType | StudentActionType | CourseActionType | GradeActionType;

export const ActionType = {
  ...BasicType,
  ...StudentActionType,
  ...CourseActionType,
  ...GradeActionType,
};
