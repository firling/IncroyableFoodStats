import React, { useState, useEffect } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  AsyncStorage
} from "react-native";
import config from "./config/config.js"
import axios from 'axios';

const App = ({visible, setModalVisible, profile, navigate, visitable, autorise}) => {

  const addAuto = () => {
    AsyncStorage.getItem(config.STORAGE_KEY)
    .then(token => {
      axios.post(`${config.url_serv}/addAutorisation`, {
        token,
        autoriseId: profile.id,
      })
        .then(res => {
            visitable = res.data.data
        })
    })
  }
  
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>

            <TouchableHighlight 
                style={{ ...styles.openButton, backgroundColor: "#fc0303" }}
                onPress={() => {
                    setModalVisible(!visible);
                }}
            >
                <Text style={styles.textStyle}>X</Text>
            </TouchableHighlight>

            <View style={styles.buttonView}>

                <Text style={styles.nameStyle}>{profile.username}</Text>

                <TouchableHighlight 
                    style={{ ...styles.Button, backgroundColor: !visitable ? "#212121" : "#2196F3" }}
                    disabled={!visitable}
                    onPress={() => navigate("HistoricUser", {
                      user: profile
                    })}
                >
                    <Text style={styles.textStyle}>Afficher le Profil</Text>
                </TouchableHighlight>

                <TouchableHighlight 
                    style={{ ...styles.Button, backgroundColor: !autorise ? "#212121" : "#2196F3" }}
                    disabled={!autorise}
                    onPress={() => {
                      addAuto()
                    }}
                >
                    <Text style={styles.textStyle}>Autoriser le Profil</Text>
                </TouchableHighlight>

            </View>

          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
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

export default App;