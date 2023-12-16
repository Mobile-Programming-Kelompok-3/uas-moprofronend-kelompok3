import React, { useState, useEffect } from "react";
import {
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const MenuCard = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [MenuList, setMenuList] = useState([]);
  const [filteredMenu, setFilteredMenu] = useState(MenuList);
  

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/produksend')
      .then(response => {
        console.log(response.data); // Data dari server Laravel
        setMenuList(response.data);
        setFilteredMenu(response.data);
      })
      .catch(error => {
        console.error(error);
        // Tambahkan log atau notifikasi error jika perlu
      });
  }, []);
  
  

  useEffect(() => {
    // Filter the menu items based on the search query
    const filteredItems = MenuList.filter((item) =>
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
          borderColor: "gray",
          borderWidth: 1,
          borderRadius: 8,
          margin: 10,
          paddingLeft: 10,
          fontFamily: "Poppins",
        }}
        placeholder="Search..."
        onChangeText={(text) => setSearchQuery(text)}
        value={searchQuery}
      />

      <Text
        style={{
          fontFamily: "Poppins",
          marginLeft: 25,
          marginTop: 10,
          fontWeight: "bold",
        }}
      >
        Makanan
      </Text>
      <FlatList
        data={filteredMenu}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Product Detail", { item })}
          >
            <View
              style={{
                backgroundColor: "#ffffff",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 7,
                borderRadius: 16,
                marginVertical: 16,
                paddingHorizontal: 8,
                paddingVertical: 20,
                position: "relative",
              }}
            >
              <Image
                source={{uri:item.gambar}}
                style={{
                  borderTopRightRadius: 16,
                  borderTopLeftRadius: 16,
                  width: 130,
                  height: 140,
                  margin: 10,
                  resizeMode: "cover",
                }}
              />
              <Text style={{ paddingLeft: 10, fontFamily: "Poppins" }}>
                {item.name}
              </Text>
              {/* Adjusted the text style for price */}
              <Text
                style={{
                  paddingLeft: 10,
                  color: "#04B4A2",
                  fontFamily: "Poppins",
                }}
              >
                Rp. {item.harga}
              </Text>
              {/* Add the small shopping cart button */}
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Keranjang");
                }}
                style={{
                  position: "absolute",
                  bottom: 5,
                  right: 8,
                  backgroundColor: "#04B4A2", // Changed the button color
                  borderRadius: 100,
                  padding: 5,
                }}
              >
                {/* Changed the color of the cart icon to white */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                  class="w-6 h-6"
                  style={{
                    width : 18,
                  }}
                >
                  <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                </svg>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
          paddingHorizontal: 10,
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default MenuCard;
