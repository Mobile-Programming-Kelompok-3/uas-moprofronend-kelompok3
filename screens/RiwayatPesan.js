import React, { useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

function RiwayatPesan({ navigation }) {
  const [kategori, setKategori] = useState([
    {
      keterangan: "Dalam Proses",
    },
    {
      keterangan: "Sudah Bayar",
    },
  ]);

  const [seleksiKategori, setSeleksiKategori] = useState({
    keterangan: "Dalam Proses",
  });

  const [dataBarang, setDataBarang] = useState([
    {
      name: "Skinny Jeans",
      price: "Rp.130.000",
      date: "9 Des 2023",
      image: require("../assets/skinny.png"),
    },
    {
      name: "Cutbray Sakura",
      price: "Rp.150.000",
      date: "19 Des 2023",
      image: require("../assets/cutbray.png"),
    },
  ]);

  return (
    <View style={{ flex: 1, backgroundColor: "#F3DDE0" }}>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "#43398F",
            elevation: 3,
            paddingVertical: 20,
          }}
        >
          <Text
            style={{
              color: "#FFFFFF",
              textAlign: "center",
            }}
          >
            Dalam Proses
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Riwayat Pesan Sudah Bayar")}
          style={{
            flex: 1,
            backgroundColor: "#FFFFFF",
            elevation: 3,
            paddingVertical: 20,
          }}
        >
          <Text
            style={{
              color: "#000000",
              textAlign: "center",
            }}
          >
            Sudah Bayar
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }}>
      <FlatList
          /*yg list riwayat pesanan*/
          data={dataBarang}
          showsVerticalScrollIndicator={false}
          style={{ fontSize: 1 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                backgroundColor: "#FFFFFF",
                elevation: 3,
                marginBottom: 10,
                marginVertical: 16,
                marginHorizontal: 15,
                paddingHorizontal: 20, // Mengurangi padding agar muat dalam layout
                paddingVertical: 5,
                flexDirection: "row", // Mengatur layout secara horizontal
                alignItems: "center", // Untuk mengatur vertikal alignment
                borderRadius: 15,
              }}
            >
              <Image
                style={{
                  width: 50,
                  height: 50,
                  resizeMode: "cover",
                  marginRight: 10, // Jarak antara gambar dan teks
                }}
                source={{ uri: item.image }}
              />
              <View style={{ flex: 1 }}>
                <Text
                  style={{ color: "#212121", fontSize: 14, fontWeight: "bold" }}
                >
                  {item.name}
                </Text>
                <Text
                  style={{
                    color: "#212121",
                    fontSize: 14,
                    fontWeight: "normal",
                  }}
                >
                  {item.date}
                </Text>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Text
                  style={{ color: "#43398F", fontSize: 18, fontWeight: "bold" }}
                >
                  {item.price}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    marginLeft: 10,
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  // ... tambahkan gaya lain yang diperlukan di sini
});

export default RiwayatPesan;
