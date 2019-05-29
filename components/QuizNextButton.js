// @flow
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

type Props = {
  index: number,
  total: number,
  onShowNextQuestion: () => void,
  onShowQuizResult: () => void,
};

const QuizNextButton = ({
  index,
  total,
  onShowNextQuestion,
  onShowQuizResult,
}: Props) => (
  index + 1 < total
    ? (
      <TouchableOpacity onPress={onShowNextQuestion}>
        <Text>Next question</Text>
      </TouchableOpacity>
    )
    : (
      <TouchableOpacity onPress={onShowQuizResult}>
        <Text>Quiz result</Text>
      </TouchableOpacity>
    )
);

export default QuizNextButton;
