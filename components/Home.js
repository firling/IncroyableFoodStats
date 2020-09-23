import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native'


export default function Home() {
  return (
    <View style={styles.container}>
        <Text style={styles.baseText}>
          FIAK
        </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  baseText: {
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
