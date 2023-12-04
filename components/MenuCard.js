import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MenuList, colors } from '../Constant';

const MenuCard = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMenu, setFilteredMenu] = useState(MenuList);

  useEffect(() => {
    // Filter the menu items based on the search query
    const filteredItems = MenuList.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredMenu(filteredItems);
  }, [searchQuery]);

  return (
    <View>
      {/* Search Bar */}
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          borderRadius: 8,
          margin: 10,
          paddingLeft: 10,
          fontFamily: 'Poppins',
        }}
        placeholder="Search..."
        onChangeText={text => setSearchQuery(text)}
        value={searchQuery}
      />

      <Text style={{ fontFamily: 'Poppins', marginLeft: 25, marginTop: 10, fontWeight: 'bold' }}>
        Product Of View
      </Text>
      <FlatList
        data={filteredMenu}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("Product Detail", { item })}>
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
                position: 'relative',
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
              <Text style={{ paddingLeft: 10, fontFamily: 'Poppins' }}>{item.name}</Text>
              {/* Adjusted the text style for price */}
              <Text style={{ paddingLeft: 10, color: '#528BF9', fontFamily: 'Poppins' }}>{item.price}</Text>
              {/* Add the small shopping cart button */}
              <TouchableOpacity
                onPress={() => { navigation.navigate("Keranjang"); }}
                style={{
                  position: 'absolute',
                  bottom: 5,
                  right: 5,
                  backgroundColor: '#528BF9', // Changed the button color
                  borderRadius: 10,
                  padding: 5,
                }}
              >
                {/* Changed the color of the cart icon to white */}
                <Text style={{ color: 'white' }}>🛒</Text>
              </TouchableOpacity>
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

export default MenuCard;
