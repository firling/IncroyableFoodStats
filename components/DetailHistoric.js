import React, { useState, useEffect } from 'react';
import { StyleSheet, AsyncStorage, View, Text, Modal, TouchableHighlight, ScrollView } from 'react-native'
import Background from './components/Background';
import Paragraph from './components/Paragraph';
import Header from './components/Header';
import config from "./config/config.js"
import axios from 'axios';


export default function DetailHistoric({nomAliment, idDetail, setModalVisible}) {
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    getDetail()
  }, []);

  const getDetail = () => {
    AsyncStorage.getItem(config.STORAGE_KEY)
    .then(token => {
      axios.get(`${config.url_serv}/getDetail?aliment_id=${idDetail}&token=${token}`)
        .then(res => {
            setDetail(res.data.data)
        })
    })
  }

  return (
    <View style={styles.modalContaner}>
        <Modal
            animationType="slide"
            transparent={true}
            visible={true}
        >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>

            <TouchableHighlight 
                style={{ ...styles.openButton, backgroundColor: "#fc0303" }}
                onPress={() => {
                    setModalVisible(false);
                }}
            >
                <Text style={styles.title}>X</Text>
            </TouchableHighlight>
            <ScrollView contentContainerStyle={styles.container}>

                <Header>Détails {nomAliment}</Header>

                {
                    detail ? (
                        <>
                        <Text style={styles.title}>Ingédients</Text>
                        <Paragraph>{detail.ingredients_text_fr}</Paragraph>

                        <Text style={styles.title}>Nutrition Grade</Text>
                        <Paragraph>{detail.nutrition_grade_fr}</Paragraph>
                        
                        <Text style={styles.title}>Quantité</Text>
                        <Paragraph>{detail.quantity}</Paragraph>
                        
                        <Text style={styles.title}>Graisse saturée</Text>
                        <Paragraph>{detail.nutrient_saturated_fat}</Paragraph>
                        
                        <Text style={styles.title}>Sel</Text>
                        <Paragraph>{detail.nutrient_salt}</Paragraph>
                        
                        <Text style={styles.title}>Graisse</Text>
                        <Paragraph>{detail.nutrient_fat}</Paragraph>
                        
                        <Text style={styles.title}>Sucre</Text>
                        <Paragraph>{detail.nutrient_sugars}</Paragraph>
                        
                        <Text style={styles.title}>Nutrition Score</Text>
                        <Paragraph>{detail.nutrition_score_fr}</Paragraph>
                        
                        <Text style={styles.title}>Kcal</Text>
                        <Paragraph>{detail.energy_kcal}</Paragraph>
                        
                        <Text style={styles.title}>Kcal pour 100 grammes</Text>
                        <Paragraph>{detail.energy_kcal_100g}</Paragraph>
                        </>
                    ) : null
                }
                
                

            </ScrollView>
          </View>
        </View>
        </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    title: {
        fontWeight: "bold",
        fontSize: 25,
    },
    container: {
      alignItems: 'center',
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    buttonView: {
      margin: 10
    },
    openButton: {
      marginLeft: "auto",
      backgroundColor: "#F194FF",
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    Button: {
      backgroundColor: "#F194FF",
      marginTop: 5,
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    nameStyle: {
      fontSize: 30,
      fontWeight: "bold",
      textAlign: "center"
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });