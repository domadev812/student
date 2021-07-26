export interface CreateStudent {
  firstName: string;
  lastName: string;
  email: string;
  courseGrades: {
    courseId: number;
    gradeId: number;
  }[];
}

export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gpa: number;
}

export interface StudentQuery {
  page: number;
  perPage: number;
  searchText?: string;
  courseId?: number;
}

export enum StudentActionType {
  CREATE_STUDENT_REQUEST = 'STUDENT/CREATE_STUDENT_REQUEST',
  CREATE_STUDENT_SUCCESS = 'STUDENT/CREATE_STUDENT_SUCCESS',
  CREATE_STUDENT_FAILURE = 'STUDENT/CREATE_STUDENT_FAILURE',
  GET_STUDENTS_REQUEST = 'STUDENT/GET_STUDENTS_REQUEST',
  GET_STUDENTS_SUCCESS = 'STUDENT/GET_STUDENTS_SUCCESS',
  GET_STUDENTS_FAILURE = 'STUDENT/GET_STUDENTS_FAILURE',
}
