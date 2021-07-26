import React, { useRef } from 'react';
import { Formik } from 'formik';
import { Autocomplete } from '@material-ui/lab';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  Grid,
  TextField,
  FormControl,
  FormHelperText,
  Select,
  MenuItem,
  InputLabel,
  IconButton,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import { studentSchema } from 'src/utility/validation';
import { Course, CreateStudent, Grade } from 'src/models';

interface Props {
  open: boolean;
  courses: Course[];
  grades: Grade[];
  onClose: () => void;
  onSubmit: (data: CreateStudent) => void;
}

export const CreateStudentDialog = ({
  open, courses, grades, onClose, onSubmit,
}: Props) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const formRef: any = useRef(null);

  const handleAddCourse = () => {
    const values = formRef.current?.values || [];
    const { courseGrades = [] } = values;

    formRef.current?.setFieldValue(
      'courseGrades',
      [...courseGrades, { courseId: undefined, gradeId: undefined }],
    );
  };

  const handleDeleteCourse = (index: number) => {
    const values = formRef.current?.values || [];
    const { courseGrades = [] } = values;

    courseGrades.splice(index, 1);
    formRef.current?.setFieldValue('courseGrades', [...courseGrades]);
  };

  return (
    <Dialog fullScreen={fullScreen} open={open}>
      <DialogTitle>Create New Student</DialogTitle>
      <Divider />
      <DialogContent>
        <Formik
          innerRef={formRef}
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            courseGrades: [
              {
                courseId: undefined,
                gradeId: undefined,
              },
            ],
          }}
          onSubmit={(data: any) => onSubmit(data)}
          validateOnChange
          validationSchema={studentSchema}
        >
          {(props) => {
            const {
              values, errors, setFieldValue, touched,
            } = props;

            return (
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    error={!!(touched.firstName && errors.firstName)}
                    fullWidth
                    value={values.firstName}
                    onChange={(e) => setFieldValue('firstName', e.target.value)}
                    label="First Name"
                    helperText={touched.firstName && errors.firstName}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    error={!!(touched.lastName && errors.lastName)}
                    fullWidth
                    value={values.lastName}
                    onChange={(e) => setFieldValue('lastName', e.target.value)}
                    label="Last Name"
                    helperText={touched.lastName && errors.lastName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={!!(touched.email && errors.email)}
                    fullWidth
                    value={values.email}
                    onChange={(e) => setFieldValue('email', e.target.value)}
                    label="Email"
                    helperText={touched.email && errors.email}
                  />
                </Grid>
                {values.courseGrades.map((item, index) => {
                  const error: any = errors.courseGrades && errors.courseGrades[index];
                  let courseError = error?.courseId;
                  const gradeError = error?.gradeId;

                  if (courseError === 'unique') {
                    courseError = 'Course is duplicated';
                  }
                  return (
                    // eslint-disable-next-line react/no-array-index-key
                    <React.Fragment key={index}>
                      <Grid item xs={6}>
                        <Autocomplete
                          options={courses}
                          getOptionLabel={(option: Course) => option.name}
                          value={item.courseId}
                          onChange={(e, option) => {
                            const newValue: any[] = [...values.courseGrades];
                            newValue[index].courseId = option?.id;
                            setFieldValue('courseGrades', newValue);
                          }}
                          renderInput={(params: any) => (
                            <TextField
                              {...params}
                              label="Course"
                              error={!!(touched.courseGrades && touched.courseGrades[index]?.courseId && courseError)}
                              helperText={touched.courseGrades && touched.courseGrades[index]?.courseId && courseError}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={6} direction="row" alignItems="center">
                        <Grid container spacing={1} alignItems="flex-end">
                          <Grid item xs={index > 0 ? 10 : 12}>
                            <FormControl error={!!(touched.courseGrades && touched.courseGrades[index]?.gradeId && gradeError)} fullWidth>
                              <InputLabel>Grade</InputLabel>
                              <Select
                                value={item.gradeId}
                                onChange={(e) => {
                                  const newValue: any[] = [...values.courseGrades];
                                  newValue[index].gradeId = e.target.value;
                                  setFieldValue('courseGrades', newValue);
                                }}
                              >
                                {grades.map((grade, gIndex) => (
                                  <MenuItem value={grade.id} key={gIndex}>
                                    {grade.letter}
                                  </MenuItem>
                                ))}
                              </Select>
                              {touched.courseGrades && touched.courseGrades[index]?.gradeId && gradeError && (
                                <FormHelperText>{gradeError}</FormHelperText>
                              )}
                            </FormControl>
                          </Grid>
                          {index > 0 && (
                            <Grid item>
                              <IconButton color="secondary" size="small" onClick={() => handleDeleteCourse(index)}>
                                <DeleteIcon />
                              </IconButton>
                            </Grid>
                          )}
                        </Grid>
                      </Grid>
                    </React.Fragment>
                  );
                })}
                <Grid item xs={12}>
                  <IconButton onClick={handleAddCourse} color="primary">
                    <AddIcon />
                  </IconButton>
                </Grid>
              </Grid>
            );
          }}
        </Formik>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button autoFocus onClick={() => formRef.current?.handleSubmit()} color="primary">
          Create
        </Button>
        <Button onClick={onClose} color="secondary" autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
