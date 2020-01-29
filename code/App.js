import React from 'react';
import { 
Text,
YellowBox
  
 } from 'react-native';

 YellowBox.ignoreWarnings(['Warning: Async Storage has been extracted from react-native core']);

import AppContainer from './src/navigations/AppNavigation';
import {
  DrawerNavigator,
  StackNavigator,
  createStackNavigator,
  createAppContainer
} from 'react-navigation';


class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

export default App;
