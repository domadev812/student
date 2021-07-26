import { People, MenuBook } from '@material-ui/icons';

import { RouteConfig } from 'src/models';

import Students from 'src/pages/students';
import Courses from 'src/pages/courses';

export const routeConfig: RouteConfig[] = [
  {
    path: '/students',
    name: 'Students',
    Icon: People,
    Component: Students,
  },
  {
    path: '/courses',
    name: 'Courses',
    Icon: MenuBook,
    Component: Courses,
  },
];
