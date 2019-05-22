// @flow

import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});

export default class DecksScreen extends React.Component<*, *> {
  static navigationOptions = {
    title: 'Decks',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        {/* TODO: list of decks */}
        <ExpoLinksView />
      </ScrollView>
    );
  }
}
