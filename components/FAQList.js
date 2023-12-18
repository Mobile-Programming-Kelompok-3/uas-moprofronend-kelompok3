import React, { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, LayoutAnimation, Dimensions } from 'react-native';



const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    width: windowWidth * 0.9,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
    marginBottom: 8,
    color: '#333',
    textAlign: 'justify',
  },
  answer: {
    fontSize: 16,
    color: '#666',
    textAlign: 'justify',
    fontFamily: 'Poppins',

  },
  header: {
    width: '100%',
    height: 60,
    backgroundColor: '#80AAFC',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    
    color: 'white',
    fontSize: 20,
    fontFamily: 'Poppins',
    fontWeight: 'bold'
    
  }
});

const FAQBox = ({ question, answer }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={styles.box}>
      <TouchableOpacity onPress={toggleExpand}>
        <Text style={styles.question}>{question}</Text>
      </TouchableOpacity>
      {expanded && <Text style={styles.answer}>{answer}</Text>}
    </View>
  );
};

const FAQList = () => {
  const faqs = [
    {
      question: '1. Apa itu aplikasi BeKi?',
      answer: 'Aplikasi BeKi merupakan singkatan dari Belanja Kilat. Aplikasi ini merupakan aplikasi belanja online yang menyediakan pengalaman belanja yang cepat, mudah, dan menyenangkan. Dengan aplikasi ini, Anda dapat menemukan, memilih, dan membeli berbagai produk dengan efisiensi tinggi.'
    },
    {
      question: '2. Bagaimana cara saya memesan di dalam aplikasi BeKi?',
      answer: 'Pilih produk yang Anda inginkan, tambahkan ke keranjang belanja, dan ikuti langkah-langkah pembayaran. Proses pemesanan ini dirancang untuk memudahkan Anda dalam mendapatkan produk dengan cepat.'
    },
    {
      question: '3. Apa keuntungan yang akan saya dapatkan dengan berbelanja di aplikasi BeKi?',
      answer: 'Anda akan diberikan beberapa keuntungan ketika berbelanja di aplikasi BeKi, diantaranya: pencarian produk cepat, promosi dan diskon eksklusif, pembayaran aman dan mudah, notifikasi real-time, serta dukungan pelanggan yang responsif.'
    },
    {
      question: '4. Bagaimana cara saya membayar barang belanjaan saya?',
      answer: 'Sistem pembayaran yang digunakan dalam aplikasi ini adalah sistem transfer dan setelah itu Anda akan diminta untuk mengirimkan bukti trandfer.'
    },
    {
      question: '5. Apakah ada biaya pengiriman?',
      answer: 'Ada'
    },
    {
      question: '6. Apakah ada opsi pembayaran yang cicil atau angsuran?',
      answer: 'Tidak ada'
    },
    {
      question: '7. Bagaimana cara mendaftar atau membuat akun?',
      answer: 'Anda bisa login menggunakan akun google Anda.'
    },
    {
      question: '8. Apa yang harus dilakukan jika lupa kata sandi?',
      answer: 'Silahkan klik tombol "forgot password"'
    },
  ];

  return (
    <ScrollView>
      <View style={styles.container}>
        {faqs.map((faq, index) => (
          <FAQBox key={index} question={faq.question} answer={faq.answer} />
        ))}
      </View>
    </ScrollView>
  );
};

export default FAQList;