// @flow
import React from 'react';

import Button from './Button';

type Props = {
  index: number,
  total: number,
  onShowNextQuestion: () => void,
  onShowQuizResult: () => void,
  disabled: boolean,
};

const QuizNextButton = ({
  index,
  total,
  onShowNextQuestion,
  onShowQuizResult,
  disabled,
}: Props) => (
  index + 1 < total
    ? (
      <Button
        onPress={onShowNextQuestion}
        text="Next question"
        type={!disabled ? 'primary' : 'grey'}
        disabled={disabled}
      />
    )
    : (
      <Button
        onPress={onShowQuizResult}
        text="Quiz result"
        type={!disabled ? 'success' : 'grey'}
        disabled={disabled}
      />
    )
);

export default QuizNextButton;
