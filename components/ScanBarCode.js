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

    var ingredients_text_fr = product.data.product.ingredients_text_fr
    var nutrient_sugars = product.data.product.nutrient_levels.sugars
    var nutrient_fat = product.data.product.nutrient_levels.fat
    var nutrient_saturated_fat = product.data.product.nutrient_levels["saturated-fat"]
    var nutrient_salt = product.data.product.nutrient_levels.salt
    var nutrition_grade_fr = product.data.product.nutrition_grade_fr
    var nutrition_score_fr = product.data.product.nutriscore_score
    var energy_kcal = product.data.product.nutriments["energy-kcal"]
    var energy_kcal_100g = product.data.product.nutriments["energy-kcal_100g"]
    var quantity = product.data.product.quantity


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
              urlAliment: img,

              ingredients_text_fr,
              nutrient_sugars,
              nutrient_fat,
              nutrient_saturated_fat,
              nutrient_salt,
              nutrition_grade_fr,
              nutrition_score_fr,
              energy_kcal,
              energy_kcal_100g,
              quantity
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
