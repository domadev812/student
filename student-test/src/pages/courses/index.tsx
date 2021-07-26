import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  CircularProgress,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';

import { selectCourseError, selectCourseLoading, selectCourses } from 'src/store/course/courseSelector';
import { CreateCourseDialog } from 'src/components';
import { createCourseRequest } from 'src/store/course/courseActions';

import { useStyles } from './styles';

const Courses = () => {
  const classes = useStyles();
  const disptach = useDispatch();
  const courses = useSelector(selectCourses);
  const loading = useSelector(selectCourseLoading);
  const error = useSelector(selectCourseError);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  const handleOpenCreateDialog = () => {
    setOpenCreateDialog(true);
  };

  const handleCloseCreateDialog = () => {
    setOpenCreateDialog(false);
  };

  const handleCreateCourse = ({ name }: { name: string }) => {
    setOpenCreateDialog(false);
    disptach(createCourseRequest(name));
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} container alignItems="flex-end" justifyContent="flex-end">
        <Button onClick={handleOpenCreateDialog} variant="contained" color="primary">
          New Course
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Paper>
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {courses.map((course) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={course.id}>
                    <TableCell>{course.name}</TableCell>
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
        </Paper>
      </Grid>
      <CreateCourseDialog open={openCreateDialog} onSubmit={handleCreateCourse} onClose={handleCloseCreateDialog} />
    </Grid>
  );
};

export default Courses;
