import React, { useState } from 'react';
import { ImageBackground, Image, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <ImageBackground
      source={require('../assets/BG-LOGIN.jpg')}
      style={styles.container}
    >
      <View style={styles.overlay}>
        <View style={styles.contentContainer}>
          <Image
            source={require('../assets/logo.png')}
            style={styles.logo}
          />
          <Image
            source={require('../assets/logokeranjang.png')}
            style={styles.logokeranjang}
          />
          <TextInput
            style={[styles.input, { borderRadius: 10, color: '#4A4093', }]}
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={[styles.input, { borderRadius: 10, color: '#4A4093', }]}
            placeholder="Password"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
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
    borderRadius: 20,
    width: '80%',
    alignItems: 'center',
  },
  contentContainer: {
    width: '100%', // Ensure content stretches to the width of the overlay
    alignItems: 'center', // Center content horizontally
  },
  logokeranjang: {
    width: 250,
    height: 220,
    resizeMode: 'contain',
  },
  logo: {
    width: 150,
    height: 50,
    resizeMode: 'contain',
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
});

export default Login;
