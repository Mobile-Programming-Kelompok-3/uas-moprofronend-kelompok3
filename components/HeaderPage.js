import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function HeaderPage({ title }) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 80,
    backgroundColor: "#43398F",
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  }
});

export default HeaderPage;
