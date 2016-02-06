'use strict';

var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
  ScrollView,
} = React;

var ToolbarAndroid = require('ToolbarAndroid');

var api = require("../WebApi/api.js");
var LoadingView = require('./Loading.js');

module.exports = React.createClass({
  getInitialState : function() {
    return {
        bookData : {},
        loaded : false,
    }
  },

  componentDidMount : function() {
    this.fetchData();
  },

  fetchData : function() {
    fetch(api.ZAC_BOOKS_ID_ENDPOINT + this.props.book.id)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          bookData : responseData,
          loaded : true,
        });
      })
      .done();
  },

  render: function(){
    if (!this.state.loaded) {
      return (
        <LoadingView />
      );
    }

    var book = this.state.bookData;

    return (
      <View style={styles.container}>
        <ToolbarAndroid style={styles.toolbar}
                        title={this.props.title}
                        navIcon={require('image!ic_arrow_back_white_24dp')}
                        onIconClicked={this.props.navigator.pop}
                        titleColor={'#FFFFFF'}/>
        <ScrollView style={styles.pageContainer}>
          <View style={styles.container}>
            <Text style={styles.bookTitle}>{book.bookName}</Text>
          </View>

          <View style={styles.container}>
            <Text style={styles.bookContent}>{book.Abstract}</Text>
          </View>
        </ScrollView>
      </View>
    );


    // return(
    //     <View style={styles.container}>
    //       <ToolbarAndroid style={styles.toolbar}
    //                       title={this.props.title}
    //                       navIcon={{uri: "ic_arrow_back_white_24dp", isStatic: true}}
    //                       onIconClicked={this.props.navigator.pop}
    //                       titleColor={'#FFFFFF'}/>
    //       <Text style={styles.headerPostText}>
    //         {this.props.book.bookName}
    //       </Text>
    //     </View>
    // );
  },

  // renderBookInfo: function(){
  //   if(!this.props.book.id){
  //     return null;
  //   }
  //   return(
  //     <Text style={styles.headerPostText}>
  //       {this.props.book.bookName}
  //     </Text>
  //   );
  // },

});

var styles = StyleSheet.create({
  pageContainer: {

  },
  container: {
    flex: 1,
    flexDirection : 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  bookTitle : {
    color : '#4f4f4f',
    fontSize : 18,
    textAlign : 'left',
    marginTop : 10,
    marginBottom : 10,
    fontWeight : 'bold'
  },
  bookContent : {
    margin : 10,
    marginTop : 10,
    flex: 1,
    color : '#4f4f4f',
    fontSize : 16,
    textAlign : 'left',
    writingDirection : 'ltr',
    lineHeight : 20
  },
});
