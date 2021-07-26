import { Course, RootState } from 'src/models';
import { CourseReducerType } from './courseReducer';

const selectCourseState = (state: RootState): CourseReducerType => state.course;

export const selectCourses = (state: RootState): Course[] => selectCourseState(state).courses;

export const selectCourseLoading = (state: RootState): boolean => selectCourseState(state).loading;

export const selectCourseError = (state: RootState): string | undefined => selectCourseState(state).error;
