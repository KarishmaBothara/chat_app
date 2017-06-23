import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    View,
    Button
} from 'react-native';

//import { StackNavigator } from 'react-navigation';
import {
  Actions,
} from 'react-native-router-flux';
import {firebaseApp} from "../services/Firebase";


export default class MainPage extends Component {


  logout(){
    firebaseApp.auth().signOut().then(function (userData){
      Actions.Login();
    }).catch(function (error)
      {

              alert('Logout failed'+error);
              console.log(error.message)
          });

    }
    render() {
        return (
            <ScrollView style={{padding: 20}}>
                <Text
                    style={{fontSize: 27}}>
                    Welcome to App
                </Text>
                <View style={{margin:20}} />
                <Button
                    //For testing on emulator, we go directly to friends page
                    onPress={() => Actions.QRCodeScreen() }
                    //For testing on emulator uncomment the following and comment above.
                    /*onPress={() =>
                      Actions.FriendList({
                           //friend: this.state.friend,
                           friend: "XKKP649p4LfU5WXs0mvma8ciix03",
                      })}*/
                    title="Add Friend"
                 />
                 <View style={{margin:20}} />
                 <Button
                    onPress={() => Actions.QRCodeGen() }
                    title="Scan ME"
                  />
                  <View style={{margin:20}} />
                 <Button
                  //  onPress={() => Actions.ChatScreen() }
                     title="Secure chat"
                  />
                  <View style={{margin:20}} />
                <Button
                          onPress={this.logout.bind(this)}
                            title="Logout"
                     />
                </ScrollView>
                )
    }
}
