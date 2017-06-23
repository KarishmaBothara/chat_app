import React, {Component} from 'react';
import ReactNative from 'react-native';
//const styles = require('../styles.js')
const { View, TouchableHighlight, StyleSheet,Text } = ReactNative;
var styles = StyleSheet.create({
  container: {
    borderRadius: 14,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  activeTitle: {
    color: 'orange',
  },
});
class ListFriends extends Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View style={styles.container}>
          <Text style={[styles.title, styles.activeTitle]}>{this.props.item.title}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

module.exports = ListFriends;
