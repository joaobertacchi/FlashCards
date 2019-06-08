import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';
import QuizResult from '../QuizResult';

describe('CardBack snapshot', () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it('renders correctly', () => {
    const questions = [
      {
        question: 'A',
        answer: 'B',
      },
    ];
    const score = {
      0: true,
    };
    const tree = renderer.create(<QuizResult questions={questions} score={score} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly', () => {
    const questions = [
      {
        question: 'A',
        answer: 'B',
      },
    ];
    const score = {
      0: false,
    };
    const tree = renderer.create(<QuizResult questions={questions} score={score} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly', () => {
    const questions = [
      {
        question: 'A',
        answer: 'B',
      },
    ];
    const score = {
      0: undefined,
    };
    const tree = renderer.create(<QuizResult questions={questions} score={score} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
