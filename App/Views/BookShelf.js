'use strict';

var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} = React;

var ToolbarAndroid = require('ToolbarAndroid');
var SearchBar = require('react-native-search-bar');

var api = require("../WebApi/api.js");
var util = require("../Util/util.js");

var RefreshableListView = require("../Components/RefreshableListView");

var searchQuery = '%';

module.exports = React.createClass({
  getInitialState: function(){
    return {
        count: 0,
        lastIndex: 0,
        searchQuery: searchQuery
    };
  },
  render: function(){
    return (
      <View style={styles.container}>
        <SearchBar
          ref='searchBar'
          placeholder='搜索'
          textFieldBackgroundColor='white'
          onChangeText={(text)=> searchQuery= ('%' + text + '%')}
          onSearchButtonPress={()=>this.setState({searchQuery: searchQuery})}
          onCancelButtonPress={()=>console.log('canceled')}
        />
        <RefreshableListView renderRow={(row)=>this.renderListViewRow(row)}
                                     onRefresh={(page, callback)=>this.listViewOnRefresh(page, callback)}
                                     backgroundColor={'#F6F6EF'}
                                     loadMoreText={'加载更多...'}/>
      </View>
    );
    // return(
    //   <View style={styles.container}>
    //     <ToolbarAndroid style={styles.toolbar}
    //                     title={'Top Stories'}
    //                     titleColor={'#FFFFFF'}/>
    //     <RefreshableListView renderRow={(row)=>this.renderListViewRow(row)}
    //                          onRefresh={(page, callback)=>this.listViewOnRefresh(page, callback)}
    //                          backgroundColor={'#F6F6EF'}
    //                          loadMoreText={'Load More...'}/>
    //   </View>
    // );
  },
  renderListViewRow: function(row){
      return(
          <TouchableHighlight underlayColor={'#f3f3f2'}
                              onPress={()=>this.selectRow(row)}>
            <View style={styles.rowContainer}>

                <View style={styles.rowDetailsContainer}>
                    <Text style={styles.rowTitle}>
                        {row.bookName}
                    </Text>
                    <Text style={styles.rowDetailsLine}>
                        出版社 {row.publishingHouse} | 出版时间 {row.publishingTime} | 定价 {row.price} 元
                    </Text>
                    <View style={styles.separator}/>
                </View>
            </View>
          </TouchableHighlight>
      );
  },
  listViewOnRefresh: function(page, callback){
    this.fetchBooksUsingBookCIPs(this.state.searchQuery, this.state.lastIndex, 15, callback);
    // if (page != 1 && this.state.bookCIPs){
    //     this.fetchBooksUsingBookCIPs(this.state.bookCIPs, this.state.lastIndex, 5, callback);
    // }
    // else {
    //   fetch(api.ZAC_BOOKS_ENDPOINT, {
    //     method: 'POST',
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       skip: 0,
    //       limit: 12
    //     })
    //   })
    //   .then((response) => response.json())
    //   .then((bookCIPs) => {
    //       this.fetchBooksUsingBookCIPs(bookCIPs, 0, 12, callback);
    //       this.setState({bookCIPs: bookCIPs});
    //   })
    //   .done();
    // }
      // if (page != 1 && this.state.topStoryIDs){
      //     this.fetchStoriesUsingTopStoryIDs(this.state.topStoryIDs, this.state.lastIndex, 5, callback);
      // }
      // else {
      //   fetch(api.HN_TOP_STORIES_ENDPOINT)
      //   .then((response) => response.json())
      //   .then((topStoryIDs) => {
      //       this.fetchStoriesUsingTopStoryIDs(topStoryIDs, 0, 12, callback);
      //       this.setState({topStoryIDs: topStoryIDs});
      //   })
      //   .done();
      // }
  },
  fetchBooksUsingBookCIPs: function(searchQuery, startIndex, amountToAdd, callback){
    var rowsData = [];
    var endIndex = startIndex + amountToAdd;
    fetch(api.ZAC_BOOKS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        skip: startIndex,
        limit: amountToAdd,
        bookName: searchQuery,
      })
    })
    .then((response) => response.json())
    .then((row) => {
      rowsData = rowsData.concat(row);
      startIndex = rowsData.length;
      this.setState({lastIndex: endIndex, count: endIndex});
      callback(rowsData);
    })
    .done();
      // var rowsData = [];
      // var endIndex = (startIndex + amountToAdd) < bookCIPs.length ? (startIndex + amountToAdd) : bookCIPs.length;
      // function iterateAndFetch(){
      //     if (startIndex < endIndex) {
      //       fetch(api.ZAC_BOOKS_ENDPOINT, {
      //         method: 'POST',
      //         headers: {
      //           'Accept': 'application/json',
      //           'Content-Type': 'application/json',
      //         },
      //         body: JSON.stringify({
      //           skip: startIndex,
      //           limit: endIndex-startIndex
      //         })
      //       })
      //       .then((response) => response.json())
      //       .then((row) => {
      //         rowsData = rowsData.concat(row);
      //         startIndex = rowsData.length;
      //       })
      //       .done();
      //       console.log(rowsData);
      //       callback(rowsData);
      //     }
      // }
      // iterateAndFetch();
      // this.setState({lastIndex: endIndex});
  },
  // fetchStoriesUsingTopStoryIDs: function(topStoryIDs, startIndex, amountToAdd, callback){
  //     var rowsData = [];
  //     var endIndex = (startIndex + amountToAdd) < topStoryIDs.length ? (startIndex + amountToAdd) : topStoryIDs.length;
  //     function iterateAndFetch(){
  //         if (startIndex < endIndex){
  //             fetch(api.HN_ITEM_ENDPOINT+topStoryIDs[startIndex]+".json")
  //             .then((response) => response.json())
  //             .then((topStory) => {
  //                 topStory.count = startIndex+1;
  //                 rowsData.push(topStory);
  //                 startIndex++;
  //                 iterateAndFetch();
  //             })
  //             .done();
  //         }
  //         else {
  //             callback(rowsData);
  //             return;
  //         }
  //     }
  //     iterateAndFetch();
  //     this.setState({lastIndex: endIndex});
  // },
  selectRow: function(row){
    this.props.navigator.push({
      id: 'BookDetail',
      title: row.bookName + ' 详情',
      book: row,
    });
  }
});

var styles = StyleSheet.create({
    container: {
      flex: 1
    },
    toolbar: {
      height: 10,
      backgroundColor: '#FF6600'
    },
    rowContainer:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowCount: {
        fontSize: 20,
        textAlign: 'right',
        color: 'gray',
        height: 5,
        marginLeft: 15,
    },
    rowDetailsContainer: {
        flex: 1,
        marginLeft: 15,
    },
    rowTitle: {
        fontSize: 15,
        textAlign: 'left',
        marginTop: 10,
        marginBottom: 4,
        marginRight: 10,
        color: '#FF6600'
    },
    rowDetailsLine: {
        fontSize: 12,
        marginBottom: 10,
        color: 'gray',
    },
    separator: {
        height: 1,
        backgroundColor: '#CCCCCC'
    }
});
