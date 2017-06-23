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
import {firebaseApp} from "../services/Firebase";

export default class Login extends Component {

  constructor(props){
  super(props);
  // We have the same props as in our signup.js file and they serve the same purposes.
  this.state = {
    loading: false,
    email: '',
    password: ''
  }
  this.login = this.login.bind(this)

}

login(){
  //alert("Email is " );
  //alert(this.state.email);
  //alert("Password is ");
  //alert(this.state.password);
  firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password
  ).then(function (userData){
    Actions.MainPage();
  }).catch(function (error)
    {

            alert('Login Failed. Please try again'+error);
            console.log(error.message)
        });

  }
  //Actions.MainPage();


    render() {
        return (
            <ScrollView style={{padding: 20}}>
                <Text
                    style={{fontSize: 27}}>
                    Login
                </Text>
                <TextInput placeholder='Email Address'
                onChangeText={(text) => this.setState({email: text})}
                value={this.state.email} />
                <TextInput placeholder='Password'
                onChangeText={(text) => this.setState({password: text})}
                secureTextEntry={true}
                value={this.state.password}
                />
                <View style={{margin:7}} />
                <Button
                      onPress={this.login.bind(this)}
                      title="Submit"
                />
                </ScrollView>
                )
              }
            }
//module.exports = Login;
