import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const Header = () => {
  return (
    <View>
      <Image
        source={require('../assets/Dlillah-Logo.png')}
        style={styles.logo}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  logo: {
    width: 120,
    height: 40,
    marginTop: 20,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
})
export default Header