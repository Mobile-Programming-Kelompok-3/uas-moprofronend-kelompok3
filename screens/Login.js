import axios from 'axios';
import React, { useState } from 'react';
import { ImageBackground, Image, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const Login = ({ navigation, setIsLoggedIn, setUserId  }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/logins',
        {
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
      setIsLoggedIn(true);
      const userId = response.data.user.id;; // Assuming user data includes an 'id' field

        // Set the user ID and set isLoggedIn to true
        setUserId(userId);
      // Lakukan navigasi atau logika setelah registrasi berhasil
    } catch (error) {
      console.error('Registrasi gagal:', error);
      // Tambahkan logika penanganan kesalahan
    }
  };

  const handleRegister = () => {
    // Navigasi ke halaman Register
    navigation.navigate('Register'); // Ganti 'Register' dengan nama screen/halaman Registrasi
  };

  return (
    <ImageBackground
      source={require('../assets/BG-LOGIN.jpg')}
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
        <TextInput
          style={[styles.input, { borderRadius: 10 }]}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={[styles.input, { borderRadius: 10 }]}
          placeholder="Password"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRegister}>
          <Text style={styles.loginText}>Belum punya akun? Buat di sini</Text>
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
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Warna putih dengan tingkat transparansi 0.8
    padding: 16,
    borderRadius: 10,
    width: '80%', // Sesuaikan dengan kebutuhan
    alignItems: 'center', // Agar kontennya berada di tengah secara horizontal
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
  loginText: {
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

export default Login;