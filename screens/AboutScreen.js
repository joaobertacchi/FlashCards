// @flow

import React from 'react';
import {
  Image, ScrollView, StyleSheet, Text, View,
} from 'react-native';
import { WebBrowser, Updates } from 'expo';
import { connect } from 'react-redux';

import Button from '../components/Button';

import { handleResetDecks } from '../actions/decks';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 10,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  welcomeImage: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});

class AboutScreen extends React.Component<*, *> {
  static navigationOptions = {
    title: 'About Me',
  };

  handleResetStorage = () => {
    const { resetStorage } = this.props;
    resetStorage();
    Updates.reloadFromCache();
  };

  handleMorePress = () => {
    WebBrowser.openBrowserAsync('https://www.linkedin.com/in/jebertacchi/');
  };

  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.welcomeContainer}>
          <Button onPress={this.handleResetStorage} text="Reset storage" type="danger" />
        </View>
        <View style={styles.welcomeContainer}>
          <Image
            source={require('../assets/images/joao-bertacchi.jpg')}
            style={styles.welcomeImage}
          />
        </View>
        <View style={styles.getStartedContainer}>
          <Text style={styles.developmentModeText}>
            Currently working as Software Developer Engineer for ProFUSION Embedded Systems. Worked
            for 10+ years as software development engineer using primarily C, C++, Python, Ruby, and
            Java languages. Experience with Scrum and CCPM project management. Co-founder of
            AulaViva Tecnologia Educacional, an EdTech company where I work as CTO doing product
            management and web development.
            {' '}
            <Text onPress={this.handleMorePress} style={styles.linkText}>
              More...
            </Text>
          </Text>
        </View>
      </ScrollView>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  resetStorage: () => dispatch(handleResetDecks()),
});

export default connect(
  null,
  mapDispatchToProps,
)(AboutScreen);
