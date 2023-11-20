// MenuCard.js
import React from 'react';
import { FlatList, View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MenuList, colors } from '../Constant';
import ProductDetail from './ProductDetail';


const MenuCard = () => {
  const navigation = useNavigation();

  const handleProductClick = (item) => {
    navigation.navigate('ProductDetail', { item });
  };

  return (
    <View>
      <Text style={{ fontFamily: 'Poppins', marginLeft: 25, marginTop: 10, fontWeight: 'semi-bold' }}>
        Product Of View
      </Text>
      <FlatList
        data={MenuList}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleProductClick(item)}>
            <View
              style={{
                backgroundColor: colors.COLOR_LIGHT,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 7,
                borderRadius: 16,
                marginVertical: 16,
                paddingHorizontal: 8,
                paddingVertical: 20,
              }}>
              <Image
                source={item.image}
                style={{
                  borderTopRightRadius: 16,
                  borderTopLeftRadius: 16,
                  width: 130,
                  height: 140,
                  margin: 10,
                  resizeMode: 'cover',
                }}
              />
              <Text style={{ paddingLeft: 10 }}>{item.name}</Text>
              <Text style={{ paddingLeft: 10 }}>{item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          paddingHorizontal: 10,
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default MenuCard;