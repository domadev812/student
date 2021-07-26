import { makeStyles, createStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => createStyles({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    padding: 10,
  },
}));
