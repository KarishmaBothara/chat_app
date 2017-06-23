import {firebaseApp} from "./services/Firebase";
import * as firebase from 'firebase';

class Backend {
  uid = '';
  name = '';
  messagesRef = null;
  // initialize Firebase Backend
  constructor() {}


  // retrieve the messages from the Backend
  setUid(value) {
    this.uid = value;
  }
  getUid() {
    return this.uid;
  }
  loadMessages(callback) {
    //this.friendRef.orderByChild('currentUser').equalTo(user.uid).on('value', (snap) => {
    var user = firebaseApp.auth().currentUser;
    UID = this.getUid();
    var sender_receiver = user.uid+":"+UID;
    var receiver_sender = UID+":"+user.uid;
    //alert(UID);
    this.messagesRef = firebase.database().ref('messages');
    this.messagesRef.off();
    const onReceive = (data) => {
      const message = data.val();
      //alert(JSON.stringify(message));
      //  for(i=0; i< message.length; i++) {
        //  alert(i);
          //alert(message.text);
          //alert(message.uid);
          //alert(message.sender_receiver);
          var dbSenderReceiver = message.sender_receiver;
          if(dbSenderReceiver == sender_receiver || dbSenderReceiver == receiver_sender ) {
          callback({
            _id: data.key,
            text: message.text,
            createdAt: new Date(message.createdAt),
            user: {
              _id: message.user._id,
              name: message.user.name,
            },
          });
        }
    //}
    };
    this.messagesRef.limitToLast(20).on('child_added', onReceive);
  }
  // send the message to the Backend
  sendMessage(message) {
    var user = firebaseApp.auth().currentUser;
    for (let i = 0; i < message.length; i++) {
      this.messagesRef.push({
        text: message[i].text,
        uid: message[i].user._id,
        user: message[i].user,
        sender_receiver: user.uid+":"+ message[i].user._id,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
      });
    }
  }
  // close the connection to the Backend
  closeChat() {
    if (this.messagesRef) {
      this.messagesRef.off();
    }
  }
}

export default new Backend();
