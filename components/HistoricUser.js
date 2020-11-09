import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, AsyncStorage, View } from 'react-native'
import Background from './components/BackgroundHome';
import Header from './components/Header';
import HistoricItem from './HistoricItem';
import config from "./config/config.js"
import axios from 'axios';


export default function HistoricUser({route: {params: {user}}, navigation: {navigate}}) {
  const [historic, setHistoric] = useState(null);

  useEffect(() => {
    getHistoric()
  }, []);

  const getHistoric = () => {
    axios.get(`${config.url_serv}/getSpecificUserHistoric?userId=${user.id}`)
        .then(res => {
            setHistoric(res.data.data)
        })
  }

  return (
      <Background>
        <View style={styles.container}>
          <Header>Historique de {user.username}</Header>
        </View>
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