import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';
import QuizNextButton from '../QuizNextButton';

describe('QuizNextButton snapshot', () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it('renders correctly Next Question button', () => {
    const tree = renderer.create(<QuizNextButton index={0} total={2} disabled={false} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly Quiz Result button', () => {
    const tree = renderer.create(<QuizNextButton index={1} total={2} disabled={false} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly Next Question button', () => {
    const tree = renderer.create(<QuizNextButton index={0} total={2} disabled />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly Quiz Result button', () => {
    const tree = renderer.create(<QuizNextButton index={1} total={2} disabled />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
