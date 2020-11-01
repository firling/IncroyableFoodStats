import React, { memo } from 'react';
import Background from '../components/Background';
import Header from '../components/Header';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';


export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  static navigationOptions = {
    drawerLabel: () => null
  }

  render() {
    return (
      <Background>
        <Header>Incroyable Food Stats</Header>
    
        <Paragraph>
          La MEILLEUR Application Pour te rappeler de ce que tu as MANGé
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