import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, AsyncStorage, View } from 'react-native'
import Background from './components/BackgroundHome';
import Header from './components/Header';
import Button from './components/Button';
import HistoricItem from './HistoricItem';
import config from "./config/config.js"
import axios from 'axios';


export default function Home({navigation: {navigate}}) {
  const [userToken, setUserToken] = useState(null);
  const [historic, setHistoric] = useState(null);

  useEffect(() => {
    getHistoric()
  }, []);

  const getHistoric = () => {
    AsyncStorage.getItem(config.STORAGE_KEY)
    .then(token => {
      setUserToken(token);
      axios.get(`${config.url_serv}/getUserHistoric?token=${token}`)
        .then(res => {
          setHistoric(res.data.data)
        })
    })
  }

  return (
      <Background>
        <View style={styles.container}>
          <Header>Ton Historique</Header>
        </View>
        <Button onPress={() => navigate("ScanBarCode", {
          updateHistoric: getHistoric
        })}>
          Scan
        </Button>
        <FlatList 
          data={historic}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => <HistoricItem item={item}/>}
        />
      </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});