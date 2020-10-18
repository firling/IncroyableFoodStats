import React, { memo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Background from '../components/Background';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import {
  emailValidator,
  passwordValidator,
  nameValidator,
} from '../core/utils';

// const RegisterScreen = ({ navigation }) => {
//   const [name, setName] = useState({ value: '', error: '' });
//   const [email, setEmail] = useState({ value: '', error: '' });
//   const [password, setPassword] = useState({ value: '', error: '' });

//   const _onSignUpPressed = () => {
//     const nameError = nameValidator(name.value);
//     const emailError = emailValidator(email.value);
//     const passwordError = passwordValidator(password.value);

//     if (emailError || passwordError || nameError) {
//       setName({ ...name, error: nameError });
//       setEmail({ ...email, error: emailError });
//       setPassword({ ...password, error: passwordError });
//       return;
//     }

//     navigation.navigate('Dashboard');
//   };

//   return (
//     <Background>
//       <BackButton goBack={() => navigation.navigate('HomeScreen')} />

//       <Header>Create Account</Header>

//       <TextInput
//         label="Name"
//         returnKeyType="next"
//         value={name.value}
//         onChangeText={text => setName({ value: text, error: '' })}
//         error={!!name.error}
//         errorText={name.error}
//       />

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

//       <Button mode="contained" onPress={_onSignUpPressed} style={styles.button}>
//         Sign Up
//       </Button>

//       <View style={styles.row}>
//         <Text style={styles.label}>Already have an account? </Text>
//         <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
//           <Text style={styles.link}>Login</Text>
//         </TouchableOpacity>
//       </View>
//     </Background>
//   );
// };


export default class RegisterScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: {value: '', error: ''},
      email: {value: '', error: ''},
      password: {value: '', error: ''}
    }
  }

  _onSignUpPressed = () => {
    const nameError = nameValidator(this.state.name.value);
    const emailError = emailValidator(this.state.email.value);
    const passwordError = passwordValidator(this.state.password.value);

    if (emailError || passwordError || nameError) {
      this.setState({"name": { ...name, error: nameError }});
      this.setEmail({"email": { ...email, error: emailError }});
      this.setPassword({"password": { ...password, error: passwordError }});
      return;
    }

    this.props.navigation.navigate('Dashboard');
  };

  render() {
    return (
      <Background>
        <BackButton goBack={() => this.props.navigation.navigate('HomeScreen')} />
  
        <Header>Create Account</Header>
  
        <TextInput
          label="Name"
          returnKeyType="next"
          value={this.state.name.value}
          onChangeText={text => this.setState({name: { value: text, error: '' }})}
          error={!!this.state.name.error}
          errorText={this.state.name.error}
        />
  
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