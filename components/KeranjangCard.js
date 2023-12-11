import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { KeranjangList, MenuList, colors } from '../Constant';
import { useNavigation } from '@react-navigation/native';

const KeranCard = () => {
  return (
    <View>
      <FlatList
        data={KeranjangList}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: colors.COLOR_LIGHT,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 7,
              borderRadius: 10,
              margin: 16,
              padding: 10,
              flexDirection: "row",
            }}>
            <Image
              source={item.image}
              style={{
                borderRadius: 10,
                width: 80,
                height: 80,
                margin: 3,
                resizeMode: 'cover',
              }}
            />
            <Text
              style={{
                paddingLeft: 20,
                marginBottom: 10,
                flexDirection: "row",
                fontFamily: 'Poppins',
              }}>{item.name}
              <br></br>
              <Text style={{ color: '#528BF9' }}>{item.price}</Text>
              <br></br>
              <View style={styles.wrapperCardBottom}>
                <TouchableOpacity style={styles.button}>
                  <Text style={{ fontWeight: '300' }}>-</Text>
                </TouchableOpacity>
                <Text style={{ paddingHorizontal: 12 }}>3</Text>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.iconPlus}>+</Text>
                </TouchableOpacity>
              </View>
            </Text>
            <TouchableOpacity style={styles.buttonexit}>
              <Text style={{ fontWeight: '300' }}>x</Text>
            </TouchableOpacity>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
      {/* Tombol Pesan Sekarang */}
      <TouchableOpacity
        style={styles.pesanButton}
        onPress={() => navigation.navigate('Pesan Sekarang', { item, quantity: 3 })} >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Pesan Sekarang</Text>
      </TouchableOpacity>
    </View>
  );
};


export default KeranCard;


  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      marginBottom: 20,
    },
    pesanButton: {
      backgroundColor: '#528BF9',
      borderRadius: 10,
      margin: 16,
      padding: 10,
      alignItems: 'left',
    },
    wrapperImageCheck: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    productImage: {
      width: 80,
      height: 80,
      marginHorizontal: 10,
    },
    button: {
      borderRadius: 15,
      width: 25,
      height: 25,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor : '#F4F4F4',
    },
    buttonexit: {
      borderWidth : 0.5,
      borderRadius: 15,
      width: 15,
      height: 15,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor : '#F4F4F4',
      marginLeft: 110,
    },
    iconPlus: {
      color: 'black',
      fontWeight: '600',
    },
    wrapperCardBottom: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop : 10,
    },
  });