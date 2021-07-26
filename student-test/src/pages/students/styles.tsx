import { makeStyles, createStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => createStyles({
  container: {
    padding: 10,
  },
  searchField: {
    width: '100%',
  },
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    padding: 10,
  },
}));
