import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';

const Register = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    console.log('fullName:', fullName);
    console.log('Email:', email);
    console.log('Password:', password);
    // Tambahkan logika autentikasi di sini jika diperlukan
  };

  const navigateToLogin = () => {
    navigation.navigate('Login'); // Navigasi kembali ke halaman login
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/BeKi.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>Registrasi</Text>
      <TextInput
        style={styles.input}
        placeholder="Nama Lengkap"
        onChangeText={(text) => setFullName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Daftar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToLogin}>
        <Text style={styles.registerText}>Sudah punya akun? Masuk di sini</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#528BF9',
  },
  logo: {
    width: 120,
    height: 160,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'white',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#528BF9',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  registerText: {
    color: 'white',
    marginTop: 16,
    textDecorationLine: 'underline',
  },
});

export default Register;
