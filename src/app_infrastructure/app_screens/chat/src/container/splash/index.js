import React, { useEffect } from 'react';
import { View } from 'react-native';
import { globalStyle, appStyle, color } from '../../utility';
import { Logo } from '../../component';

export default ({ navigation }) => {
  useEffect(() => {
    const redirect = setTimeout(() => {
      navigation.replace('DMA Chat');
    }, 1000);
    return () => clearTimeout(redirect);
  }, [navigation]);
  return (
    <View
      style={[globalStyle.containerCentered, { backgroundColor: 'white' }]}>
      <Logo />
    </View>
  );
};
