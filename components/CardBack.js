// @flow
import React from 'react';
import { View, Text } from 'react-native';

import Button from './Button';
import QuizNextButton from './QuizNextButton';

type Props = {
  answer: string,
  isCorrect?: boolean,
  onShowFront: () => void,
  onVote: (correct: boolean) => () => void,
  onShowNextQuestion: () => void,
  onShowQuizResult: () => void,
  cardNumber: number,
  cardCount: number,
};

const CardBack = ({
  answer,
  isCorrect,
  onShowFront,
  onVote,
  onShowNextQuestion,
  onShowQuizResult,
  cardNumber,
  cardCount,
}: Props) => (
  <View>
    <Text>{answer}</Text>
    <Button onPress={onShowFront} text="Show question" type="primaryLight" />
    <Button onPress={onVote(true)} text="Correct" type={isCorrect ? 'successLight' : 'success'} />
    <Button
      onPress={onVote(false)}
      text="Incorrect"
      type={isCorrect === false ? 'dangerLight' : 'danger'}
    />

    <QuizNextButton
      index={cardNumber}
      total={cardCount}
      onShowNextQuestion={onShowNextQuestion}
      onShowQuizResult={onShowQuizResult}
      disabled={isCorrect === undefined}
    />
  </View>
);

export default CardBack;
