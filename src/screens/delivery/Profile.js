import { StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';

const Profile = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Delivery Profile</Text>
      <Text>Name: Delivery Boy</Text>
      <Text>Email: deliveryboy@example.com</Text>
      <Button 
        title="Log Out" 
        color="#dc3545" 
        onPress={() => console.log('Logged Out')} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f7f9fc',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default Profile;
