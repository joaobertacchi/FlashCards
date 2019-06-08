import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';
import TabBarIcon from '../TabBarIcon';

describe('TabBarIcon snapshot', () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it('renders correctly Next Question button', () => {
    const tree = renderer.create(<TabBarIcon name="md-add" focused={false} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly Next Question button', () => {
    const tree = renderer.create(<TabBarIcon name="md-add" focused />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly Next Question button', () => {
    const tree = renderer
      .create(<TabBarIcon name="cards-outline" focused={false} type="MaterialCommunityIcons" />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly Next Question button', () => {
    const tree = renderer
      .create(<TabBarIcon name="cards-outline" focused type="MaterialCommunityIcons" />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
