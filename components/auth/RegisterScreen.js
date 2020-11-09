import React, { memo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Background from '../components/Background';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import config from "../config/config.js"

export default class RegisterScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      url_serv: config.url_serv,
      username: {value: '', error: ''},
      password: {value: '', error: ''}
    }
  }

  _onSignUpPressed = () => {
    var {username, password, url_serv} = this.state
    axios.post(`${url_serv}/auth/register`, {
      username: username.value,
      password: password.value
    }).then((res) => {
      if (res.data.success) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: `The user ${this.state.username.value} has been created! You can now Login`,
          visibilityTime: 4000,
        });
        this.props.navigation.navigate('LoginScreen');
      }
    }).catch((err) => {
      console.log(err.response.data.error)
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: `${err.response.data.error}`,
        visibilityTime: 4000,
      });
    })
  };

  render() {
    return (
      <Background>
        <BackButton goBack={() => this.props.navigation.navigate('HomeScreen')} />
  
        <Header>Create Account</Header>
  
        <TextInput
          label="Username"
          returnKeyType="next"
          value={this.state.username.value}
          onChangeText={text => this.setState({username: { value: text, error: '' }})}
          error={!!this.state.username.error}
          errorText={this.state.username.error}
          autoCapitalize="none"
        />
  
        {/* <TextInput
          label="Email"
          returnKeyType="next"
          value={this.state.email.value}
          onChangeText={text => this.setState({email: { value: text, error: '' }})}
          error={!!this.state.email.error}
          errorText={this.state.email.error}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        /> */}
  
        <TextInput
          label="Password"
          returnKeyType="done"
          value={this.state.password.value}
          onChangeText={text => this.setState({password: { value: text, error: '' }})}
          error={!!this.state.password.error}
          errorText={this.state.password.error}
          autoCapitalize="none"
          secureTextEntry
        />
  
        <Button mode="contained" onPress={this._onSignUpPressed} style={styles.button}>
          Sign Up
        </Button>
  
        <View style={styles.row}>
          <Text style={styles.label}>Already have an account? </Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('LoginScreen')}>
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
        </View>
      </Background>
    );
  }

}

const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary,
  },
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});