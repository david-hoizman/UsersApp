import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import React from 'react';

/**
 * A component that renders a delete icon.
 * 
 * @returns {JSX.Element} A view containing an image of a delete icon.
 */
export default function ImageDel() {
  
  return (
    <View>    
        <Image style={styles.img} source={require('../assets/images/delete.png')} />
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
