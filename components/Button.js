// @flow

import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
} from 'react-native';

import Colors from '../constants/Colors';

type Props = {
  onPress: Function,
  text: string,
  type:
    | 'success'
    | 'danger'
    | 'primary'
    | 'warning'
    | 'primaryLight'
    | 'successLight'
    | 'dangerLight'
    | 'grey',
  disabled?: boolean,
};

const baseTheme = {
  button: {
    backgroundColor: 'white',
    borderRadius: 7,
    padding: 12,
    justifyContent: 'center',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    minWidth: 180,
  },
};

const success = StyleSheet.create({
  ...baseTheme,
  button: {
    ...baseTheme.button,
    backgroundColor: 'green',
  },
});

const successLight = StyleSheet.create({
  ...baseTheme,
  button: {
    ...baseTheme.button,
    backgroundColor: 'white',
    borderColor: 'green',
    borderWidth: 1,
  },
  text: {
    ...baseTheme.text,
    color: 'green',
  },
});

const danger = StyleSheet.create({
  ...baseTheme,
  button: {
    ...baseTheme.button,
    backgroundColor: Colors.errorBackground,
  },
});

const dangerLight = StyleSheet.create({
  ...baseTheme,
  button: {
    ...baseTheme.button,
    backgroundColor: 'white',
    borderColor: Colors.errorBackground,
    borderWidth: 1,
  },
  text: {
    ...baseTheme.text,
    color: Colors.errorBackground,
  },
});

const primary = StyleSheet.create({
  ...baseTheme,
  button: {
    ...baseTheme.button,
    backgroundColor: Colors.noticeBackground,
  },
});

const primaryLight = StyleSheet.create({
  ...baseTheme,
  button: {
    ...baseTheme.button,
    backgroundColor: 'white',
    borderColor: Colors.tintColor,
    borderWidth: 1,
  },
  text: {
    ...baseTheme.text,
    color: Colors.tintColor,
  },
});

const warning = StyleSheet.create({
  ...baseTheme,
  button: {
    ...baseTheme.button,
    backgroundColor: Colors.warningBackground,
  },
});

const grey = StyleSheet.create({
  ...baseTheme,
  button: {
    ...baseTheme.button,
    backgroundColor: 'lightgrey',
    borderColor: 'grey',
    borderWidth: 1,
  },
  text: {
    ...baseTheme.text,
    color: 'grey',
  },
});

const themes = {
  success,
  successLight,
  danger,
  dangerLight,
  primary,
  primaryLight,
  warning,
  grey,
};

const Button = ({
  onPress, text, type, disabled,
}: Props) => (
  <View style={[themes[type].buttonContainer]}>
    <TouchableOpacity style={[themes[type].button]} disabled={disabled} onPress={onPress}>
      <Text style={[themes[type].text]}>{text}</Text>
    </TouchableOpacity>
  </View>
);

Button.defaultProps = {
  disabled: false,
};

export default Button;
