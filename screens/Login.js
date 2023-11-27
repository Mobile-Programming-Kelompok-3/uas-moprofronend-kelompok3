import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Login from '../components/LoginPage';
import Register from '../components/RegisterPage';

const LoginPage = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log(`Username: ${username}, Password: ${password}`);
  };

  const handleRegisterLink = () => {
    navigation.navigate('RegisterPage');
  };

  return (
    <View style={styles.container}>
      <Text style={{ justifyContent: 'center', alignItems: 'center' }}>Login Akun</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRegisterLink}>
        <Text>Don't have an account? Register here.</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginPage;

