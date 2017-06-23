import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    View,
    ListView,
    StyleSheet,
    Button
} from 'react-native';

import {
  Actions,
} from 'react-native-router-flux';
import {firebaseApp} from "../services/Firebase";
import * as firebaseNew from 'firebase';
import ReactNative from 'react-native';

const ListFriends = require('./ListFriends');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
});
export default class FriendList extends Component {
  uid = '';
  name = '';
  friendRef = null;

  constructor(props){

  super(props);
  // We have the same props as in our signup.js file and they serve the same purposes.
  this.state = {
    friends: [],
    name: '',
    userOnline: '',
    currentUser: '',
    shouldDisableAddButton: false,
    dataSource: new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    })

  };
  firebaseNew.auth().onAuthStateChanged((user) => {
    if (user) {
      this.setAccount(user.uid);
      //this.setName(user.email)
    } else {
      firebaseNew.auth().signInAnonymously().catch((error) => {
        alert(error.message);
      });
    }
  });

  this.addFriend = this.addFriend.bind(this);
  this.friendRef = firebaseApp.database().ref('friends');
  //this.listOfFriends = this.listOfFriends.bind(this);
  this.chatNow = this.chatNow.bind(this);
  this.userRef = firebaseApp.database().ref('UserDetails');

}

setAccount(value) {
  //alert(value);
  this.currentUser = value;
}
getAccount() {
  return this.currentUser;
}

chatNow(uid, title){
  //alert(uid);
  //alert(title);
  //alert("Welcome to chat !!!");
  //alert(uid);
  if(uid != "NA") {
    alert("Welcome to chat !!!");
    Actions.ChatScreen({
         //friend: this.state.friend,
         uid: uid,
         name: title,
    });
  }

}

_renderItem(item) {
  //const rows = this.dataSource.cloneWithRows(item || [])
    //alert(JSON.stringify(item));
    var uid = item.uid;
    var title = item.title;
    return (
      <ListFriends item={item}  onPress={() =>
                                this.chatNow(uid,title)

                            }/>
      //<ListItem item={item} />
  );
  }



addFriend(){

 //var checkQRCodeValid = true;
 this.userRef.orderByChild('user').equalTo(this.props.friend).on('value', (snap) => {
// this.userRef = firebaseNew.database().ref('UserDetails');
  var exists = (snap.val() !== null);
  //alert(exists);
  if(exists) {
    //checkQRCodeValid = false;
   var userExist = false;
   var user = firebaseNew.auth().currentUser;
   if (user) {
     this.friendRef.orderByChild('currentUser').equalTo(user.uid).on('value', (snap) => {
       var items = [];
       items.push({title: "MY FRIENDS",
         uid: 'NA',
         });
       snap.forEach((child) => {
         items.push({
           title: child.val().name,
           uid: child.val().uid,
           _key: child.key
         });
       });
       for(i=0; i< items.length; i++) {
         if(this.props.friend == items[i].uid) {
           userExist = true;
           break;
         }
       }
  });
 }
 if(userExist) {
   alert("Friend is already in your list... ");
   this.setState({shouldDisableAddButton: true});
 }
 else if(this.state.name != "" && this.props.friend != '') {
    this.friendRef.push({
      name: this.state.name,
      currentUser: this.getAccount(),
      uid: this.props.friend,
      createdAt: firebaseNew.database.ServerValue.TIMESTAMP,
    });
    if(user != null) {
      this.friendRef.push({
        name: user.email,
        currentUser: this.props.friend,
        uid: user.uid,
        createdAt: firebaseNew.database.ServerValue.TIMESTAMP,
      });
    }
    alert("Friend Added");
    this.setState({shouldDisableAddButton: true});
    this.listenForItems(this.friendRef);
    this.state.name = '';
  }
  else {
    //alert(this.state.name);
    //alert(this.props.friend);
    alert("Please enter Friend Name");
  }
}
else {
  this.setState({shouldDisableAddButton: true});
  alert("Invalid QR code !!!");
  return;
}
});
}

listenForItems(friendRef) {
  //user1 = null;
  //firebaseNew.auth().onAuthStateChanged((user) => {
  var user = firebaseNew.auth().currentUser;
  if (user) {
      this.setAccount(user.uid);
      this.friendRef.orderByChild('currentUser').equalTo(user.uid).on('value', (snap) => {
      //friendRef.on('value', (snap) => {


        // get children as an array
        var items = [];
        items.push({title: "MY FRIENDS",
          uid: 'NA',
          });
        snap.forEach((child) => {
          items.push({
            title: child.val().name,
            uid: child.val().uid,
            _key: child.key
          });
        });
      /*  alert(JSON.stringify(items));
        for(i=0; i< items.length; i++) {
          alert(i);
          alert(items[i].title);
          alert(items[i].uid);
        }*/
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(items)
        });

      });
    }
  //});

  }



    render() {
        return (
            <ScrollView style={{padding: 20}}>
                <Text
                    style={{fontSize: 27}}>
                    Add as friend
                </Text>
                <TextInput placeholder='Friend Name'
                onChangeText={(text) => this.setState({name: text})}
                value={this.state.name} />
                <View style={{margin:7}} />
                <Button
                      onPress={this.addFriend.bind(this)}
                      title="Add as friend"
                      disabled={this.state.shouldDisableAddButton}
                />
                <View>
                <ListView style={styles.container} dataSource={this.state.dataSource} renderRow={this._renderItem.bind(this)} enableEmptySections={true}> </ListView>
                </View>
                </ScrollView>
                )
              }

  
      componentDidMount() {
        this.listenForItems(this.friendRef);
      }
            }

//module.exports = Login;
