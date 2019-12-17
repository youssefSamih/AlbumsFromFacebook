import React, { useContext, useReducer } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from "react-navigation";

import Context from './src/context';
import reducer from "./src/reducer";

import AuthScreen from './src/screens/Auth';
import MainScreen from './src/screens/Main';
import AlbumsScreen from './src/screens/Albums';

export default function App() {
  const MainNavigator = createAppContainer(
    createStackNavigator({
      auth : { screen: AuthScreen },
      main : { screen: MainScreen },
      albums : { screen: AlbumsScreen },
      // main : { 
      //   screen: createStackNavigator({
      //     projecthome: { screen: ProjectHome },
      //     Project: { screen: ProjectScreen }
      //   },{
      //     headerMode: "none"
      //   })
      // }
    },{
      defaultNavigationOptions:{
        tabBarVisible: false,
        headerShown: false
      },
      lazy: true  
    })
  );
  const initialState = useContext(Context);
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log({state});
  return (
    <Context.Provider value={{ state, dispatch }}>
      <MainNavigator />
    </Context.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});