//RegisterPage
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
//import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

// const RegisterWithGoogle = () => {
//   useEffect(() => {
//     GoogleSignin.configure();
//   }, []);

//   const handleGoogleSignIn = async () => {
//     try {
//       await GoogleSignin.hasPlayServices();
//       const userInfo = await GoogleSignin.signIn();
//       console.log(userInfo);
//     } catch (error) {
//       if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//         console.log('Sign in cancelled');
//       } else if (error.code === statusCodes.IN_PROGRESS) {
//         console.log('Sign in in progress');
//       } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//         console.log('Play services not available');
//       } else {
//         console.error(error);
//       }
//     }
//   };
const RegisterPage = () => {
  return (
    <View>
      <Text>Registrasi dengan Akun Google</Text>
      <TouchableOpacity>
        <Text>Sign In with Google</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterPage;