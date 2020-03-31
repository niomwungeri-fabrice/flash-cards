import React, { Component } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/components/views/Navigation';
import { View } from 'react-native';
import { AppStatusBar } from './src/components/presentational/StatusBar';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import decks from './src/redux/reducers';
import { rootMiddleware } from './src/redux/middleware/index';
import { setLocalNotification } from './src/utils/helpers';
export default class App extends Component {
  componentDidMount() {
    setLocalNotification();
  }
  render() {
    return (
      <Provider store={createStore(decks, rootMiddleware)}>
        <PaperProvider>
          <View style={{ flex: 1 }}>
            <AppStatusBar
              backgroundColor={'#1980F5'}
              barStyle="light-content"
            />
            <NavigationContainer>
              <Navigation />
            </NavigationContainer>
          </View>
        </PaperProvider>
      </Provider>
    );
  }
}
