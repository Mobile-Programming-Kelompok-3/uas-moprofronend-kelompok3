import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
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
    const address = 'Jalan Toko No. 123, Kota Anda, 12345'; // Ganti dengan alamat toko sesuai kebutuhan
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Logo Toko */}
      <Image
        source={require('../assets/Logo Dlillah.png')} // Ganti dengan path yang sesuai
        style={styles.logo}
      />

      {/* Deskripsi Toko */}
      <TouchableOpacity onPress={() => toggleSection('description')}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>D'Lillah</Text>
            <View style={styles.showMore}>
              {renderArrowIcon('description')}
            </View>
          </View>
          {showDescription && (
            <Text style={styles.description}>
              D'lillah App merupakan aplikasi pemesanan toko bika ambon dan brownies yang menyajikan makanan ringan untuk bekal perjalanan dan oleh-oleh. Aplikasi ini menawarkan pemesanan yang efisien dan efektif bagi pengguna yang berada di lokasi yang jauh dari toko.

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
              <Text style={styles.description}>1. Apakah pemesanan bisa diantar ke lokasi?</Text>
              <Text style={styles.description}>Pesanan dapat diantar sesuai permintaan pelanggan</Text>
              <Text style={styles.description}>2. Apakah toko buka pada hari libur nasional?</Text>
              <Text style={styles.description}>Toko D'lillah buka setiap hari</Text>
              <Text style={styles.description}>3. Berapa minimal pemesanan untuk snack box?</Text>
              <Text style={styles.description}>Pemesanan snack box dapat dipesan dengan minimal total pembelian 12.000 per boxnya</Text>
              <Text style={styles.description}>4. Kapan booking pemesanan dapat dilakukan?</Text>
              <Text style={styles.description}>Booking pemesanan dapat dilakukan mulai dari H-1 tanggal yang diminta</Text>
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
              <Text style={styles.description}>Buka setiap hari pukul 08.00 - 20.00</Text>
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
    backgroundColor: '#FFFFFF',
  },
  logo: {
    width: '100%',
    height: 90,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 20,
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
    fontFamily: 'Poppins-Bold', // Use Poppins-Bold for bold
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
  },
  description: {
    fontFamily: 'Poppins-Regular', // Use Poppins-Regular for regular text
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
    backgroundColor: '#04B4A2',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  footerButtonText: {
    fontFamily: 'Poppins-Bold', // Use Poppins-Bold for bold
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


export default AboutStoreScreen;