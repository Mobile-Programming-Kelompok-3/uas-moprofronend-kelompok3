import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const PesanKeranjang = ({ navigation, route, userId }) => {
  const { item, totalPayment } = route.params;
  const [recipientAddress, setRecipientAddress] = useState('');
  const [paymentProof, setPaymentProof] = useState(null); // State untuk bukti pembayaran
  const [notes, setNotes] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [itemjumlah, setItemJumlah] = useState(0);
  useEffect(() => {
    // Fetch user profile data from the backend
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/profils/${userId}`);
        const userData = response.data.user;
        setRecipientAddress(userData.alamat);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  useEffect(() => {
    const totalItems = item.keranjang.reduce((total, cartItem) => total + cartItem.jumlah, 0);
    console.log(totalItems);
    setItemJumlah(totalItems);
  }, [item.keranjang]);

  const handleDateChange = (date) => {
    setOrderDate(date);
  };

  const selectImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        const gambar = result.assets ? result.assets[0].uri : result.uri;
        console.log(gambar);
        setPaymentProof(gambar); // Perbarui state paymentProof dengan URI gambar terpilih
      }
      console.log(paymentProof);
    } catch (error) {
      console.log(error);
    }
  };
  const extractFirstProdukId = () => {
    if (item.keranjang.length > 0) {
      return item.keranjang[0].produk_id; // Get the produk_id from the first item in keranjang
    }
    return null; // Return null if keranjang is empty
  };
  const handleBayar = async () => {
    try {
      const firstProdukId = extractFirstProdukId();
      const response = await axios.post(`http://127.0.0.1:8000/transaksi/${userId}`, {
        produk_id: firstProdukId,
        total_pesanan: itemjumlah,
        total_harga: totalPayment,
        catatan: notes,
        bukti_pembayaran: paymentProof,
        tanggal_pemesanan: orderDate.toISOString().split("T")[0],
        alamat_penerima: recipientAddress,
        user_id: userId,
        status: 0,
      });

      if (response.status === 200 || response.status === 201) {
        await axios.delete(`http://127.0.0.1:8000/keranjangs/${userId}`);
        console.log('Data transaksi berhasil dikirim:', response.data);
        navigation.navigate('Hasil Transaksi', response.data);
      } else {
        // Handle unsuccessful post request
        console.error('Error saat mengirim data transaksi:', response);
      }
      // Lakukan sesuatu setelah berhasil mengirim data, seperti navigasi atau tindakan lainnya
      console.log('Data transaksi berhasil dikirim:', response.data);
      navigation.navigate('Hasil Transaksi',
        response.data,
      );
    } catch (error) {
      console.error('Error saat mengirim data transaksi:', error);
    }
  };
  const findProductById = (productId) => {
    return item.produk.find((product) => product.id === productId);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.container}>
        {item.keranjang.map((cartItem, index) => {
          const product = findProductById(cartItem.produk_id); // Use cartItem to find the corresponding product
          return (
            <View key={index}>
              <Image
                source={{ uri: product?.gambar }}
                style={{
                  width: "100%",
                  height: 300,
                  resizeMode: "cover",
                }}
              />
              <Text style={styles.productName}>{product?.name}</Text>
              <Text style={styles.productPrice}>Rp. {product?.harga}</Text>
              <Text style={styles.totalOrder}>Total Pesanan: {cartItem?.jumlah}</Text>

            </View>
          );
        })}
        <Text style={styles.totalOrder}>Total Harga: {totalPayment}</Text>
        <Text style={styles.label}>Alamat Penerima</Text>
        <TextInput
          style={styles.input}
          placeholder="Masukkan alamat penerima"
          value={recipientAddress}
          onChangeText={(text) => setRecipientAddress(text)}
        />
        <Text style={styles.label}>Bukti Pembayaran</Text>
        <View style={styles.imageInputContainer}>
          {paymentProof && <Image source={{ uri: paymentProof }} style={styles.paymentProofImage} />}
          <TouchableOpacity onPress={selectImage}>
            <Text style={styles.selectImageButton}>Pilih Gambar</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.label}>Catatan</Text>
        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Catatan"
          multiline
          value={notes}
          onChangeText={(text) => setNotes(text)}
        />

        <DatePicker
          selected={orderDate}
          onChange={handleDateChange}
          placeholderText="Pilih Tanggal Pemesanan"
          dateFormat="yyyy-MM-dd"
          todayButton="Hari Ini"
          style={styles.input} // Apply the input styles to the DatePicker
          showYearDropdown
          showMonthDropdown
          dropdownMode="select"
        />

        {orderDate && (
          <Text style={styles.selectedDateText}>
            Tanggal Pemesanan: {orderDate.toISOString().split("T")[0]}
          </Text>
        )}

        <TouchableOpacity style={styles.bayarButton} onPress={handleBayar}>
          <Text style={styles.bayarButtonText}>Bayar: {totalPayment}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  productPrice: {
    fontSize: 18,
    marginBottom: 10,
  },
  totalOrder: {
    fontSize: 16,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 20,
    fontSize: 16,
  },
  bayarButton: {
    backgroundColor: "#04B4A2",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
  },
  bayarButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
  },
  selectedDateText: {
    fontSize: 16,
    marginTop: 10,
  }, imageInputContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  paymentProofImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },
  selectImageButton: {
    fontSize: 16,
    color: 'blue',
  },
});

export default PesanKeranjang;
