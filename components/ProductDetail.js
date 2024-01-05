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
    <ScrollView style={{ flex: 1, backgroundColor: '#F3DDE0' }}>
      <View>
        <View
          style={{
            // borderRadius: 16,
            // shadowColor: '#000',
            // shadowOffset: { width: 0, height: 4 },
            // shadowOpacity: 0.1,
            // shadowRadius: 7,
            overflow: 'hidden',
          }}
        >
          <Image
            source={{ uri: product?.gambar || item.image }}
            style={{
              width: '100%',
              height: 200,
              resizeMode: 'cover',
              // borderTopLeftRadius: 16,
              // borderTopRightRadius: 16,
            }}
          />
          <Text style={{  fontSize: 24, fontWeight: 'bold', margin: 16, color:'#4A4093' }}>
            {product?.name || item.name}
          </Text>
          <Text style={{  fontSize: 18, marginBottom: 16, marginLeft: 16, color:'#4A4093'}}>
            {product?.harga ? `Rp. ${product.harga}` : item.price}
          </Text>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, marginLeft: 16 }}>
            <TouchableOpacity onPress={handleDecrement} style={{ padding: 10, backgroundColor: '#43398F', borderRadius: 5 }}>
              <Text style={{ fontSize: 18, fontWeight: '800', color:'black' }}>-</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 20, marginHorizontal: 10 }}>{quantity}</Text>
            <TouchableOpacity onPress={handleIncrement} style={{ padding: 10, backgroundColor: '#43398F', borderRadius: 5 }}>
              <Text style={{ fontSize: 18, fontWeight: '800', color:'black' }}>+</Text>
            </TouchableOpacity>
          </View>

          <Text style={{  fontSize: 16, marginBottom: 15, marginLeft: 16, fontWeight: 'bold', color:'#4A4093' }}>Tentang Produk</Text>
          <Text style={{  fontSize: 14, marginBottom: 20, marginLeft: 16, marginRight: 16, textAlign: 'justify', color:'#4A4093' }}>
            {product?.deskripsi || item.description}
          </Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Keranjang")} 
            style={{
              flex: 1,
              backgroundColor: '#FBFF3D',
              paddingVertical: 24,
              borderRadius: 25,
              marginHorizontal: 10,
              // borderColor: '#04B4A2',
              // borderWidth: 1,
            }}
          >
            <Text style={{ color: '#4A4093', textAlign: 'center', fontSize: 16, fontWeight: 'bold', }}>Tambah ke Keranjang</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Pilih Pembayaran", {item, quantity})}
            style={{
              flex: 1,
              backgroundColor: '#FBFF3D',
              borderRadius: 25,
              marginHorizontal: 10,
              // borderBlockColor: 'white',
              paddingVertical: 24,
            }}
          >
            <Text style={{ color: '#4A4093', textAlign: 'center', fontSize: 16, fontWeight: 'bold',}}>Pesan Sekarang</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductDetail;
