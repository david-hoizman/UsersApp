import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'

export default function Image_() {
  
  return (
    <View>
      
        <Image style={styles.img} source={require('./delete.png')}/>
 
      
      
    </View>
  )
}

const styles = StyleSheet.create({
  img: {
    marginLeft:4,
    marginTop:2,
    height:15,
    width:15
  }
  

})
 

