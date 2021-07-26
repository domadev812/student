import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from '@material-ui/core';

import { CreateStudentDialog } from 'src/components';
import { CreateStudent, StudentQuery } from 'src/models';
import { selectCourses } from 'src/store/course/courseSelector';
import { selectGrades } from 'src/store/grade/gradeSelector';
import {
  selectStudentError,
  selectStudentLoading,
  selectStudentQuery,
  selectStudents,
  selectStudentsTotal,
} from 'src/store/student/studentSelector';
import { createStudentRequest, getStudentsRequest } from 'src/store/student/studentActions';

import { useStyles } from './styles';

function useDebounce(value: any, delay: number) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay], // Only re-call effect if value or delay changes
  );
  return debouncedValue;
}

const Students = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const grades = useSelector(selectGrades);
  const courses = useSelector(selectCourses);
  const students = useSelector(selectStudents);
  const {
    page, perPage, searchText, courseId,
  } = useSelector(selectStudentQuery);
  const total = useSelector(selectStudentsTotal);
  const loading = useSelector(selectStudentLoading);
  const error = useSelector(selectStudentError);

  const [search, setSearch] = useState('');
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const debouncedSearchTerm = useDebounce(search, 500);

  const getStudents = useCallback((query: StudentQuery) => {
    dispatch(getStudentsRequest(query));
  }, [dispatch]);

  useEffect(() => {
    getStudents({
      page: 0,
      perPage,
      searchText: debouncedSearchTerm,
      courseId,
    });
  }, [courseId, debouncedSearchTerm, getStudents, perPage]);

  const handleChangePage = (event: unknown, newPage: number) => {
    getStudents({
      page: newPage,
      perPage,
      searchText,
      courseId,
    });
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    getStudents({
      page: 0,
      perPage: +event.target.value,
      searchText,
      courseId,
    });
  };

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleChangeCourses = (event: any) => {
    getStudents({
      page: 0,
      perPage,
      searchText,
      courseId: Number(event.target.value) > 0 ? Number(event.target.value) : undefined,
    });
  };

  const handleOpenCreateDialog = () => {
    setOpenCreateDialog(true);
  };

  const handleCloseCreateDialog = () => {
    setOpenCreateDialog(false);
  };

  const handleCreateStudent = (data: CreateStudent) => {
    setOpenCreateDialog(false);
    dispatch(createStudentRequest(data));
  };

  const coursesWithAll = [
    {
      id: -1,
      name: 'All',
    },
    ...courses,
  ];

  return (
    <Grid container alignItems="flex-end" spacing={3}>
      <Grid item xs={5}>
        <TextField value={search} onChange={handleChangeSearch} className={classes.searchField} label="Search Name" variant="standard" />
      </Grid>
      <Grid item xs={3}>
        <FormControl className={classes.searchField}>
          <InputLabel>Course</InputLabel>
          <Select value={courseId || -1} onChange={handleChangeCourses}>
            {coursesWithAll.map((item, index) => (
              <MenuItem value={item.id} key={index}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={4} container alignItems="flex-end" justifyContent="flex-end">
        <Button onClick={handleOpenCreateDialog} variant="contained" color="primary">
          New Student
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Paper>
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>GPA</TableCell>
                  <TableCell align="right" width={100}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={student.id}>
                    <TableCell>{student.firstName}</TableCell>
                    <TableCell>{student.lastName}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.gpa}</TableCell>
                    <TableCell>{}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {loading && (
            <div className={classes.wrap}>
              <CircularProgress />
            </div>
          )}
          {error && (
            <div className={classes.wrap}>
              <Typography component="h5" align="center" color="secondary">
                {error}
              </Typography>
            </div>
          )}
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={total}
            rowsPerPage={perPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Grid>
      <CreateStudentDialog
        open={openCreateDialog}
        courses={courses}
        grades={grades}
        onSubmit={handleCreateStudent}
        onClose={handleCloseCreateDialog}
      />
    </Grid>
  );
};

export default Students;
