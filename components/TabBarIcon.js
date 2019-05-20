// @flow

import React from 'react';
import { Icon } from 'expo';

import Colors from '../constants/Colors';

type Props = {
  focused: boolean,
  name: string,
};

const TabBarIcon = (props: Props) => {
  const { focused, name } = props;
  return (
    <Icon.Ionicons
      name={name}
      size={26}
      style={{ marginBottom: -3 }}
      color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
};

export default TabBarIcon;
