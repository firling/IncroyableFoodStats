import React, {  useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, AsyncStorage } from 'react-native';
import Background from '../components/Background';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import config from "../config/config.js"
import { AuthContext } from "../../context/context";

export default function LoginScreen({ navigation: { navigate } }) {
    const [url_serv] = React.useState(config.url_serv);
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const { signIn } = React.useContext(AuthContext);

    const _onLoginPressed = () => {
        axios.post(`${url_serv}/auth/login`, {
          username: username,
          password: password
        }).then((res) => {
          if (res.data.success) {
            Toast.show({
              type: 'success',
              text1: 'Success',
              text2: `Authentication Successful`,
              visibilityTime: 4000,
            });
            signIn(res.data.token)
          }
        }).catch((err) => {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: `${err.response.data.error}`,
            visibilityTime: 4000,
          });
        })
      }

    return (
      <Background>
        <BackButton goBack={() => navigate('HomeScreen')} />

        <Header>Incroyable Food Stats</Header>

        <TextInput
          label="Username"
          returnKeyType="next"
          value={username}
          onChangeText={text => setUsername(text)}
          autoCapitalize="none"
        />

        <TextInput
          label="Password"
          returnKeyType="done"
          value={password}
          onChangeText={text => setPassword(text)}
          autoCapitalize="none"
          secureTextEntry
        />

        {/* <View style={styles.forgotPassword}>
          <TouchableOpacity
            onPress={() => navigate('ForgotPasswordScreen')}
          >
            <Text style={styles.label}>Forgot your password?</Text>
          </TouchableOpacity>
        </View> */}

        <Button mode="contained" onPress={_onLoginPressed}>
          Login
        </Button>

        <View style={styles.row}>
          <Text style={styles.label}>Don’t have an account? </Text>
          <TouchableOpacity onPress={() => navigate('RegisterScreen')}>
            <Text style={styles.link}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </Background>
    );
}

const styles = StyleSheet.create({
    forgotPassword: {
      width: '100%',
      alignItems: 'flex-end',
      marginBottom: 24,
    },
    row: {
      flexDirection: 'row',
      marginTop: 4,
    },
    label: {
      color: theme.colors.secondary,
    },
    link: {
      fontWeight: 'bold',
      color: theme.colors.primary,
    },
  });