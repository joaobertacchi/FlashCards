// @flow

import React from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';

type Props = {
  navigation: Object,
};

const DeckScreen = ({ navigation }: Props) => {
  const {
    state: {
      params: { deck, onAddCard },
    },
  } = navigation;

  return (
    <ScrollView>
      <Text>{deck.title}</Text>
      <Text>
        {deck.questions.length}
        {' cards'}
      </Text>
      <TouchableOpacity
        onPress={
          () => navigation.navigate(
            'AddCard',
            { onAddCard },
          )
        }
      >
        <Text>Add card</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Quiz', { deck })}>
        <Text>Start quiz</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

DeckScreen.navigationOptions = {
  title: 'Deck',
};

export default DeckScreen;
