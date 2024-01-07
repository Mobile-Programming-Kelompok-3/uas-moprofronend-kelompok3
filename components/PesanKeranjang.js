import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import DatePicker from 'react-datepicker';
import DatePickerRef from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const PesanKeranjang = ({ navigation, route, userId }) => {
  const { item, newTotalPayment, voucher } = route.params;
  const [recipientAddress, setRecipientAddress] = useState('');
  const [paymentProof, setPaymentProof] = useState(null); // State untuk bukti pembayaran
  const [notes, setNotes] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [itemjumlah, setItemJumlah] = useState(0);

  // Gunakan voucher untuk mengurangi total harga
  const [voucherDiscount, setVoucherDiscount] = useState(0); // State untuk nilai diskon dari voucher

  // useEffect(() => {
  //   // Lakukan operasi perhitungan diskon dari voucher di sini
  //   // Misalnya, diskon 10% dari totalPayment jika voucher "DISKON10"
  //   // Ini hanya contoh, kamu bisa menyesuaikan dengan logika diskon yang sesuai
  //   if (voucher === 'DISKON10') {
  //     const discountAmount = totalPayment * 0.5; // Diskon 10%
  //     setVoucherDiscount(discountAmount);
  //   } else {
  //     setVoucherDiscount(0); // Set nilai diskon menjadi 0 jika tidak ada voucher
  //   }
  // }, [voucher, totalPayment]);

  // const totalPaymentAfterDiscount = totalPayment - voucherDiscount;

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
        total_harga: newTotalPayment,
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
                  resizeMode: "cover",
                  borderTopLeftRadius: 16,
                  alignSelf: 'center',
                  borderTopRightRadius: 16,
                }}
              />
              <Text style={styles.productName}>{product?.name}</Text>
              <Text style={styles.productPrice}>Rp. {product?.harga}</Text>
              <Text style={styles.totalOrder}>Total Pesanan: {cartItem?.jumlah}</Text>

            </View>
          );
        })}
        <Text style={styles.totalOrder}>Total Harga: {newTotalPayment}</Text>
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

        <Text style={styles.label}>Tanggal Pemesanan</Text>
        <DatePicker
          selected={orderDate}
          onChange={handleDateChange}
          placeholderText="Pilih Tanggal Pemesanan"
          dateFormat="yyyy-MM-dd"
          todayButton="Hari Ini"
          showYearDropdown
          showMonthDropdown
          dropdownMode="select"
          customInput={
            <TouchableOpacity style={styles.selectImageButton} onPress={() => DatePickerRef.current.onClick()}>
              <Text style={{ color: '#4A4093', textAlign: 'center', fontWeight: 600, }}>Pilih Tanggal Pemesanan</Text>
            </TouchableOpacity>
          }
          ref={(el) => (DatePickerRef.current = el)} // Tambahan untuk memastikan ref datePickerRef
          style={{ padding: 20 }}
        />
        {orderDate && (
          <Text style={styles.selectedDateText}>
            Tanggal Pemesanan: {orderDate.toISOString().split("T")[0]}
          </Text>
        )}

        <TouchableOpacity style={styles.bayarButton} onPress={handleBayar}>
          <Text style={styles.bayarButtonText}>Bayar: {newTotalPayment}</Text>
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
  input: {
    height: 40,
    width: '90%',
    alignSelf: 'center',
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
  bayarButton: {
    backgroundColor: "#43398F",
    marginTop: 20,
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
    color: '#4A4093',
    flex: 1,
    padding: 15,
    borderRadius: 10,
    fontFamily: "Poppins",
  },
  imageInputContainer: {
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
    backgroundColor: 'lightblue',
    flex: 1,
    padding: 15,
    borderRadius: 10,
    fontFamily: "Poppins",
  },
});

export default PesanKeranjang;
