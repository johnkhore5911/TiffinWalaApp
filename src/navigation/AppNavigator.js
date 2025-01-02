import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import CustomerNavigator from './CustomerNavigator';

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <CustomerNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
