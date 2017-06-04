import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import { LoginButton, AccessToken, LoginManager } from 'react-native-fbsdk';

class Login extends Component {
    state = {
        logged: false
    }

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

    gotoAuthorized() {
        this.props.navigation.navigate('Authorized');
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{margin:10 }} />Welcome to my applition</Text>
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
                    onPress={this.handleLogin}
                    sytle={{
                        backgroundColor: 'green',
                        marginTop: 10,
                        padding: 10,
                        borderRadius: 5
                    }}
                >
                    <Text>{this.state.logged ? 'Log out' : 'Log in'}</Text>
                </TouchableOpacity>

                <Button
                    onPress={this.handleLogin}
                    title="Learn More"
                    color="#841584"
                    backgroundColor='green'
                    accessibilityLabel="Learn more about this purple button"
                />

            </View>
        );
    }
}

export default Login;
