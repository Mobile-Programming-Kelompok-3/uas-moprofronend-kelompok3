import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'

const SearchBar = () => {
  return (
    <View style={styles.SearchFilter}>
        <Icon name="search" size={20} color= 'grey'/>
        <Text style={styles.SearchText}>SearchBar</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    SearchFilter: {
        backgroundColor: "#fff",
        flexDirection: "row",
        paddingVertical: 16,
        borderRadius: 30,
        paddingHorizontal: 16,
        marginVertical: 16,
        marginHorizontal: 16,

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 7,
    },
    SearchText: {
        marginLeft: 10,
      },
    icon: {
        marginRight: 10, // Jarak antara ikon dan teks placeholder
      },
})

export default SearchBar
