

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


export default class RegisterPage extends Component {

  constructor(props){
  super(props);
  // We have the same props as in our signup.js file and they serve the same purposes.
  this.state = {
    loading: false,
    email: '',
    password: '',
    verifypassword: ''
  }
  this.userRef = firebaseApp.database().ref('UserDetails');

  this.signup = this.signup.bind(this)
}

signup(){

  if(this.state.password == this.state.verifypassword) {
  firebaseApp.auth().createUserWithEmailAndPassword(this.state.email, this.state.password
  ).then(function (userData){
    this.userRef = firebaseApp.database().ref('UserDetails');
    this.userRef.push({
      user: userData.uid,
    });
    Actions.Login();
  }).catch(function (error)
    {

            alert('Login Failed. Please try again'+error);
            console.log(error.message)
        });
        //Actions.Login();
  }
  else {
    alert("Passwords did not match")
  }



}

    render() {
        return (
            <ScrollView style={{padding: 20}}>
                <Text
                    style={{fontSize: 27}}>
                    Sign up
                </Text>
                <TextInput placeholder='Email Address'
                onChangeText={(text) => this.setState({email: text})}
                value={this.state.email} />
                <TextInput placeholder='Password'
                onChangeText={(text) => this.setState({password: text})}
                secureTextEntry={true}
                value={this.state.password}
                />
                <TextInput placeholder='Verify Password'
                onChangeText={(text) => this.setState({verifypassword: text})}
                secureTextEntry={true}
                value={this.state.verifypassword}
                />
                <View style={{margin:7}} />
                <Button
                      onPress={this.signup.bind(this)}
                      title="Register"
                />
                </ScrollView>
                )
              }
            }
//module.exports = Login;
