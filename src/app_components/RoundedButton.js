import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'


export const RoundedButton = ({
  onPressed,
  style = {},
  textStyle = {},
  size = 125,
  color = '#F0EFEF',
  ...props
}) => {
  return (
    <TouchableOpacity onPress={() => { onPressed ? onPressed(true) : {} }} style={[styles(size, color).radius, style]}>
      <Text style={[styles(size).text, textStyle]}>{props.title}</Text>
    </TouchableOpacity>
  )

}
const styles = (size, color) => StyleSheet.create({

  radius: {
    borderRadius: size / 2,
    width: size,
    height: size,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color,
    borderColor: 'black',
    borderWidth: 1,
  },
  text: {
    color: 'black',
    fontSize: size / 3,

  }
})