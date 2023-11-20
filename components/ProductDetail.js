// ProductDetail.js
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

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

  return (
    <View>
      <Image
        source={item.image}
        style={{
          width: '100%',
          height: 200,
          resizeMode: 'cover',
        }}
      />
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.name}</Text>
        <Text style={{ fontSize: 16, marginTop: 8 }}>{item.description}</Text>
        <Text style={{ fontSize: 18, marginTop: 16 }}>Price: {item.price}</Text>

        {/* Quantity */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16 }}>
          <Text style={{ fontSize: 16, marginRight: 8 }}>Quantity:</Text>
          <TouchableOpacity onPress={handleDecrement}>
            <Text style={{ fontSize: 18, color: 'blue', marginRight: 8 }}>-</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 18 }}>{quantity}</Text>
          <TouchableOpacity onPress={handleIncrement}>
            <Text style={{ fontSize: 18, color: 'blue', marginLeft: 8 }}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Add to Cart Button */}
        <TouchableOpacity
          style={{
            backgroundColor: 'green',
            padding: 12,
            borderRadius: 8,
            alignItems: 'center',
            marginTop: 16,
          }}
          onPress={() => {
            // Implement logic to add the product to the cart or perform other actions
            console.log(`Added ${quantity} ${item.name} to the cart.`);
          }}>
          <Text style={{ color: 'white', fontSize: 16 }}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetail;
