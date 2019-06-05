// @flow
import React from 'react';
import { Text, View } from 'react-native';

import Button from './Button';

type Props = {
  question: string,
  onShowBack: () => void,
};

const CardFront = ({ question, onShowBack }: Props) => (
  <View>
    <Text>{question}</Text>
    <Button onPress={onShowBack} text="Show Answer" type="primary" />
  </View>
);

export default CardFront;
