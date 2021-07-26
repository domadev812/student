// model
import { ActionType, Action, Grade } from 'src/models';
// redux
import createReducer from 'src/store/configuration/createReducer';

export interface GradeReducerType {
  loading: boolean;
  error?: string;
  grades: Grade[];
}
export const defaultState: GradeReducerType = {
  loading: false,
  grades: [],
};

function getGradesRequestReducer(state: GradeReducerType) {
  return {
    ...state,
    loading: true,
    error: undefined,
  };
}

function getGradesSuccessReducer(state: GradeReducerType, { payload }: Action<Grade[]>) {
  return {
    ...state,
    loading: false,
    grades: payload,
  };
}

function getGradesFailureReducer(state: GradeReducerType, { payload }: Action<string>) {
  return {
    ...state,
    loading: false,
    error: payload,
  };
}

export const gradeReducer = createReducer<GradeReducerType>(defaultState, {
  [ActionType.GET_GRADES_REQUEST]: getGradesRequestReducer,
  [ActionType.GET_GRADES_SUCCESS]: getGradesSuccessReducer,
  [ActionType.GET_GRADES_FAILURE]: getGradesFailureReducer,
});
