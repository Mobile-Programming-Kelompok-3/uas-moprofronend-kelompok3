// ProductDetail.js
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Button } from 'react-native';

const ProductDetail = ({ route }) => {
  const { item } = route.params;
  const [quantity, setQuantity] = useState(1);

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
    <View style={{ padding: 16 }}>
      <Image
        source={item.image}
        style={{
          width: '100%',
          height: 300,
          resizeMode: 'cover',
        }}
      />
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginVertical: 10 }}>
        {item.name}
      </Text>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>{item.price}</Text>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
        <TouchableOpacity onPress={handleDecrement} style={{ padding: 10, backgroundColor: 'lightgray', borderRadius: 5 }}>
          <Text>-</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 20, marginHorizontal: 10 }}>{quantity}</Text>
        <TouchableOpacity onPress={handleIncrement} style={{ padding: 10, backgroundColor: 'lightgray', borderRadius: 5 }}>
          <Text>+</Text>
        </TouchableOpacity>
      </View>

      <Text style={{ fontSize: 16, marginBottom: 10, fontWeight: 'bold' }}>Tentang Produk</Text>
      <Text style={{ fontSize: 14, marginBottom: 20 }}>{item.description}</Text>

      <View style={{ flexDirection: 'row' }}>
        <Button title="Keranjang" onPress={handleAddToCart} />
        <Button title="Pesan Sekarang" onPress={handleOrderNow} />
      </View>
    </View>
  );
};

export default ProductDetail;
