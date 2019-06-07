// @flow

import React from 'react';
import { Icon } from 'expo';

import Colors from '../constants/Colors';

type Props = {
  focused: boolean,
  name: string,
  type?: string,
};

const TabBarIcon = (props: Props) => {
  const { focused, name, type = 'Ionicons' } = props;
  const iconSet = {
    AntDesign: Icon.AntDesign,
    Entypo: Icon.Entypo,
    EvilIcons: Icon.EvilIcons,
    Feather: Icon.Feather,
    FontAwesome: Icon.FontAwesome,
    Foundation: Icon.Foundation,
    Ionicons: Icon.Ionicons,
    MaterialIcons: Icon.MaterialIcons,
    MaterialCommunityIcons: Icon.MaterialCommunityIcons,
    SimpleLineIcons: Icon.SimpleLineIcons,
    Octicons: Icon.Octicons,
    Zocial: Icon.Zocial,
  };
  const MyIcon = iconSet[type];
  return (
    <MyIcon
      name={name}
      size={26}
      style={{ marginBottom: -3 }}
      color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
};

TabBarIcon.defaultProps = {
  type: 'Ionicons',
};

export default TabBarIcon;
