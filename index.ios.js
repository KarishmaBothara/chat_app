/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';


import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

import {Router, Scene, Actions} from 'react-native-router-flux';


import Login from './src/screens/Login';
import ChatScreen from './src/screens/ChatScreen';
//import ChatScreen1 from './src/screens/ChatScreen1';
import MainPage from './src/screens/MainPage';
import RegisterPage from './src/screens/RegisterPage';
import GetStarted from './src/screens/GetStarted';
import QRCodeScreen from './src/QRCodeScreen';
import QRCodeGen from './src/QRCodeGen';
import FriendList from './src/screens/FriendList';

//var SplashPage = require('./SplashPage');
//var LoginPage = require('./LoginPage');
//var MainPage = require('./MainPage');
//var PersonPage = require('./PersonPage');
//var NoNavigatorPage = require('./NoNavigatorPage');
/*const App = StackNavigator({
  Login: { screen: Login },
  MainPage: { screen: MainPage },
  RegisterPage: { screen: RegisterPage },
  GetStarted: { screen: GetStarted },
  QRCodeScreen: { screen: QRCodeScreen},
  QRCodeGen: { screen: QRCodeGen},
  ChatScreen: { screen: ChatScreen},
});*/
class ChatApp16Jun extends Component {
  state = {
    isLoggedIn: false,
    isRegistered: false,
    initialised: false,
    email:''
  }
  render() {
    return (
      <Router>
      <Scene key="GetStarted" component={GetStarted} title="Welcome"/>
      <Scene key="Login" component={Login} title="Login"/>
      <Scene key="MainPage" component={MainPage} title="MainPage"/>
      <Scene key="RegisterPage" component={RegisterPage} title="Register"/>
      <Scene key="QRCodeScreen" component={QRCodeScreen} title="Scan QRcode"/>
      <Scene key="QRCodeGen" component={QRCodeGen} title="My QRcode"/>
      <Scene key="ChatScreen" component={ChatScreen} title="Chat"/>
      <Scene key="FriendList" component={FriendList} title="My Friends"/>
      </Router>
      /*<View>
      <Button onPress={Actions.RegisterPage}>
      <Text> Sign up</Text>
       </Button>
       <Button onPress={Actions.Login}>
       <Text> Login</Text>
        </Button>
      </View>*/
   );
 }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('ChatApp16Jun', () => ChatApp16Jun);
