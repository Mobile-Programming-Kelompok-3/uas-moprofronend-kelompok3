import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

const HasilTransaksi = ({ route, navigation }) => {
  const { data } = route.params;
  const [productName, setProductName] = useState('');

  useEffect(() => {
    const fetchProductById = async (productId) => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/produksend/${productId}`);
        const productData = response.data;
        setProductName(productData.name);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProductById(data.produk_id);
  }, [data.produk_id]);

  const handleBackToHome = () => {
    navigation.navigate(); // Kembali ke halaman sebelumnya (home)
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transaksi Detail</Text>
      <Text style={styles.subtitle}>ID Transaksi: {data.id}</Text>

      <View style={styles.productList}>
        <Text style={styles.productTitle}>Pembelian Produk:</Text>
        <View style={styles.productItem}>
          <Text style={styles.productItem}>{productName}</Text>
          <Text style={styles.productItem}>jumlah: {data.total_pesanan}</Text>
          <Text style={styles.productItem}>tanggal pemesanan: {data.tanggal_pemesanan}</Text>
        </View>
      </View>

      <Text style={styles.total}>Total Harga: {data.total_harga}</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Menu")}>
        <Text style={styles.buttonText}>Kembali ke Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F3DDE0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A4093',
    margin: 16,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4A4093',
    margin: 16,
    marginTop: 5,
  },
  productList: {
    marginBottom: 20,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A4093',
    margin: 16,
    marginTop: 20,
  },
  productItem: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4A4093',
    marginLeft: 10,
    marginTop: 3,
  },
  total: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A4093',
    margin: 16,
    marginTop: 20,
  },
  button: {
    backgroundColor: '#4A4093',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HasilTransaksi;
