import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";

const Header = ({ setSearchQuery }) => {
  const navigation = useNavigation();
  const [searchQueryLocal, setSearchQueryLocal] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const handleSearch = () => {
    setSearchQuery(searchQueryLocal);
    // Implement your search logic here
    console.log("Searching for:", searchQueryLocal);
  };

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <ImageBackground
      style={styles.imageBackground}
      
    >
      <View style={styles.headerContainer}>
        {/* Replace text with image */}
        <Image
          source={require("../assets/logo.png")} // Specify the path to your local image
          style={styles.logoImage}
        />

        {/* Search input */}
        {isSearchVisible && (
          <View style={[styles.searchContainer, isSearchVisible && styles.activeSearchContainer]}>
            <TextInput
              style={[styles.searchInput, isSearchVisible && styles.activeSearchInput]}
              placeholder="Sakura Jeans"
              onChangeText={(text) => {
                setSearchQueryLocal(text);
                // Call search function immediately when text changes
                handleSearch();
              }}
              value={searchQueryLocal}
            />
          </View>
        )}

        {/* Search icon */}
        <TouchableOpacity onPress={toggleSearch}>
          <Icon name="search" size={20} color="#43398F" style={styles.searchIcon} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    backgroundColor: "#F3DDE0",
  },
  headerContainer: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 30,
    flexDirection: "row", // Change to row to align items horizontally
    justifyContent: "space-between", // Add space-between to separate items
    alignItems: "center",
  },
  logoImage: {
    width: 170,
    height: 50,
    alignSelf: "center",
    marginRight: 10,
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  activeSearchContainer: {
    width: 120, // Adjust the width as needed
  },
  searchIcon: {
    marginLeft: 10,
  },
  searchInput: {
    height: 40,
    flex: 1,
    backgroundColor: "white",
    borderRadius: 80,
    paddingLeft: 15,
    fontFamily: "Poppins",
    color: "gray",
    transition: "width 0.3s ease-in-out",
  },
  activeSearchInput: {
    width: "100%",
  },
});

export default Header;
