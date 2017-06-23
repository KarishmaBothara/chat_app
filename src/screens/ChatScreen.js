import React from 'react';

import {
  View,
  Text,
} from 'react-native';

import{ GiftedChat } from 'react-native-gifted-chat';
import Backend from '../Backend';
export default class ChatScreen extends React.Component {
  state = {
    messages: []
  };
  ComponentWillMount(){

  }
  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={(message)=>{

          Backend.sendMessage(message);
          //firebaseApp.sendMessage(message);
        }}
        user={{
          _id: this.props.uid,
          name: this.props.name,
          //_id: Backend.getUid(),
          //name: Backend.getName(),
        }}
      />

    );
  }

componentDidMount(){
  Backend.setUid(this.props.uid);
  Backend.loadMessages((message) => {
    alert(message.text);
    //alert(previousState);
    this.setState((previousState) => {
      return {
        //alert(message.text);
        //messages: GiftedChat.append(previousState.message, message),
        messages: GiftedChat.append(previousState.message, message),
      };
    });
  });
}
ComponentWillUnmount(){
  Backend.closeChat();
}
}
ChatScreen.defaultProps = {
    name: 'ABC',
};
ChatScreen.propTypes = {
  name: React.PropTypes.string,
};
