import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { useStyles } from './styles';
import { RouteConfig } from '../../models';

interface Props {
  open: boolean;
  // eslint-disable-next-line react/no-unused-prop-types
  path: string;
  routes: RouteConfig[];
  onClick: (path: string) => void;
  onCloseSideBar: () => void;
}

export const SideBar = ({
  open, onCloseSideBar, routes, onClick,
}: Props) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={onCloseSideBar}>{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}</IconButton>
      </div>
      <Divider />
      <List>
        {routes.map((route) => (
          <ListItem button key={route.path} onClick={() => onClick(route.path)}>
            <ListItemIcon>
              <route.Icon />
            </ListItemIcon>
            <ListItemText primary={route.name} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};
