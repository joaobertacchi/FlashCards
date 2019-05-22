// @flow

import React from 'react';
import { ScrollView, Text } from 'react-native';

const QuizScreen = () => (
  <ScrollView>
    <Text>Question #1 out of 20</Text>
    <Text>"Correct" button</Text>
    <Text>"Incorrect" button</Text>
    <Text>"Show answer" button</Text>
    <Text>Add question</Text>
  </ScrollView>
);

export default QuizScreen;
