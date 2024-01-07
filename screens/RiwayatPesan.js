import React, { useEffect, useState } from "react";
import {
  Button,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Image,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import HeaderPage from "../components/HeaderPage";
import axios from "axios";

function RiwayatPesan({ navigation, userId }) {
  const [kategori, setKategori] = useState([
    {
      keterangan: "Dalam Proses",
    },
    {
      keterangan: "Sudah Diterima",
    },
  ]);

  const [seleksiKategori, setSeleksiKategori] = useState({
    keterangan: "Dalam Proses",
  });

  const [dataBarang, setDataBarang] = useState([]);

  useEffect(() => {
    fetchData(); // Mengambil data transaksi saat komponen di-mount
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/prosesbelum/${userId}`);
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

  const handleselesai = async (transactionId) => {
    try {
      // Panggil API atau lakukan permintaan untuk mengubah status proses menjadi "Selesai"
      const response = await axios.put(
        `http://127.0.0.1:8000/transaksi/${transactionId}`,
        {
          statusproses: 1,
        }
      );

      if (response.ok) {
        // Jika perubahan status berhasil, perbarui dataBarang dengan status yang diperbarui
        const updatedData = dataBarang.map((transaction) =>
          transaction.id === transactionId ? { ...transaction, status: 1 } : transaction
        );
        setDataBarang(updatedData);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

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
              fontFamily: "Poppins",
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
              fontFamily: "Poppins",
              textAlign: "center",
            }}
          >
            Sudah Diterima
          </Text>
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
            if (item.statusproses === 1) {
              // Jika status pesanan sudah "Selesai", return null untuk tidak merender item
              return null;
            }
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate("Hasil Transaksi", { data: item })}
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
                  source={{ uri: product ? product.gambar : defaultImage }}
                />
                <View style={{ flex: 1 }}>
                  <Text
                    style={{ color: "#212121", fontFamily: "Poppins", fontSize: 14, fontWeight: "bold" }}
                  >
                    {product.name}
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
                    style={{ color: "#43398F", fontFamily: "Poppins", fontSize: 18, fontWeight: "bold" }}
                  >
                    Rp. {item.total_harga}
                  </Text>
                  <TouchableOpacity
                    onPress={() => handleselesai(item.id)}
                    style={{
                      backgroundColor: "#43398F",
                      elevation: 3,
                      padding: 2,
                      margin: 20,
                    }}
                  >
                    <Text
                      style={{
                        color: "#FFFFFF",
                        fontFamily: "Poppins",
                        textAlign: "center",
                      }}
                    >
                      Barang diterima
                    </Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          }}
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
