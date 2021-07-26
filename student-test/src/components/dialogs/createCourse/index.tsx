import React, { useRef } from 'react';
import { Formik } from 'formik';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  Grid,
  TextField,
} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import { courseSchema } from 'src/utility/validation';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: ({ name }: { name: string }) => void;
}

export const CreateCourseDialog = ({ open, onClose, onSubmit }: Props) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const formRef: any = useRef(null);

  return (
    <Dialog fullScreen={fullScreen} open={open}>
      <DialogTitle>Create New Course</DialogTitle>
      <Divider />
      <DialogContent>
        <Formik
          innerRef={formRef}
          initialValues={{
            name: '',
          }}
          onSubmit={(data: any) => onSubmit(data)}
          validateOnChange
          validationSchema={courseSchema}
        >
          {(props) => {
            const {
              values, errors, setFieldValue, touched,
            } = props;

            return (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    error={!!(touched.name && errors.name)}
                    fullWidth
                    value={values.name}
                    onChange={(e) => setFieldValue('name', e.target.value)}
                    label="Course Name"
                    helperText={touched.name && errors.name}
                  />
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
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
