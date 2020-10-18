import React, { memo, useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import Background from '../components/Background';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';

// const LoginScreen = ({ navigation }) => {
//   const [email, setEmail] = useState({ value: '', error: '' });
//   const [password, setPassword] = useState({ value: '', error: '' });

//   const _onLoginPressed = () => {
//     navigation.navigate('Dashboard');
//   };

//   return (
//     <Background>
//       <BackButton goBack={() => navigation.navigate('HomeScreen')} />

//       <Header>Welcome back.</Header>

//       <TextInput
//         label="Email"
//         returnKeyType="next"
//         value={email.value}
//         onChangeText={text => setEmail({ value: text, error: '' })}
//         error={!!email.error}
//         errorText={email.error}
//         autoCapitalize="none"
//         autoCompleteType="email"
//         textContentType="emailAddress"
//         keyboardType="email-address"
//       />

//       <TextInput
//         label="Password"
//         returnKeyType="done"
//         value={password.value}
//         onChangeText={text => setPassword({ value: text, error: '' })}
//         error={!!password.error}
//         errorText={password.error}
//         secureTextEntry
//       />

//       <View style={styles.forgotPassword}>
//         <TouchableOpacity
//           onPress={() => navigation.navigate('ForgotPasswordScreen')}
//         >
//           <Text style={styles.label}>Forgot your password?</Text>
//         </TouchableOpacity>
//       </View>

//       <Button mode="contained" onPress={_onLoginPressed}>
//         Login
//       </Button>

//       <View style={styles.row}>
//         <Text style={styles.label}>Don’t have an account? </Text>
//         <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
//           <Text style={styles.link}>Sign up</Text>
//         </TouchableOpacity>
//       </View>
//     </Background>
//   );
// };

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: {value: '', error: ''},
      password: {value: '', error: ''}
    }
  }

  _onLoginPressed = () => {
    this.props.navigation.navigate('Dashboard');
  }

  render() {
    return(
      <Background>
        <BackButton goBack={() => this.props.navigation.navigate('HomeScreen')} />

        <Header>Incroyable Food Stats</Header>

        <TextInput
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
        />

        <TextInput
          label="Password"
          returnKeyType="done"
          value={this.state.password.value}
          onChangeText={text => this.setState({password: { value: text, error: '' }})}
          error={!!this.state.password.error}
          errorText={this.state.password.error}
          secureTextEntry
        />

        <View style={styles.forgotPassword}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('ForgotPasswordScreen')}
          >
            <Text style={styles.label}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>

        <Button mode="contained" onPress={this._onLoginPressed}>
          Login
        </Button>

        <View style={styles.row}>
          <Text style={styles.label}>Don’t have an account? </Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('RegisterScreen')}>
            <Text style={styles.link}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </Background>
    )
  }
  
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

// export default memo(LoginScreen);