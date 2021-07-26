// model
import { ActionType, Grade } from 'src/models';

export const getGradesRequest = () => ({
  type: ActionType.GET_GRADES_REQUEST,
});

export const getGradesSuccess = (payload: Grade[]) => ({
  type: ActionType.GET_GRADES_SUCCESS,
  payload,
});

export const getGradesFailure = (payload: string) => ({
  type: ActionType.GET_GRADES_FAILURE,
  payload,
});
