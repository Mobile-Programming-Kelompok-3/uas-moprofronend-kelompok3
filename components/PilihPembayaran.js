import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const PilihPembayaran = ({ navigation,route, userId }) => {
  const { item, quantity } = route.params;
  const [recipientAddress, setRecipientAddress] = useState('');
  const [paymentProof, setPaymentProof] = useState(null); // State untuk bukti pembayaran
  const [notes, setNotes] = useState('');
  const [orderDate, setOrderDate] = useState('');

  const totalPayment = item.harga * quantity;

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
    {item, quantity}
    );
};


  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.container}>
        <Image
          source={{ uri: item?.gambar }}
          style={{
            width: "100%",
            height: 300,
            resizeMode: "cover",
          }}
        />
        <Text style={styles.productName}>{item?.name}</Text>
        <Text style={styles.productPrice}>Rp. {item.harga}</Text>
        <Text style={styles.totalOrder}>Total Pesanan: {quantity}</Text>
        <Text style={styles.totalOrder}>Total Harga: {totalPayment}</Text>

        <Text style={styles.label}>Pembayaran</Text>
        <Text style={styles.label}>BNI : 13887970</Text>
        <Text style={styles.label}>Mandiri : 13887970</Text>
        <Text style={styles.label}>BRI : 13887970</Text>

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
  },imageInputContainer: {
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
