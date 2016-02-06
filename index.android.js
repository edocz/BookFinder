/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');

var {
  AppRegistry,
  StyleSheet,
  Navigator,
  BackAndroid
} = React;

var BookShelf = require('./App/Views/BookShelf.js');
var BookDetail = require('./App/Views/BookDetail.js');

var _navigator;

BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator.getCurrentRoutes().length === 1  ) {
     return false;
  }
  _navigator.pop();
  return true;
});

var BookFinder = React.createClass({
  render: function() {
    return (
      <Navigator
        style={styles.container}
        tintColor='#FF6600'
        initialRoute={{id: 'BookShelf'}}
        renderScene={this.navigatorRenderScene}/>
    );
  },
  navigatorRenderScene: function(route, navigator){
    _navigator = navigator;
    switch (route.id) {
      case 'BookShelf':
        return (<BookShelf navigator={navigator} />);
      case 'BookDetail':
        console.log('book detail');
        return (<BookDetail navigator={navigator} title={route.title} book={route.book}/>);
    }
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6EF',
  },
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
