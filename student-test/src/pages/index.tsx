import React from 'react';
import clsx from 'clsx';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  Switch, Route, useLocation, useHistory, Redirect,
} from 'react-router-dom';

import { AppBar, SideBar } from 'src/components';
import { routeConfig } from 'src/routes';
import { Paper } from '@material-ui/core';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    display: 'flex',
    height: '100vh',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  mainWrap: {
    height: 'calc(100% - 64px)',
    padding: 20,
  },
}));

const Main = () => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handelChangeRoute = (path: string) => {
    history.push(path);
  };

  const title = routeConfig.find((route) => route.path === location.pathname)?.name || '';

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar title={title} open={open} onOpenSideBar={handleDrawerOpen} />
      <SideBar open={open} path={location.pathname} routes={routeConfig} onClick={handelChangeRoute} onCloseSideBar={handleDrawerClose} />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <Paper className={classes.mainWrap}>
          <Switch>
            {routeConfig.map(({ path, Component }, index) => (
              <Route exact path={path} component={Component} key={index} />
            ))}
            <Redirect to={routeConfig[0].path} />
          </Switch>
        </Paper>
      </main>
    </div>
  );
};

export default Main;
