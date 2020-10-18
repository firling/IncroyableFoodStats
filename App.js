import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './components/Home'
// import FilmDetail from './components/FilmDetail'
import HomeScreen from './components/auth/Home'
import LoginScreen from './components/auth/LoginScreen'
import RegisterScreen from './components/auth/RegisterScreen'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="Dashboard" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
