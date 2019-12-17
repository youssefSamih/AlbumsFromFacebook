//import liraries
import React, { Component, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, AsyncStorage } from 'react-native';
import { AccessToken, LoginButton, LoginManager } from "react-native-fbsdk";

import Context from "../context";

const { width } = Dimensions.get("screen");

class Main extends Component {
  state = {
    token: null
  }

  async componentWillMount() {
    // await AsyncStorage.setItem('fb_token', "");
    let token = await AsyncStorage.getItem('fb_token');
    if(token) {
      this.props.navigation.navigate('albums');
    } else {
      LoginManager.logInWithPermissions(["public_profile", "user_status", "user_photos"]).then(
        async (result) => {
          if (result.isCancelled) {
            console.log("Login cancelled");
          } else {
            await AccessToken.getCurrentAccessToken()
                .then(async (data) => {
                  await AsyncStorage.setItem('fb_token', data.accessToken.toString());
                  this.props.navigation.navigate('albums');
                })
                .catch(error => {
                  console.log(error)
                })
          }
        },
        function(error) {
          console.log("Login fail with error: " + error);
        }
      );
    }
  }

  async componentWillUpdate() {
    let token = await AsyncStorage.getItem('fb_token');
    if(token){
      this.setState({
        token
      });
      this.onAuthComplete();
    }
  }
  
  onAuthComplete = () => {
    this.props.navigation.navigate('albums');
  }
  
  render() {
    if(this.state.token) {
      return this.onAuthComplete();
    }
    return (
      <View style={styles.container}>
          <LoginButton
            readPermissions={["public_profile"]}
            onLoginFinished={async () =>
              await AccessToken.getCurrentAccessToken()
              .then(async (data) => {
                await AsyncStorage.setItem('fb_token', data.accessToken.toString());
                this.props.navigation.navigate('albums');
              })
              .catch(error => {
                console.log(error)
              })
            } 
          />
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: 'center',
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center",
    borderRadius: width / 50,
    justifyContent: "center",
    flex: 1,
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 24,
    color: "white",
    padding: 10,
    backgroundColor: "#3b5998"
  }
  
});

export const Home = props => {
  const { dispatch } = useContext(Context);
  return <Main dispatch={dispatch} navigation={props.navigation}></Main>
}

//make this component available to the app
export default Home;
