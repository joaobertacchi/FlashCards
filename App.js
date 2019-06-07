// @flow

import React, { Fragment } from 'react';
import {
  Platform, StatusBar, StyleSheet, SafeAreaView,
} from 'react-native';
import {
  AppLoading, Asset, Font, Icon,
} from 'expo';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import AppNavigator from './navigation/AppNavigator';
import reducer from './reducers';
import middleware from './middleware';
import { setLocalNotification } from './utils/helpers';

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

  componentDidMount() {
    setLocalNotification();
  }

  loadResourcesAsync = async () => Promise.all([
    Asset.loadAsync([
      require('./assets/images/joao-bertacchi.jpg'),
    ]),
    Font.loadAsync({
      ...Icon.Ionicons.font,
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
    }),
  ]);

  handleLoadingError = (error: string) => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    // eslint-disable-next-line no-console
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
      <Fragment>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <AppNavigator />
      </Fragment>
    );
  }

  render() {
    return (
      <Provider store={store}>
        <SafeAreaView style={styles.container}>{this.renderApp()}</SafeAreaView>
      </Provider>
    );
  }
}

export default App;
