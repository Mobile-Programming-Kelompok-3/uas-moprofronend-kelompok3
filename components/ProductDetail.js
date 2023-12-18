import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';

const ProductDetail = ({ route, navigation }) => {
  const { item } = route.params;
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/produksend/${item.id}`);
        const data = await response.json();
        setProduct(data);
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
    console.log(`Added ${quantity} ${product?.name} to the cart`);
  };

  const handleOrderNow = () => {
    console.log(`Ordered ${quantity} ${product?.name} now`);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
      <View>
        <View
          style={{
            borderRadius: 16,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 7,
            overflow: 'hidden',
          }}
        >
          <Image
            source={{ uri: product?.gambar || item.image }}
            style={{
              width: '100%',
              height: 200,
              resizeMode: 'cover',
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
            }}
          />
          <Text style={{ fontSize: 24, fontWeight: 'bold', margin: 16 }}>
            {product?.name || item.name}
          </Text>
          <Text style={{ fontSize: 18, marginBottom: 16, marginLeft: 16 }}>
            {product?.harga ? `Rp. ${product.harga}` : item.price}
          </Text>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, marginLeft: 16 }}>
            <TouchableOpacity onPress={handleDecrement} style={{ padding: 10, backgroundColor: '#04B4A2', borderRadius: 5 }}>
              <Text style={{ fontSize: 18, fontWeight: '800', color:'white' }}>-</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 20, marginHorizontal: 10 }}>{quantity}</Text>
            <TouchableOpacity onPress={handleIncrement} style={{ padding: 10, backgroundColor: '#04B4A2', borderRadius: 5 }}>
              <Text style={{ fontSize: 18, fontWeight: '800', color:'white' }}>+</Text>
            </TouchableOpacity>
          </View>

          <Text style={{ fontSize: 16, marginBottom: 16, marginLeft: 16, fontWeight: 'bold' }}>Tentang Produk</Text>
          <Text style={{ fontSize: 14, marginBottom: 20, marginLeft: 16, marginRight: 16, textAlign: 'justify' }}>
            {product?.deskripsi || item.description}
          </Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Keranjang")} 
            style={{
              flex: 1,
              backgroundColor: 'white',
              paddingVertical: 24,
              borderColor: '#04B4A2',
              borderWidth: 1,
            }}
          >
            <Text style={{ color: '#04B4A2', textAlign: 'center', fontSize: 16 }}>Tambah ke Keranjang</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Pesan Sekarang", {item, quantity})}
            style={{
              flex: 1,
              backgroundColor: '#04B4A2',
              paddingVertical: 24,
            }}
          >
            <Text style={{ color: 'white', textAlign: 'center', fontSize: 16 }}>Pesan Sekarang</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductDetail;
