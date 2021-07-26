import { CreateStudent } from 'src/models';
import axios from './AxiosService';

export const getStudentsApi = async (
  search?: string,
  courseId?: number,
  limit = 10,
  offset = 0,
) => axios.get('/students', {
  search,
  courseId,
  limit,
  offset,
});

export const createStudentApi = async (data: CreateStudent) => axios.post('/students', data);
