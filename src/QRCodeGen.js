'use strict';

import React, { Component } from 'react'
import QRCode from 'react-native-qrcode';

import {
    StyleSheet,
    View,
    TextInput,
    Text,
    Button
} from 'react-native';
import {firebaseApp} from "./services/Firebase";
import {
  Actions,
} from 'react-native-router-flux';

class QRCodeGen extends Component {

  constructor(props){
  super(props);
  var user = firebaseApp.auth().currentUser;
  this.state = {
    //text: this.login.email,//
    //text: 'http://facebook.github.io/react-native/',
    text: user.uid,
  };
  this.back = this.back.bind(this)
  }
//}

back(){
    //Actions.Main();
  Actions.MainPage();
}
  render() {
    return (
      <View style={styles.container}>
        <QRCode
          value={this.state.text}
          size={200}
          bgColor='purple'
          fgColor='white'/>
          <View style={{margin:7}} />
          <Button
                onPress={this.back.bind(this)}
                title="<-Back"
          />
      </View>

    );
  };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
      /*  paddingTop:60,
        paddingBottom:20,
        paddingLeft:20,
        paddingRight:20,
        marginTop:50,*/
    },

    input: {

        height: 40,
        width: 240,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 70,
        borderRadius: 5,
        padding: 5,
    }
});

module.exports = QRCodeGen;
