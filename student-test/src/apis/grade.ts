import axios from './AxiosService';

export const getGradeApi = async () => axios.get('/grades');
