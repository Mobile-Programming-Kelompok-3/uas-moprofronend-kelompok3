import { ScrollView, Text, View } from 'react-native';
import React from 'react';
import KeranjangCard from '../components/KeranjangCard';
import HeaderPage from '../components/HeaderPage';

function KeranjangScreen({navigation }) {
  
  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <HeaderPage title="Keranjang" />, // Menggunakan komponen Header dengan properti title
    });
  }, [navigation]);

    return (
      <ScrollView showsVerticalScrollIndicator={false}>
      <KeranjangCard/>
    </ScrollView>
    );
  }

export default KeranjangScreen