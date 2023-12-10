import React, { useState } from 'react';
<<<<<<< HEAD

import { Image, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

 

const Login = () => {

  const [email, setEmail] = useState('');

=======
import { Image, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const Login = () => {
  const [email, setEmail] = useState('');
>>>>>>> 8c9803d86c9614765c8c2e21967ec6259f90b80f
  const [password, setPassword] = useState('');

 

  const handleLogin = () => {
<<<<<<< HEAD

    console.log('Email:', email);

    console.log('Password:', password);

  };

 

  return (

    <View style={[styles.container, { backgroundColor: '#528BF9' }]}>

      <Image

        source={require('../assets/BeKi.png')} 

        style={styles.logo}

=======
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <View style={[styles.container, { backgroundColor: '#528BF9' }]}>
      <Image
        source={require('../assets/BeKi.png')} 
        style={styles.logo}
>>>>>>> 8c9803d86c9614765c8c2e21967ec6259f90b80f
      />

      <TextInput
<<<<<<< HEAD

        style={[styles.input, { borderRadius: 10 }]}

        placeholder="Email"

        onChangeText={(text) => setEmail(text)}

      />

      <TextInput

        style={[styles.input, { borderRadius: 10 }]}

=======
        style={[styles.input, { borderRadius: 10 }]}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={[styles.input, { borderRadius: 10 }]}
>>>>>>> 8c9803d86c9614765c8c2e21967ec6259f90b80f
        placeholder="Password"

        secureTextEntry

        onChangeText={(text) => setPassword(text)}
<<<<<<< HEAD

=======
>>>>>>> 8c9803d86c9614765c8c2e21967ec6259f90b80f
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>

        <Text style={styles.buttonText}>Login</Text>

      </TouchableOpacity>
<<<<<<< HEAD

=======
>>>>>>> 8c9803d86c9614765c8c2e21967ec6259f90b80f
    </View>

  );

};

<<<<<<< HEAD
 
=======
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
});

export default Login;

>>>>>>> 8c9803d86c9614765c8c2e21967ec6259f90b80f

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

});

 

export default Login;