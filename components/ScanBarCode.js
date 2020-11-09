import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert, AsyncStorage } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios';
import config from "./config/config.js"
import Toast from 'react-native-toast-message';

export default function ScanBarCode({route, navigation: {navigate}}) {
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {

    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
    
    (async () => {
      AsyncStorage.getItem(config.STORAGE_KEY)
        .then(token => {
          setUserToken(token);
        })
    })();

  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    var product = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${data}.json`);
    var name = product.data.product.product_name
    var id = data
    var img = product.data.product.selected_images.front.display.fr
    //alert(`Product ${product.data.product.product_name}!`);
    Alert.alert(
      "Product Found!",
      `Voulez-vous enregistrer le produit ${product.data.product.product_name}?`,
      [
        {
          text: 'No',
          onPress: () => console.log('No')
        },
        {
          text: "Yes", 
          onPress: () => {
            axios.post(`${config.url_serv}/storeHistoric`, {
              token: userToken,
              aliment: name,
              idAliment: id,
              urlAliment: img
            }).then(res => {
              Toast.show({
                type: 'success',
                text1: 'Success',
                text2: `Product saved!`,
                visibilityTime: 4000,
              });
              route.params.updateHistoric()
              navigate("Home")
            }).catch(err => {
              Toast.show({
                type: 'error',
                text1: 'Error',
                text2: `Error while saving the product, please contact devs`,
                visibilityTime: 4000,
              })
            })
          }
        }
      ]
    )
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}
