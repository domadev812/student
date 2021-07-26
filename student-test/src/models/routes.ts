import { SvgIconTypeMap } from '@material-ui/core';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import React from 'react';

export interface RouteConfig {
  path: string;
  name: string;
  Icon: OverridableComponent<SvgIconTypeMap>;
  Component: React.ComponentType<any>;
}
