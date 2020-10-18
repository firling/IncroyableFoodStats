import React, { memo } from 'react';
import Background from '../components/Background';
import Header from '../components/Header';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';


export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Background>
        <Header>Login Template</Header>
    
        <Paragraph>
          The easiest way to start with your amazing application.
        </Paragraph>
        <Button mode="contained" onPress={() => this.props.navigation.navigate('LoginScreen')}>
          Login
        </Button>
        <Button
          mode="outlined"
          onPress={() => this.props.navigation.navigate('RegisterScreen')}
        >
          Sign Up
        </Button>
      </Background>
    )
  }
}