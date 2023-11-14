import {FlatList, StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {KeranjangList, MenuList, colors} from '../Constant';

const KeranCard = () => {
    return (
      <View>
          <Text style={{fontFamily: 'Poppins', marginLeft: 25, marginTop: 10, fontWeight: 'bold'}}>KERANJANG</Text>
        <FlatList
          data={KeranjangList}
          renderItem={({item}) => (
            <View
              style={{
                backgroundColor: colors.COLOR_LIGHT,
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 4},
                shadowOpacity: 0.1,
                shadowRadius: 7,
                borderRadius: 10,
                margin: 16,
                padding : 10,
                flexDirection: "row",
              }}>
              <Image
                source={item.image}
                style={{
                  borderTopRightRadius: 10,
                  borderTopLeftRadius: 10,
                  width: 60,
                  height: 80,
                  margin: 3,
                  resizeMode: 'cover',
                }}
              />
              <Text style={{paddingLeft: 10}}>{item.name}</Text>
              <Text style={{paddingLeft: 10}}>{item.price}</Text>
            </View>
          )}
        //   numColumns={2}
        //   columnWrapperStyle={{
        //       justifyContent: "space-between",
        //       paddingHorizontal: 10,
        //   }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  };
  
  export default KeranCard;