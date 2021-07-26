import axios from './AxiosService';

export const getCoursesApi = async () => axios.get('/courses');

export const createCourseApi = async (name: string) => axios.post('/courses', { name });
