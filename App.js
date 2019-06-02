// @flow

import React from 'react';
import {
  Platform, StatusBar, StyleSheet, View,
} from 'react-native';
import {
  AppLoading, Asset, Font, Icon,
} from 'expo';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import AppNavigator from './navigation/AppNavigator';
import reducer from './reducers';
import middleware from './middleware';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

type Props = {
  skipLoadingScreen: boolean,
};

type State = {
  isLoadingComplete: boolean,
};

const store = createStore(reducer, middleware);

class App extends React.Component<Props, State> {
  state = {
    isLoadingComplete: false,
  };

  loadResourcesAsync = async () => Promise.all([
    Asset.loadAsync([
      require('./assets/images/robot-dev.png'),
      require('./assets/images/robot-prod.png'),
    ]),
    Font.loadAsync({
      ...Icon.Ionicons.font,
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
    }),
  ]);

  handleLoadingError = (error: string) => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  renderApp() {
    const { isLoadingComplete } = this.state;
    const { skipLoadingScreen } = this.props;
    if (!isLoadingComplete && !skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this.loadResourcesAsync}
          onError={this.handleLoadingError}
          onFinish={this.handleFinishLoading}
        />
      );
    }
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <AppNavigator />
      </View>
    );
  }

  render() {
    return (
      <Provider store={store}>
        {this.renderApp()}
      </Provider>
    );
  }
}

export default App;
