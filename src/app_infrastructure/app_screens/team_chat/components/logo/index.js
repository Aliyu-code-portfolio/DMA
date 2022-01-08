import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

export const Logo = ({ logoStyle, logoTextStyle }) => (
  <View style={[styles.logo, logoStyle]}>
    <Text style={[styles.text, logoTextStyle]}>DMA</Text>
    <Text style={{ textAlign: 'right', fontSize: 16, color: 'white' }}>           TeamChat</Text>
  </View>
);
