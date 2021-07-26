export const parseError = (err: any) => {
  if (err.data) {
    if (typeof err.data === 'string') {
      return err.data;
    }

    if (err.data.error) {
      return err.data?.message || 'Unknown Error';
    }
  }

  if (err.message) {
    return err.message;
  }

  if (err.error) {
    return err.error;
  }

  if (typeof err === 'string') {
    return err;
  }

  return err.status;
};
