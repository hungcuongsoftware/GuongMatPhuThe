import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LoginButton, AccessToken, LoginManager } from 'react-native-fbsdk';
import firebase from 'firebase';

// intial setup firebase
const config = {
    apiKey: 'AIzaSyDp-Kcv88JWMK_VkqR-kgDIripiCzLk-fc',
    authDomain: 'guongmatphuthe.firebaseapp.com',
    databaseURL: 'https://guongmatphuthe.firebaseio.com',
    projectId: 'guongmatphuthe',
    storageBucket: 'guongmatphuthe.appspot.com',
    messagingSenderId: '689222036575'
  };
  firebase.initializeApp(config);


class Login extends Component {
    state = {
        logged: false,
        animating: false
    }

    // using base function of facbebook sdk
    handleLogin = () => {
        if (!this.state.logged) {
            LoginManager.logInWithPublishPermissions(['publish_actions'])
                .then((result) => {
                    if (result.isCancelled) {
                        alert('Cancel login');
                    }
                    // } else if (result.declinedPermissions) {
                    //     alert('declinedPermission');
                    // } else {
                    this.setState({ logged: true });
                    AccessToken.getCurrentAccessToken().then(
                        (data) => {
                            alert(data.accessToken.toString());
                        }
                    );
                })
                .catch(error => console.log(error));
        } else {
            this.setState({ logged: false });
            LoginManager.logOut();
        }
    }

    onLogin = async() => {
        try {
            this.setState({
                animating: true
            });
            
            const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);
            const tokenData= await AccessToken.getCurrentAccessToken();
            const token = tokenData.accessToken.toString();
            const credential = firebase.auth.FacebookAuthProvider.credential(token);
            const user = await firebase.auth().signInWithCredential(credential);
            console.log(credential);
            this.setState({
                animating:false
            });
        } catch (error) {
            this.setState({
                animating:false
            });
            console.log(error.message);
        }

        
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ margin: 10 }} >Welcome to my applition</Text>
                <ActivityIndicator 
                    animating={this.state.animating }
                    color='#ddd'
                    size='large'

                />
                <LoginButton
                    publishPermissions={['publish_actions']}
                    onLoginFinished={
                        (error, result) => {
                            if (error) {
                                alert('login has error: ' + result.error);
                            } else if (result.isCancelled) {
                                alert('login is cancelled.');
                            } else {
                                AccessToken.getCurrentAccessToken().then(
                                    (data) => {
                                        alert(data.accessToken.toString())
                                    }
                                ).catch(error=>console.log(error));
                            }
                        }
                    }
                    onLogoutFinished={() => alert("logout.")} />


                <TouchableOpacity
                    onPress={this.onLogin}
                    sytle={{
                        backgroundColor: 'green',
                        marginTop: 10,
                        padding: 10,
                        borderRadius: 5
                    }}
                >
                    <Text>{this.state.logged ? 'Log out' : 'Log in'}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default Login;
