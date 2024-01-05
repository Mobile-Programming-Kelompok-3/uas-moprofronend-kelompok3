import React, { useState } from 'react';
import { Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

function AboutStoreScreen() {
  const [showDescription, setShowDescription] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);

  const toggleSection = (section) => {
    switch (section) {
      case 'description':
        setShowDescription(!showDescription);
        break;
      case 'faq':
        setShowFAQ(!showFAQ);
        break;
      case 'schedule':
        setShowSchedule(!showSchedule);
        break;
      default:
        break;
    }
  };

  const renderArrowIcon = (section) => {
    const isSectionOpen = getSectionState(section);
    const iconName = isSectionOpen ? 'chevron-up' : 'chevron-down'; // Menggunakan ikon panah atas dan bawah
    return (
      <Ionicons name={iconName} size={20} color="#04B4A2" />
    );
  };

  const getSectionState = (section) => {
    switch (section) {
      case 'description':
        return showDescription;
      case 'faq':
        return showFAQ;
      case 'schedule':
        return showSchedule;
      default:
        return false;
    }
  };

  const openGoogleMaps = () => {
    const address = 'Kamayangan Residence Blok D4, No 3'; // Ganti dengan alamat toko sesuai kebutuhan
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Logo Toko */}
      <Image
        source={require('../assets/LogoApp.png')} // Ganti dengan path yang sesuai
        style={styles.logo}
      />

      {/* Deskripsi Toko */}
      <TouchableOpacity onPress={() => toggleSection('description')}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Sakura App</Text>
            <View style={styles.showMore}>
              {renderArrowIcon('description')}
            </View>
          </View>
          {showDescription && (
            <Text style={styles.description}>
              Sakura Jeans merupakan salah satu merek jeans lokal di platform e-commerce tiktok yang menjual produk berupa jeans. Sakura jeans berdiri awal tahun 2023 yang saat ini masih berjalan. Aplikasi ini menawarkan pemesanan yang fleksibel bagi penggunanya.

            </Text>
          )}
        </View>
      </TouchableOpacity>

      {/* FAQ */}
      <TouchableOpacity onPress={() => toggleSection('faq')}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>FAQ</Text>
            <View style={styles.showMore}>
              {renderArrowIcon('faq')}
            </View>
          </View>
          {showFAQ && (
            <>
              <Text style={styles.description}>1. Apakaha saya dapat merubah pesanan setelah terkonfirmasi?</Text>
              <Text style={styles.description}>   Mohon maaf, pesanan yang sudah dikonfirmasi tidak dapat dilakukan perubahan ataupun pembatalan. Setelah pesanan dikonfirmasi, maka produk, pembayaran, dan alamat secara otomatis dikunci oleh sistem. Oleh karenanya, kami memohon kesediaan Anda untuk mengecek kembali pesanan Anda, sebelum melanjutkan ke pembayaran</Text>
              <Text style={styles.description}>2. Metode pembayaran apa yang disediakan?</Text>
              <Text style={styles.description}>   Kartu credit, Virtua Account (VA) Bank Transfer, Dana, Gopay, Cash on Delivery</Text>
              <Text style={styles.description}>3. Bagaimana saya mengembalikan produk yang cacat?</Text>
              <Text style={styles.description}>   Kami mohon maaf  karena produk yang Anda terima dari kami adalah produk yang cacat. Silakan menghubungi Customer Support kami melalui saluran yang tersedia di bawah ini untuk melakukan penyelidikan lebih lanjut dan membantu Anda untuk proses selanjutnya.</Text>
              <Text style={styles.description}>4. Bagaimana saya mengetahui ukuran produk?</Text>
              <Text style={styles.description}>   Ukuran dalam tabel kami akan diukur dalam [cm], kecuali disebutkan sebaliknya. Untuk memeriksa rentang ukuran produk, cukup cari produk di aplikasi SakuaApp, lalu klik [GRAFIK UKURAN].</Text>
              {/* Tambahkan FAQ lainnya sesuai kebutuhan */}
            </>
          )}
        </View>
      </TouchableOpacity>

      {/* Jadwal Toko */}
      <TouchableOpacity onPress={() => toggleSection('schedule')}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Jadwal Toko</Text>
            <View style={styles.showMore}>
              {renderArrowIcon('schedule')}
            </View>
          </View>
          {showSchedule && (
            <>
              <Text style={styles.description}>Buka setiap hari pukul 08.00 - 16.00</Text>
              {/* Tambahkan jadwal lainnya sesuai kebutuhan */}
            </>
          )}
        </View>
      </TouchableOpacity>

      {/* Alamat Toko */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Alamat Toko</Text>
        <Text style={styles.description}>Jl. Cipamokolam No.222</Text>
        <Text style={styles.description}>Kelurahan Cipamokolan</Text>
        <Text style={styles.description}>Kecamatan Rancasari</Text>
        <Text style={styles.description}>Kota Bandung, 40292</Text>
        {/* Tambahkan informasi alamat lainnya sesuai kebutuhan */}
      </View>

      {/* Footer dengan tombol Google Maps */}
      <TouchableOpacity style={styles.footerButton} onPress={openGoogleMaps}>
        <Text style={styles.footerButtonText}>Buka di Google Maps</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F3DDE0',
  },
  logo: {
    width: '80%',
    height: 90,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 50,
    marginLeft: 35,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
    color: '#43398F',
  },
  description: {
    // Use Poppins-Regular for regular text
    fontSize: 16,
    lineHeight: 24,
    color: '#555555',
    textAlign: 'justify',
  },
  showMore: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerButton: {
    backgroundColor: '#FBFF3D',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  footerButtonText: { // Use Poppins-Bold for bold
    color: '#43398F',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


export default AboutStoreScreen;
