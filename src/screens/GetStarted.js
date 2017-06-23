import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    View,
    Button
} from 'react-native';
import {
  Actions,
} from 'react-native-router-flux';


export default class GetStarted extends Component {

    render() {
        return (
            <ScrollView style={{padding: 20}}>
                <Text
                    style={{fontSize: 27}}>
                    Welcome to the app....</Text>
                  <Text style={{fontSize: 20}}>
                    Register or Login to get started
                </Text>
                <View style={{margin:57}} />
                <Button style={{padding: 20, borderRadius: 5, marginTop: 15, marginBottom: 7}}
                      onPress={() => Actions.RegisterPage() }
                      title="Register" />
                <View style={{margin:27}} />
                <Button style={{padding: 20, borderRadius: 5, marginTop: 15, marginBottom: 7}}
                    onPress={() => Actions.Login()} title="Login"
                />
                </ScrollView>
                )
              }
            }
//module.exports = GetStarted;
