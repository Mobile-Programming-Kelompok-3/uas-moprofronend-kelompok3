import React, { useState } from 'react';
import { Image, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const Login = ({ navigation }) => { // Dapat menggunakan navigation props untuk berpindah layar

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Email:', email);
    console.log('Password:', password);
    // Tambahkan logika autentikasi di sini jika diperlukan
  };

  const navigateToRegister = () => {
    navigation.navigate('Register'); // Navigasi ke layar pendaftaran (Register)
  };

  return (
    <View style={[styles.container, { backgroundColor: '#528BF9' }]}>
      <Image
        source={require('../assets/BeKi.png')} 
        style={styles.logo}
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
      <TouchableOpacity onPress={navigateToRegister}> {/* Tombol untuk ke halaman register */}
        <Text style={styles.registerText}>Belum punya akun? Daftar di sini</Text>
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
  },
  logo: {
    width: 120,
    height: 160,
    marginBottom: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
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

export default Login;
