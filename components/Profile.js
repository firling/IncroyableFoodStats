import React from 'react';
import Background from './components/Background';
import Header from './components/Header';
import Button from './components/Button';
import { AuthContext } from "../context/context";


export default function Profile() {
  const { signOut } = React.useContext(AuthContext);
  return (
    <Background>
      <Header>Ton Profil</Header>
      <Button onPress={() => signOut()}>
        Log out
      </Button>
    </Background>
  );
}
