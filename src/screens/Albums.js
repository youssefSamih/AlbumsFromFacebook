//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage, Dimensions, TouchableOpacity, Image, FlatList } from 'react-native';
import { GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

// create a component
class Albums extends Component {
  state={
    data: []
  };

  componentDidMount() {
    // Create a graph request asking for user information with a callback to handle the response.
    const infoRequest = new GraphRequest(
      '/me?fields=albums{picture,name}',
      null,
      this._responseInfoCallback,
    );
    // Start the graph request.
    new GraphRequestManager().addRequest(infoRequest).start();
  }

  _responseInfoCallback = (error, result) => {
    if (error) {
      console.log( error);
    } else {
      this.setState({
        data: result.albums.data.sort(function(a, b){
          if(a.name < b.name) { return -1; }
          if(a.name > b.name) { return 1; }
          return 0;
        })
      });
      // console.log(result)
    }
  }

  renderItem = ({ item, index }) => {
    console.log(item.picture.data.url);
    return (
        <View
          style={{ justifyContent: 'center', height: Dimensions.get('window').width / 2, width: Dimensions.get('window').width / 2 }}
          key={item.id}
        >
          <Image source={{ uri: item.picture.data.url }} style={styles.ImageIconStyle}/>
          <Text style={styles.itemText}>{item.name}</Text>
      </View>
    );
  };

  render() {
    if(this.state.data.length > 0) {
      console.log(this.state.data);
      return (
        <FlatList
          data={this.state.data}
          style={styles.container}
          renderItem={this.renderItem}
          numColumns={2}
          // contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', }}
        />
      );
    }
    return <View />
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ImageIconStyle: {
    // padding: 10,
    // height: 50,
    // width: 50,
    flex: 1,
    // width: (Dimensions.get('window').width/3) - 4,
    // height: (Dimensions.get('window').height/10) - 4,
    resizeMode: 'stretch',
  },
});

//make this component available to the app
export default Albums;
