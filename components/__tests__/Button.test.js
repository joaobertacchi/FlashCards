import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Button from '../Button';

it('renders correctly', () => {
  const tree = renderer.create(<Button type="primary" text="Hello" />).toJSON();

  expect(tree).toMatchSnapshot();
});
