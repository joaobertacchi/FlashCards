import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import CardFront from '../CardFront';

it('renders correctly', () => {
  const tree = renderer.create(
    <CardFront question="question" onShowBack={() => null} />,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
