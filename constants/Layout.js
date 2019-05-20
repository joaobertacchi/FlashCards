// @flow

import { Dimensions } from 'react-native';

const { height, width }: { height: number, width: number} = Dimensions.get('window');

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
};
