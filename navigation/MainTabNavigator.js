// @flow

import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import AboutScreen from '../screens/AboutScreen';
import TabBarIcon from '../components/TabBarIcon';
import DecksScreen from '../screens/DecksScreen';
import DeckScreen from '../screens/DeckScreen';
import NewDeckScreen from '../screens/NewDeckScreen';
import AddCardScreen from '../screens/AddCardScreen';
import QuizScreen from '../screens/QuizScreen';

const DecksStack = createStackNavigator({
  Decks: DecksScreen,
  Deck: DeckScreen,
  AddCard: AddCardScreen,
  Quiz: QuizScreen,
});

DecksStack.navigationOptions = {
  tabBarLabel: 'Decks',
  tabBarIcon: ({ focused }: { focused: boolean }) => (
    <TabBarIcon focused={focused} type="MaterialCommunityIcons" name="cards-outline" />
  ),
};

const NewDeckStack = createStackNavigator({
  NewDeck: NewDeckScreen,
});

NewDeckStack.navigationOptions = {
  tabBarLabel: 'Create deck',
  tabBarIcon: ({ focused }: { focused: boolean }) => (
    <TabBarIcon
      focused={focused}
      type="Ionicons"
      name={Platform.OS === 'ios' ? 'ios-add' : 'md-add'}
    />
  ),
};

const AboutStack = createStackNavigator({
  About: AboutScreen,
});

AboutStack.navigationOptions = {
  tabBarLabel: 'About',
  tabBarIcon: ({ focused }: { focused: boolean }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const tabNavigatorRoutes = {
  DecksStack,
  NewDeckStack,
  AboutStack,
};

export default createBottomTabNavigator(tabNavigatorRoutes);
