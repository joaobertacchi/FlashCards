// @flow
import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import type { Questions, ScoreType } from '../types';

type Props = {
  questions: Questions,
  score: ScoreType,
  onRestart: () => void,
  onBackToDeck: () => void,
};

const QuizResult = ({
  questions, score, onRestart, onBackToDeck,
}: Props) => {
  const total = questions.length;
  const correct = Object.values(score).reduce((acc, isCorrect) => (isCorrect ? acc + 1 : acc), 0);
  return (
    <View>
      <Text>{`Your score is ${correct} out of ${total}`}</Text>
      <TouchableOpacity onPress={onRestart}>
        <Text>Restart Quiz</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onBackToDeck}>
        <Text>Back to Deck</Text>
      </TouchableOpacity>
    </View>
  );
};

export default QuizResult;
