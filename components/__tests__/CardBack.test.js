import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';
import CardBack from '../CardBack';

describe('CardBack snapshot', () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(<CardBack answer="answer" cardNumber={1} cardCount={3} onVote={() => () => null} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(
        <CardBack
          isCorrect
          answer="answer"
          cardNumber={1}
          cardCount={3}
          onVote={() => () => null}
        />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(
        <CardBack
          isCorrect={false}
          answer="answer"
          cardNumber={1}
          cardCount={3}
          onVote={() => () => null}
        />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
