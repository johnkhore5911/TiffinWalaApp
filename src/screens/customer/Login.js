import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigation();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password!');
      return;
    }

    try {
      const fcmtoken = await AsyncStorage.getItem("fcmtoken");
      const response = await axios.post('https://tiffin-wala-backend.vercel.app/api/auth/login', {
        email,
        password,
        fcmtoken
      });
      
      Alert.alert('Login Successful', response.data.message);
      await AsyncStorage.setItem('token',response.data.token );
      console.log('token',response.data.token );
      // Navigate to the main screen or store the token
      // navigation.navigate("HomeTabs");
      console.log("response.data.user: ",response.data.user.role)
      await AsyncStorage.setItem("role",response.data.user.role);

      if(response.data.user.role=='customer'){
        navigation.navigate("HomeTabs");
      }
      else{
        navigation.navigate("DeliveryNavigator");
      }

      

    } catch (error) {
      Alert.alert('Login Failed', error.response?.data?.message || 'Error occurred');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Log in to your account</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Signup')}
        style={styles.link}
      >
        <Text style={styles.linkText}>Don't have an account? Signup</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20, 
    backgroundColor: '#f7f9fc' 
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#333', 
    marginBottom: 5 
  },
  subtitle: { 
    fontSize: 16, 
    color: '#666', 
    marginBottom: 20 
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#ccc', 
    padding: 15, 
    marginBottom: 15, 
    borderRadius: 10, 
    width: '100%', 
    backgroundColor: '#fff' 
  },
  button: { 
    backgroundColor: '#007bff', 
    padding: 15, 
    borderRadius: 10, 
    width: '100%', 
    alignItems: 'center', 
    marginBottom: 10 
  },
  buttonText: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  link: { 
    marginTop: 10 
  },
  linkText: { 
    color: '#007bff', 
    fontWeight: 'bold', 
    fontSize: 14 
  },
});

export default Login;
