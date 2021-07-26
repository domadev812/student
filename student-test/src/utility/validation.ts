import * as yup from 'yup';

yup.addMethod(yup.object, 'uniqueProperty', (propertyName, message) => yup.object().test('unique', message, function (value: any) {
  if (!value || !value[propertyName]) {
    return true;
  }

  if (this.parent.filter((v: any) => v !== value).some((v: any) => v[propertyName] === value[propertyName])) {
    throw this.createError({
      path: `${this.path}.${propertyName}`,
    });
  }

  return true;
}));

export const studentSchema = yup.object().shape({
  courseGrades: yup.array().of(
    yup
      .object()
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .uniqueProperty('courseId', 'unique')
      .shape({
        courseId: yup.number().required('Course is required'),
        gradeId: yup.number().required('Grade is required'),
      }),
  ),
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  email: yup.string().email('Email is invalid').required('Email is required'),
});

export const courseSchema = yup.object().shape({
  name: yup.string().required('Course Name is required'),
});
