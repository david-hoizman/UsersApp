import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import React from 'react';

/**
 * A component that displays an image.
 * 
 * @returns {JSX.Element} A view containing an image.
 */
export default function ImageEdit() {
  return (
    <View>
      <Image style={styles.img} source={require('../assets/images/resume.png')} />
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    marginLeft: 4,
    marginTop: 2,
    height: 15,
    width: 15,
  },
});
