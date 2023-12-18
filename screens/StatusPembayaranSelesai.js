import React, { useState } from "react";
import {
  Button,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

function StatusPembayaranSelesai({ navigation }) {
  const [kategori, setKategori] = useState([
    {
      keterangan: "Validasi Admin",
    },
    {
      keterangan: "Selesai",
    },
  ]);

  const [seleksiKategori, setSeleksiKategori] = useState({
    keterangan: "Validasi Admin",
  });

  const [dataBarang, setDataBarang] = useState([
    {
      name: "Pure Centella Acne Calming Toner",
      price: "Rp.116.000",
      date: "1 Nov 2023",
      image: "https://i.ibb.co/z8M19Z0/toner.png",
    },
    {
      name: "Skintific Ceramide",
      price: "Rp.115.000",
      date: "14 Nov 2023",
      image: "https://i.ibb.co/MVgsZsp/gambar-produk.png",
    },
  ]);

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      <View style={{ flexDirection: "row" }}>
        {/* Menambahkan item kosong untuk membuat ruang
                <View style={{ flex: 1 }} /> */}

        <TouchableOpacity
          onPress={() => navigation.navigate("Status Pembayaran")}
          style={{
            flex: 1,
            backgroundColor: "#FFFFFF",
            elevation: 3,
            paddingVertical: 20,
          }}
        >
          <Text style={{ color: "#000000", fontFamily: "Poppins", textAlign: "center" }}>
            Validasi Admin
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "#04B4A2",
            elevation: 3,
            paddingVertical: 20,
          }}
        >
          <Text style={{ color: "#FFFFFF", fontFamily: "Poppins", textAlign: "center" }}>Selesai</Text>
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
                paddingHorizontal: 20, // Mengurangi padding agar muat dalam layout
                paddingVertical: 5,
                flexDirection: "row", // Mengatur layout secara horizontal
                alignItems: "center", // Untuk mengatur vertikal alignment
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
                  style={{ color: "#212121", fontFamily: "Poppins", fontSize: 14, fontWeight: "bold" }}
                >
                  {item.name}
                </Text>
                <Text
                  style={{
                    color: "#212121",
                    fontFamily: "Poppins",
                    fontSize: 14,
                    fontWeight: "normal",
                  }}
                >
                  {item.date}
                </Text>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Text
                  style={{ color: "#04B4A2", fontFamily: "Poppins", fontSize: 18, fontWeight: "bold" }}
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

export default StatusPembayaranSelesai;