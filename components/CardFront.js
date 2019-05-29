// @flow
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

type Props = {
  question: string,
  onShowBack: () => void,
};

const CardFront = ({ question, onShowBack }: Props) => (
  <View>
    <Text>{question}</Text>
    <TouchableOpacity onPress={onShowBack}>
      <Text>Show answer</Text>
    </TouchableOpacity>
  </View>
);

export default CardFront;
