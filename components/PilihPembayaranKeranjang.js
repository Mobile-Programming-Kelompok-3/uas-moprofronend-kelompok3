import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const PilihPembayaranKeranjang = ({ navigation, route, userId }) => {
  const { item, totalPayment } = route.params;
  const [recipientAddress, setRecipientAddress] = useState('');
  const [paymentProof, setPaymentProof] = useState(null); // State untuk bukti pembayaran
  const [voucher, setVoucher] = useState('');
  const [notes, setNotes] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [itemjumlah, setItemJumlah] = useState(0);

  const [newTotalPayment, setNewTotalPayment] = useState(totalPayment);


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

  const handleRefresh = () => {
    // Logika validasi voucher
    if (voucher === 'DISKON10') { // Ganti 'kode_voucher_benar' dengan kode voucher yang benar
      const discount = totalPayment * 0.5; // Misalnya, potongan harga
      const newTotalPayment = totalPayment - discount;
      // Set state totalPayment dengan nilai baru setelah diskon
      setNewTotalPayment(newTotalPayment);
    }
    // Lakukan hal lain yang diperlukan setelah validasi voucher
    // Misalnya, refresh halaman atau perbarui state lainnya
  };

  const findProductById = (productId) => {
    return item.produk.find((product) => product.id === productId);
  };

  const handleBayar = async () => {
    navigation.navigate('Pesan Keranjang',
      { item, newTotalPayment, voucher }
    );
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#F3DDE0' }}>
      <View style={styles.container}>
        {item.keranjang.map((cartItem, index) => {
          const product = findProductById(cartItem.produk_id); // Use cartItem to find the corresponding product
          return (
            <View key={index} style={{ marginTop: 20, }}>
              <Image
                source={{ uri: product?.gambar }}
                style={{
                  width: '90%',
                  height: 200,
                  resizeMode: 'cover',
                  borderTopLeftRadius: 16,
                  alignSelf: 'center',
                  borderTopRightRadius: 16,
                }}
              />
              <Text style={styles.productName}>{product?.name}</Text>
              <Text style={styles.productPrice}>Harga Barang: Rp. {product?.harga}</Text>
              <Text style={styles.totalOrder}>Total Pesanan: {cartItem?.jumlah}</Text>
            </View>
          );
        })}
        <Text style={styles.productName}>Total Harga: {totalPayment}</Text>
        <Text style={styles.label}>Metode Pembayaran</Text>
        <Text style={styles.totalOrder}>BNI : 13887970</Text>
        <Text style={styles.totalOrder}>Mandiri : 13887970</Text>
        <Text style={styles.totalOrder}>BRI : 13887970</Text>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#4A4093', margin: 16, marginTop: 20, }}>Voucher Diskon</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputDiscount}
            placeholder="Masukkan voucher diskon"
            value={voucher}
            onChangeText={(text) => setVoucher(text)}
          />
          <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
            <Text style={styles.refreshButtonText}>Refresh</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.bayarButton} onPress={handleBayar}>
          <Text style={styles.bayarButtonText}>Bayar: {newTotalPayment}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3DDE0',
    padding: 16,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A4093',
    margin: 16,
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 16,
    marginBottom: 5,
    marginLeft: 16,
    color: '#4A4093'
  },
  totalOrder: {
    fontSize: 16,
    marginBottom: 5,
    marginLeft: 16,
    color: '#4A4093'
  },
  label: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A4093',
    margin: 16,
    marginTop: 20,
  },
  inputDiscount: {
    height: 40,
    flex: 1,
    borderRadius: 10,
    backgroundColor: "white",
    marginTop: 5,
    padding: 15,
    fontFamily: "Poppins",
    color: "gray",
    marginBottom: 10,
    transition: "width 0.3s ease-in-out",
  },
  refreshButton: {
    backgroundColor: 'lightblue',
    flex: 1,
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    fontFamily: "Poppins",
  },
  refreshButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
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
    backgroundColor: "#43398F",
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

export default PilihPembayaranKeranjang;
