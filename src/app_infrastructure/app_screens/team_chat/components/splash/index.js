import React, { useEffect } from 'react';
import { View } from 'react-native';
import { globalStyle, appStyle, color } from '../../../chat/src/utility';
import { Logo } from '../logo/index';

export const LogoShow = ({ navigation }) => {
  useEffect(() => {
    const redirect = setTimeout(() => {
      navigation.replace('Team Chat');
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
