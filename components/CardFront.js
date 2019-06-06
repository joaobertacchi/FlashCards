// @flow
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import Button from './Button';

type Props = {
  question: string,
  onShowBack: () => void,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
  },
  question: {
    fontSize: 28,
    textAlign: 'center',
  },
});

const CardFront = ({ question, onShowBack }: Props) => (
  <View style={styles.container}>
    <Text style={styles.question}>{question}</Text>
    <Button onPress={onShowBack} text="Show Answer" type="primary" />
  </View>
);

export default CardFront;
