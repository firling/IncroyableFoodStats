import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AsyncStorage } from 'react-native';
import Home from './components/Home'
import Recherche from './components/Recherche'
import Profile from './components/Profile'
import ScanBarCode from './components/ScanBarCode'
import Loading from './components/Loading'
import HistoricUser from './components/HistoricUser'
import HomeScreen from './components/auth/Home'
import LoginScreen from './components/auth/LoginScreen'
import RegisterScreen from './components/auth/RegisterScreen'
import Toast from 'react-native-toast-message';
import config from "./components/config/config.js"
import { AuthContext } from "./context/context";

const AuthStack = createStackNavigator();

const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen 
      name="HomeScreen"
      component={HomeScreen}
    />
    <AuthStack.Screen 
      name="LoginScreen"
      component={LoginScreen}
    />
    <AuthStack.Screen 
      name="RegisterScreen"
      component={RegisterScreen}
    />
  </AuthStack.Navigator>
);

const Tabs = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const RechercheStack = createStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={Home} />
    <HomeStack.Screen
      name="ScanBarCode"
      component={ScanBarCode}
    />
  </HomeStack.Navigator>
);

const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name="Profile" component={Profile} />
  </ProfileStack.Navigator>
);

const RechercheStackScreen = () => (
  <RechercheStack.Navigator>
    <RechercheStack.Screen name="Recherche" component={Recherche} />
    <RechercheStack.Screen name="HistoricUser" component={HistoricUser} />
  </RechercheStack.Navigator>
);

const TabsScreenHome = () => (
  <Tabs.Navigator>
    <Tabs.Screen name="Home" component={HomeStackScreen} />
  </Tabs.Navigator>
);

const TabsScreenProfile = () => (
  <Tabs.Navigator>
    <Tabs.Screen name="Profile" component={ProfileStackScreen} />
  </Tabs.Navigator>
);

const TabsScreenRecherche = () => (
  <Tabs.Navigator>
    <Tabs.Screen name="Recherche" component={RechercheStackScreen} />
  </Tabs.Navigator>
);

const Drawer = createDrawerNavigator();
const DrawerScreen = () => (
  <Drawer.Navigator initialRouteName="Home">
    <Drawer.Screen name="Home" component={TabsScreenHome} />
    <Drawer.Screen name="Profile" component={TabsScreenProfile} />
    <Drawer.Screen name="Recherche" component={TabsScreenRecherche} />
  </Drawer.Navigator>
);

const RootStack = createStackNavigator();
const RootStackScreen = ({ userToken }) => (
  <RootStack.Navigator headerMode="none">
    {userToken ? (
      <RootStack.Screen
        name="App"
        component={DrawerScreen}
        options={{
          animationEnabled: false
        }}
      />
    ) : (
      <RootStack.Screen
        name="Auth"
        component={AuthStackScreen}
        options={{
          animationEnabled: false
        }}
      />
    )}
  </RootStack.Navigator>
);

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);

  const authContext = React.useMemo(() => {
    return {
      signIn: async (token) => {
        setIsLoading(false);
        await AsyncStorage.setItem(config.STORAGE_KEY, token);
        setUserToken(token);
      },
      signUp: () => {
        setIsLoading(false)
      },
      signOut: async () => {
        setIsLoading(false);
        setUserToken(null);
        await AsyncStorage.removeItem(config.STORAGE_KEY);
      }
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    (async () => {
      const token = await AsyncStorage.getItem(config.STORAGE_KEY);
      setUserToken(token);
    })();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootStackScreen userToken={userToken} />
      </NavigationContainer>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </AuthContext.Provider>
  );
}
