/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');

var {
  AppRegistry,
  Component,
  View,
  StyleSheet,
} = React;

var SearchBar = require('react-native-search-bar');

var BookShelf = require('./App/Views/BookShelf.js');

var BookFinder = React.createClass({
  render: function() {
    return (
      <View>
        <View style={styles.searchBar}>
          <SearchBar
            ref='searchBar'
            placeholder='搜索'
            textFieldBackgroundColor='white'
            onChangeText={(text)=>this.setState({text})}
            onSearchButtonPress={()=>this.onSearch()}
            onCancelButtonPress={()=>this.onCancel()}
          />
        </View>
        <View style={styles.bookShelf}>
          <BookShelf/>
        </View>
      </View>
    );
  },

  onSearch: function() {
    console.log(this.refs.searchBar);
  },

  onCancel: function() {
    console.log('cancel');
  }
});

var styles = StyleSheet.create({
  searchBar: {
    marginTop: 25,
    backgroundColor: '#ffffff',
  },
  bookShelf: {
    marginTop: 5
  }
});

AppRegistry.registerComponent('BookFinder', () => BookFinder);

// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  */
// 'use strict';
// import React, {
//   AppRegistry,
//   Component,
//   StyleSheet,
//   Text,
//   View
// } from 'react-native';
//
// class BookFinder extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>
//           Welcome to React Native!
//         </Text>
//         <Text style={styles.instructions}>
//           To get started, edit index.android.js
//         </Text>
//         <Text style={styles.instructions}>
//           Shake or press menu button for dev menu
//         </Text>
//       </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });
//
// AppRegistry.registerComponent('BookFinder', () => BookFinder);
