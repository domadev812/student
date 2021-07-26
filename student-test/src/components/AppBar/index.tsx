import React from 'react';
import clsx from 'clsx';
import TopBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { useStyles } from './styles';

interface Props {
  title: string;
  open: boolean;
  onOpenSideBar: () => void;
}

export const AppBar = ({ title, open, onOpenSideBar }: Props) => {
  const styles = useStyles();
  return (
    <TopBar
      position="fixed"
      className={clsx(styles.appBar, {
        [styles.appBarShift]: open,
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={onOpenSideBar}
          edge="start"
          className={clsx(styles.menuButton, open && styles.hide)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          {title}
        </Typography>
      </Toolbar>
    </TopBar>
  );
};
