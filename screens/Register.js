import axios from 'axios';
import React, { useState } from 'react';
import { ImageBackground, View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';

const Register = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Fungsi untuk melakukan registrasi dengan menggunakan token CSRF
  const handleRegister = async () => {
    try {
      // Mendapatkan CSRF token
  
      // Melakukan POST request ke endpoint registrasi dengan CSRF token
      const response = await axios.post(
        'http://127.0.0.1:8000/registers',
        {
          name: name,
          email: email,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      console.log('Registrasi berhasil:', response.data);
      // Lakukan navigasi atau logika setelah registrasi berhasil
    } catch (error) {
      console.error('Registrasi gagal:', error);
      // Tambahkan logika penanganan kesalahan
    }
  };
  

  const navigateToLogin = () => {
    navigation.navigate('Login'); // Navigasi kembali ke halaman login
  };

  return (
    <ImageBackground
      source={require('../assets/BG-LOGIN.jpg')} // Use the same background image as Login
      style={styles.container}
    >
      <View style={styles.overlay}>
      <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
        />
        <Image
            source={require('../assets/logokeranjang.png')}
            style={styles.logokeranjang}
          /> 
        
        {/* Use the same TextInput style as Login */}
        <TextInput
          style={[styles.input, { borderRadius: 10 }]}
          placeholder="Nama Lengkap"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={[styles.input, { borderRadius: 10 }]}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={[styles.input, { borderRadius: 10 }]}
          placeholder="Password"
          value={password}
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
        {/* Use the same TouchableOpacity style as Login */}
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Daftar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToLogin}>
          <Text style={styles.registerText}>Sudah punya akun? Masuk di sini</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 16,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 50,
    resizeMode: 'contain', 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#04B4A2', // Match color to Login component
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#4A4093',
    borderWidth: 2,
    marginTop: 10,
    marginBottom: 8,
    padding: 8,
  },
  button: {
    marginTop: 16,
    backgroundColor: '#4A4093',
    padding: 10,
    marginBottom: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  registerText: {
    color: '#4A4093', // Match color to Login component
    marginTop: 16,
    textDecorationLine: 'underline',
  },
  logokeranjang: {
    width: 250,
    height: 220,
    resizeMode: 'contain',
  },
});

export default Register;
