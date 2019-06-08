import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import AboutScreen from '../AboutScreen';

const middlewares = [];
const mockStore = configureStore(middlewares);

const initialState = {};

describe('AboutScreen snapshot', async () => {
  it('renders as expected', () => {
    const wrapper = shallow(<AboutScreen />, { context: { store: mockStore(initialState) } });
    expect(wrapper.dive()).toMatchSnapshot();
  });

  it.skip('click in reset storage', () => {
    AboutScreen.prototype.handleResetStorage = jest.fn();
    const wrapper = shallow(<AboutScreen />, { context: { store: mockStore(initialState) } });
    const render = wrapper.dive();
    render.find('Button').forEach((child) => {
      child.simulate('click');
    });
    expect(AboutScreen.prototype.handleResetStorage).toHaveBeenCalled();
  });
});
