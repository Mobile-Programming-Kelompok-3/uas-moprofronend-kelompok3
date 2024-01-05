import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import KeranjangCard from '../components/KeranjangCard';
import HeaderPage from '../components/HeaderPage';

function KeranjangScreen({navigation}) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <HeaderPage title="Keranjang" />, // Menggunakan komponen Header dengan properti title
    });
  }, [navigation]);

    return (
      <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <KeranjangCard />
      </ScrollView>
      {/* Tombol Pesan Sekarang */}
      <TouchableOpacity
        style={styles.pesanButton}
        onPress={() => navigation.navigate('Pesan Sekarang', { item, quantity: 3 })}
      >
        <Text style={{ color: "#43398F", fontSize: 15, fontWeight: 'bold' }}>Pesan Sekarang</Text>
      </TouchableOpacity>
    </View>
    );
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#F3DDE0',
  },
  pesanButton: {
    backgroundColor: "yellow",
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16,
  },
});

export default KeranjangScreen;
