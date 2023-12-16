// ProductDetail.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Button, ScrollView } from 'react-native';

const ProductDetail = ({ route, navigation }) => {
  const { item } = route.params;
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState();

  useEffect(() => {
    // Gunakan useEffect untuk mengambil data produk dari API saat komponen dimount
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/produksend/${item.id}`);
        // Memperbarui state produk dengan data yang diterima dari API
        setProduct(response.data);
        console.log(product);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [item]);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    // Implement logic to add the product to the cart
    // You can use a state management solution or send the data to an API, for example.
    console.log(`Added ${quantity} ${item.name} to the cart`);
  };

  const handleOrderNow = () => {
    // Implement logic to process the order
    console.log(`Ordered ${quantity} ${item.name} now`);
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ padding: 16 }}>
        <Image
          source={{uri:product?.gambar}}
          style={{
            width: '100%',
            height: 300,
            resizeMode: 'cover',
          }}
        />
        <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 24, fontWeight: 'bold', marginVertical: 10 }}>
        {product?.name}
        </Text>
        <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 18, marginBottom: 10 }}>Rp. {product?.harga}</Text>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
          <TouchableOpacity onPress={handleDecrement} style={{ padding: 10, backgroundColor: 'lightgray', borderRadius: 5 }}>
            <Text>-</Text>
          </TouchableOpacity>
          <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 20, marginHorizontal: 10 }}>{quantity}</Text>
          <TouchableOpacity onPress={handleIncrement} style={{ padding: 10, backgroundColor: 'lightgray', borderRadius: 5 }}>
            <Text>+</Text>
          </TouchableOpacity>
        </View>

        <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 16, marginBottom: 10, fontWeight: 'bold' }}>Tentang Produk</Text>
        <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14, marginBottom: 20, textAlign: 'justify'}}>{product?.deskripsi}</Text>

        <View style={{ flexDirection: 'row', justifyContent: 'center', backgroundColor: '#528BF9', paddingVertical: 8 }}>
  <Button title="Keranjang" onPress={() => navigation.navigate("Keranjang", { item, quantity })} />
  <Button title="Pesan Sekarang" onPress={() => navigation.navigate("Pesan Sekarang", {item, quantity})} />
</View>

      </View>
    </ScrollView>
  );
};


export default ProductDetail;
