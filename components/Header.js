import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';


const Header = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Hi, Pengguna</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#04B4A2',
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontFamily: 'Poppins',
    fontSize: 20,
    color: 'white',
  },
  chatIconContainer: {
    backgroundColor: '#528BF9',
    borderRadius: 25,
    padding: 10,
  },
  chatIcon: {
    color: 'white',
    fontSize: 20,
  },
});

export default Header;
