import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, AsyncStorage, View, TouchableOpacity, Text } from 'react-native';
import Background from './components/Background';
import Header from './components/Header';
import TextInput from './components/TextInput';
import HistoricUser from './HistoricUser';
import config from "./config/config.js";
import axios from 'axios';


export default function Recherche({navigation: {navigate}}) {
    const [recherche, setRecherche] = useState("");
    const [profiles, setProfiles] = useState(null);
    const [userToken, setUserToken] = React.useState(null);

    useEffect(() => {
        (async () => {
            const token = await AsyncStorage.getItem(config.STORAGE_KEY);
            setUserToken(token);
        })();
    }, []);

    const fetchProfiles = (text) => {
        setRecherche(text)
        if (text.length < 3) return;
        axios.get(`${config.url_serv}/getProfiles?token=${userToken}&recherche=${recherche}`)
            .then(res => {
                setProfiles(res.data.data);
            })
    }

    return (
        <Background>
            <Header>Rechercher Un Profile</Header>
            <TextInput
                label="Recherche"
                returnKeyType="next"
                value={recherche}
                onChangeText={text => fetchProfiles(text)}
                autoCapitalize="none"
            />
            <FlatList
                data={profiles}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    <TouchableOpacity style={styles.main_container} onPress={() => navigate("HistoricUser", {
                        user: item
                    })}>
                        <View style={styles.container}>
                            <Text style={styles.description_text}>{item.username}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </Background>
    );
}

const styles = StyleSheet.create({
    main_container: {
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    container: {
    },
    description_text: {
        fontWeight: 'bold',
        fontSize: 26,
        color: '#414757'
    },
});