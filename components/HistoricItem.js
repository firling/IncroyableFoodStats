import React, { useState } from 'react';
import { StyleSheet, Text, ScrollView, Image, View, TouchableOpacity  } from 'react-native'
import moment from 'moment'
import DetailHistoric from './DetailHistoric';

export default function HistoricItem({item}) {
    const [modalVisible, setModalVisible] = useState(false);

    return (
      <TouchableOpacity style={styles.main_container} onPress={() => setModalVisible(true)}>
        <Image
          style={styles.image}
          source={{uri: item.urlAliment}}
        />
        <View style={styles.content_container}>
            <View style={styles.header_container}>
                <Text style={styles.title_text}>{item.aliment}</Text>
            </View>
            <View style={styles.date_container}>
              <Text style={styles.date_text}>Le {moment(new Date(item.date)).format('DD/MM/YYYY')}</Text>
            </View>
        </View>
        {
          modalVisible ? <DetailHistoric nomAliment={item.aliment} idDetail={item.id} setModalVisible={(val) => setModalVisible(val)}/> : null
        }
      </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  main_container: {
    height: 190,
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  image: {
    width: 120,
    height: 180,
    margin: 5
  },
  content_container: {
    flex: 1,
    margin: 5
  },
  header_container: {
    flex: 3,
    flexDirection: 'row'
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 5
  },
  vote_text: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#666666'
  },
  description_container: {
    flex: 7
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666'
  },
  date_container: {
    flex: 1
  },
  date_text: {
    textAlign: 'right',
    fontSize: 14
  }
})