import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const PilihPembayaran = ({ navigation, route, userId }) => {
  const { item, quantity } = route.params;
  const [recipientAddress, setRecipientAddress] = useState('');
  const [paymentProof, setPaymentProof] = useState(null); // State untuk bukti pembayaran
  const [voucher, setVoucher] = useState('');
  const [notes, setNotes] = useState('');
  const [orderDate, setOrderDate] = useState('');

  const [totalPayment, setTotalPayment] = useState(item.harga * quantity);

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
        handleSubmit(result.uri); // Panggil fungsi handleSubmit dengan URI gambar
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBayar = async () => {
    navigation.navigate('Pesan Sekarang',
      { item, quantity, voucher: voucher, }
    );
  };

  const handleRefresh = () => {
    // Logika validasi voucher
    if (voucher === 'DISKON10') { // Ganti 'kode_voucher_benar' dengan kode voucher yang benar
      const discount = totalPayment * 0.5; // Misalnya, potongan harga
      const newTotalPayment = totalPayment - discount;
      // Set state totalPayment dengan nilai baru setelah diskon
      setTotalPayment(newTotalPayment);
    }
    // Lakukan hal lain yang diperlukan setelah validasi voucher
    // Misalnya, refresh halaman atau perbarui state lainnya
  };



  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#F3DDE0' }}>
      <View
        style={styles.container}
      >
        <Image
          source={{ uri: item?.gambar || item.image }}
          style={{
            width: '90%',
            height: 200,
            resizeMode: 'cover',
            borderTopLeftRadius: 16,
            alignSelf: 'center',
            borderTopRightRadius: 16,
          }}
        />
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#4A4093', margin: 16, marginBottom: 10, }}>
          {item?.name || item.name}
        </Text>
        <Text style={{ fontSize: 16, marginBottom: 5, marginLeft: 16, color: '#4A4093' }}>
          {item?.harga ? `Rp. ${item.harga}` : item.price}
        </Text>
        <Text style={styles.totalOrder}>Jumlah Barang: {quantity}</Text>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#4A4093', margin: 16, marginTop: 20, }}>Metode Pembayaran</Text>
        <Text style={{ fontSize: 16, marginBottom: 5, marginLeft: 16, color: '#4A4093' }}>BNI : 13887970</Text>
        <Text style={{ fontSize: 16, marginBottom: 5, marginLeft: 16, color: '#4A4093' }}>Mandiri : 13887970</Text>
        <Text style={{ fontSize: 16, marginBottom: 5, marginLeft: 16, color: '#4A4093' }}>BRI : 13887970</Text>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#4A4093', margin: 16, marginTop: 20, }}>Voucher Diskon</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Masukkan voucher diskon"
            value={voucher}
            onChangeText={(text) => setVoucher(text)}
          />
          <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
            <Text style={styles.refreshButtonText}>Refresh</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.bayarButton} onPress={handleBayar}>
          <Text style={styles.bayarButtonText}>Bayar: {totalPayment}</Text>
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
    marginLeft: 16,
    color: '#4A4093'
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
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
  emailInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
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
  bayarButton: {
    backgroundColor: '#4A4093',
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignSelf: "left",
    marginBottom: 20,
    fontFamily: "Poppins",
  },
  bayarButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
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

export default PilihPembayaran;
