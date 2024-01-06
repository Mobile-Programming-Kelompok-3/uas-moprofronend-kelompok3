import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { colors } from '../Constant';
import axios from 'axios';

function KeranjangScreen({ navigation, userId }) {
  const [keranjangList, setKeranjangList] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchData(); // Fetch transaction data when the component mounts
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/keranjang/${userId}`);
      console.log("Response status:", response.status); // Log HTTP status

      const data = await response.json();
      console.log("Fetched data:", data); // Log fetched data

      setKeranjangList(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const Deletekeran = async (itemId) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/keranjang/${itemId}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('keranjang berhasil:', response.data);
      fetchData();
    } catch (error) {
      console.error('keranjang gagal:', error);
    }
  };

  const calculateTotalPrice = () => {
    // Calculate total price of products in the cart
    let totalPrice = 0;
    keranjangList.keranjang.forEach((item) => {
      const product = findProductById(item.produk_id);
      totalPrice += product.harga * item.jumlah;
    });
    return totalPrice;
  };

  const findProductById = (productId) => {
    return keranjangList.produk.find((product) => product.id === productId);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <FlatList
          data={keranjangList.keranjang}
          renderItem={({ item }) => {
            const product = findProductById(item.produk_id);
            return (
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
                }}
              >
                <Image
                  source={product.gambar}
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
                  }}
                >
                  {product.name}
                  <br></br>
                  <Text style={{ color: '#528BF9' }}>Rp. {product.harga}</Text>
                  <br></br>
                  <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                    <Text style={{ fontSize: 14, marginHorizontal: 10 }}>Jumlah item: {item.jumlah}</Text>
                  </View>
                </Text>
                <TouchableOpacity onPress={() => Deletekeran(item.id)} style={styles.buttonexit}>
                  <Text style={{ fontWeight: '300' }}>x</Text>
                </TouchableOpacity>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
        />
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          const totalPrice = calculateTotalPrice();
          navigation.navigate("Pilih Pembayaran Keranjang", { item: keranjangList, totalPayment: totalPrice })
        }}
        style={{
          flex: 1,
          backgroundColor: '#FBFF3D',
          borderRadius: 25,
          marginHorizontal: 10,
          // borderBlockColor: 'white',
          paddingVertical: 24,
        }}
      >
        <Text style={{ color: '#4A4093', textAlign: 'center', fontSize: 16, fontWeight: 'bold', }}>Pesan Sekarang</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={styles.pesanButton}
        onPress={() => {
          const totalPrice = calculateTotalPrice();
          navigation.navigate('Pesan Keranjang', { item: keranjangList, totalPayment: totalPrice });
        }}
      >
        <Text style={{ color: "#43398F", fontSize: 15, fontWeight: 'bold' }}>Pesan Sekarang</Text>
      </TouchableOpacity> */}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#F3DDE0',
  },
  pesanButton: {
    backgroundColor: "yellow",
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16,
  },
});

export default KeranjangScreen;
