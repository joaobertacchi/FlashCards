// @flow

import React from 'react';
import { Text } from 'react-native';

type Props = {
  style: Object,
};

export const MonoText = (props: Props) => {
  const { style } = props;
  return (<Text {...props} style={[style, { fontFamily: 'space-mono' }]} />);
};

export default { MonoText };
