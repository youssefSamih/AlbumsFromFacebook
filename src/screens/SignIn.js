import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ImageBackground,
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback,
    Image,
    Text,
    ScrollView,
    TouchableOpacity,
    Platform,
    Dimensions,
    AsyncStorage
  } from "react-native";
import LinearGradient from 'react-native-linear-gradient';


import MainText from "../components/UI/MainText";
import HeadingText from "../components/UI/HeadingText";
import DefaultInput from '../components/UI/DefaultInput';
import ButtonWithBackground from "../components/UI/ButtonWithBackground";
  
export default class SignInScreen extends Component {
    state = {
        keyAvoid: false,
        email: '',
        password: '',
        confirmPassowrd: ''
    }

    componentWillMount () {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
      }
    
    componentWillUnmount () {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow = () => {
        this.setState({ keyAvoid: true });
    }

    _keyboardDidHide  = () => {
        this.setState({ keyAvoid: false });
    }

    handleSubmit = async () => {
      // let email = await AsyncStorage.getItem('email');
      // let password = await AsyncStorage.getItem('password');
      // if(this.state.password === this.state.confirmPassowrd && this.state.password !== '' && this.state.confirmPassowrd !== '') {
      //   // alert("hello1")
      //   await AsyncStorage.setItem('email', this.state.email);
      //   await AsyncStorage.setItem('password', this.state.password);
      //   this.props.navigation.navigate('main');
      // } 
      // if (email !== '' && password !== '' && this.state.password === this.state.confirmPassowrd && this.state.password !== '') {
      //   // alert("hello2")
      //   await AsyncStorage.setItem('email', '');
      //   await AsyncStorage.setItem('password', '');
      //   await AsyncStorage.setItem('email', this.state.email);
      //   await AsyncStorage.setItem('password', this.state.password);
      //   this.props.navigation.navigate('main');
      // }
      // else {
      //   alert("Password not identical and must not be blank !")
      // }
      this.props.navigation.navigate('main');
    }

    // background-image: linear-gradient(to right top, #385898, #727db1, #a4a6ca, #d2d1e4, #ffffff);
    render() {
        return (
            <ImageBackground source={require('../constants/images/connexion.jpg')} style={styles.backgroundImage}>
                <LinearGradient
                    // colors={['rgba(238,136,17,0.2)', 'transparent']}
                    colors={['#385898', '#727db1', '#ffffff']}
                    style={{width: "100%", opacity: 0.6, flex: 1}}
                    // start={[6, 0.1]}
                    start={{x: 0, y: 0}} 
                    end={{x: 1, y: 0}}
                >
                    <ScrollView style={styles.scrollStyle} showsVerticalScrollIndicator={false}>
                        <KeyboardAvoidingView style={styles.container} behavior="height" contentContainerStyle={styles.behavior}>
                            <MainText>
                                <HeadingText style={styles.forgotPassText}>Sign In</HeadingText>
                            </MainText>
                            <View style={styles.imageContainer}>
                              <Image 
                                  source={require('../constants/images/facebookLogo.png')}
                                  style={styles.logo}
                              />
                            </View>
                            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View style={styles.inputContainer}>
                                <DefaultInput
                                    placeholder="email"
                                    style={styles.input}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    keyboardType="email-address"
                                    value={this.state.email}
                                    onChange={text => this.setState({ email: text })}
                                />
                                <View
                                    style={styles.portraitPasswordContainer}
                                >
                                    <View
                                        style={styles.portraitPasswordWrapper}
                                    >
                                        <DefaultInput
                                            placeholder="Password"
                                            style={styles.input}
                                            secureTextEntry
                                            onChange={text => this.setState({ password: text })}
                                        />

                                          <DefaultInput
                                            placeholder="Confirm Password"
                                            style={styles.input}
                                            secureTextEntry
                                            onChange={text => this.setState({ confirmPassowrd: text })}
                                          />
                                    </View>
                                </View>
                            </View>
                            </TouchableWithoutFeedback>
                            {/* <ElevatedView
                                style={{ backgroundColor: '#000000b5', opacity: .8, borderRadius: 10 }}
                            >     */}
                                <ButtonWithBackground
                                    Backcolors={['#385898', '#727db1', '#fff']}
                                    buttonStyle={styles.buttonContianer}
                                    start={{x: 0, y: 0}} 
                                    end={{x: 1, y: 0}}
                                    onPress={this.handleSubmit}
                                >
                                    <HeadingText style={styles.textCenter}>Sign In</HeadingText>
                                </ButtonWithBackground>
                            {/* </ElevatedView> */}
                            <TouchableOpacity style={{ marginTop: this.state.keyAvoid ? 80 : 100, marginBottom: 30 }} onPress={() => this.props.navigation.navigate('auth')}>
                                <HeadingText style={styles.createAccountText}>Login</HeadingText>
                            </TouchableOpacity>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </LinearGradient>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        width: "100%",
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
    inputContainer: {
        width: "80%"
    },
    input: {
        backgroundColor: "transparent",
        color: "white",
        borderColor: "#385898",
        padding: 10,
        paddingLeft: 20
    },
    portraitPasswordContainer: {
        flexDirection: "column",
        justifyContent: "flex-start"
    },
    portraitPasswordWrapper: {
        width: "100%"
    },
    logo: {
        width: 100,
        height: 100,
        borderRadius: Platform.OS === "android" ? 100 : 50,
    },
    imageContainer: {
        marginTop: 50,
        marginBottom: 50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 100,
        position:'relative'
    },
    forgotPassText: {
        color: "#fff"
    },
    buttonContianer: {
        width: Dimensions.get('window').width / 1.3 ,
        alignItems: "center",
    },
    textCenter: {
        fontWeight: "bold",
        color: "#fff"
    },
    createAccountText: {
        color: "#fff"
    },
    behavior: {
        marginTop: 100
    },
    stayElevated: {
        width: -102,
        height: 103,
        margin: 10,
        backgroundColor: '#000000b5',
        borderRadius: 100,
    },
    scrollStyle: { 
        marginTop: 20
    }
})