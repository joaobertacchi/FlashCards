// @flow
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

type Props = {
  answer: string,
  isCorrect?: boolean,
  onShowFront: () => void,
  onVote: (correct: boolean) => () => void,
};

const CardBack = ({
  answer,
  isCorrect,
  onShowFront,
  onVote,
}: Props) => (
  <View>
    <Text>{answer}</Text>
    <TouchableOpacity onPress={onShowFront}>
      <Text>Show question</Text>
    </TouchableOpacity>
    {isCorrect !== undefined && (
      <Text>{`You marked your answer as ${isCorrect ? 'correct' : 'incorrect'}`}</Text>
    )}
    <TouchableOpacity onPress={onVote(true)}>
      <Text>Correct</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={onVote(false)}>
      <Text>Incorrect</Text>
    </TouchableOpacity>
  </View>
);

export default CardBack;
