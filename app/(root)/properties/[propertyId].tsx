import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

const Property = () => {
  const { propertyId } = useLocalSearchParams();
  return (
    <View>
      <Text>{propertyId}</Text>
    </View>
  )
}

export default Property