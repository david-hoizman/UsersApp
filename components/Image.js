import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'

export default function Image_() {
  return (
    <View style={{width:"100%", padding:8}}>
      <Text>image</Text>
      <Image style={{width:"4%", height:24}} source={require('./del_img.png')}/>
    </View>
  )
}

const styles = StyleSheet.create({})