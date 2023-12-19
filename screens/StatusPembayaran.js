import React, { useEffect, useState } from "react";
import {
  Button,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Image,
} from "react-native";



function StatusPembayaran({ navigation, userId }) {
  
  
  const [kategori, setKategori] = useState([
    {
      keterangan: "Validasi Admin",
    },
    {
      keterangan: "Selesai",
    },
  ]);

  console.log(userId);
  const [seleksiKategori, setSeleksiKategori] = useState({
    keterangan: "Validasi Admin",
  });

  const [dataBarang, setDataBarang] = useState([]);

  useEffect(() => {
    fetchData(); // Mengambil data transaksi saat komponen di-mount
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/transaksibelum/${userId}`);
      console.log("Response status:", response.status); // Log HTTP status
  
      const data = await response.json();
      console.log("Fetched data:", data); // Log fetched data
  
      setDataBarang(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const findProductById = (productId) => {
    return dataBarang.produk.find((product) => product.id === productId);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      
      <View style={{ flexDirection: "row" }}>

        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "#04B4A2",
            elevation: 3,
            paddingVertical: 20,
          }}
        >
          <Text style={{ color: "#FFFFFF", fontFamily: "Poppins", textAlign: "center" }}>
            Validasi Admin
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Status Pembayaran Selesai")}
          style={{
            flex: 1,
            backgroundColor: "#FFFFFF",
            elevation: 3,
            paddingVertical: 20,
          }}
        >
          <Text style={{ color: "#000000", fontFamily: "Poppins", textAlign: "center" }}>Selesai</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }}>
        <FlatList
          /*yg list riwayat pesanan*/
          data={dataBarang.transactions}
          showsVerticalScrollIndicator={false}
          style={{ fontSize: 1 }}
          renderItem={({ item }) => {
            const product = findProductById(item.produk_id);
            return (
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
                source={{ uri: product ? product.gambar : defaultImage }}
              />
              <View style={{ flex: 1 }}>
                <Text
                  style={{ color: "#212121", fontFamily: "Poppins", fontSize: 14, fontWeight: "bold" }}
                >
                  {product ? product.name : "Product not found"}
                </Text>
                <Text
                  style={{
                    color: "#212121",
                    fontFamily: "Poppins",
                    fontSize: 14,
                    fontWeight: "normal",
                  }}
                >
                  jumlah pesanan : {item.total_pesanan}
                </Text>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Text
                  style={{ color: "#04B4A2", fontFamily: "Poppins", fontSize: 18, fontWeight: "bold" }}
                >
                  Rp. {item.total_harga}
                </Text>
                <Text
                  style={{ color: "#04B4A2", fontFamily: "Poppins", fontSize: 12, fontWeight: "medium" }}
                >
                  validasi admin: {item.status}
                </Text>
              </View>
             
            </TouchableOpacity>
            
            );
          }}
        />
      </View>
    </View>
  );
}

export default StatusPembayaran;