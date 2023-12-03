// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
// import Login from './screens/Login';
// import RegisterPage from '../components/RegisterPage';

// const LoginPage = ({ navigation }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = () => {
//     console.log(`Username: ${username}, Password: ${password}`);
//   };

//   const handleRegisterLink = () => {
//     navigation.navigate('RegisterPage');
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={{ justifyContent: 'center', alignItems: 'center' }}>Login Akun</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Username"
//         onChangeText={(text) => setUsername(text)}
//         value={username}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         secureTextEntry
//         onChangeText={(text) => setPassword(text)}
//         value={password}
//       />
//       <TouchableOpacity style={styles.button} onPress={handleLogin}>
//         <Text style={styles.buttonText}>Login</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={handleRegisterLink}>
//         <Text>Don't have an account? Register here.</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Logika autentikasi dapat ditambahkan di sini
    console.log('Username:', username);
    console.log('Password:', password);
    // Tambahkan logika autentikasi sesuai kebutuhan aplikasi Anda
  };

  return (
    <View style={styles.container}>
      <Text style={{fontFamily: 'Poppins', marginLeft: 25, marginTop: 10, fontWeight: 'bold'}}>Selamat datang!</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Button
        title="Don't have an account? Register here"
        onPress={() => navigation.navigate('Register')}
      />
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
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
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Login;


