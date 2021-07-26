export interface Grade {
  id: number;
  score: number;
  letter: string;
}

export enum GradeActionType {
  GET_GRADES_REQUEST = 'STUDENT/GET_GRADES_REQUEST',
  GET_GRADES_SUCCESS = 'STUDENT/GET_GRADES_SUCCESS',
  GET_GRADES_FAILURE = 'STUDENT/GET_GRADES_FAILURE',
}
