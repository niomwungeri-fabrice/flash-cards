import React, { Component } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { Navigation } from './src/components/views/Navigation';
import { View, StatusBar } from 'react-native';
import Constants from 'expo-constants';
function AppStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}
export default class App extends Component {
  render() {
    return (
      <PaperProvider>
        <View style={{ flex: 1 }}>
          <AppStatusBar backgroundColor={'#1980F5'} barStyle="light-content" />
          <NavigationContainer>
            <Navigation />
          </NavigationContainer>
        </View>
      </PaperProvider>
    );
  }
}
