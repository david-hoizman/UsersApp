import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'


export default function PressView() {
    const [isShow, setIsShow] = useState(false);
    const onBtnPress = () => {
        setIsShow(true)
    }

    
  return (
    
    <>
      <Modal visible={isShow} animationType='fade' transparent={true}>
        <View style={styles.container}>
            <Text>Modal screen</Text>
            <Pressable onPress={() => {
                setIsShow(false)
            }} style={(data) => [styles.btn, {backgroundColor:"orange"}, data.pressed && {opacity:0.5}]}>
                <Text style={styles.btnText}>Hide</Text>
            </Pressable>
        </View>
      </Modal>
    
      <Pressable onPress={onBtnPress} style={(data) => [styles.btn,data.pressed && {opacity:0.5}]}>
          <Text style={styles.btnText}>PressView</Text>
 
      </Pressable>
    </>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: "rgba(255,255,255,0.7)",
        alignItems: 'center', 
        justifyContent: 'center', 
      },
    btn: {
        backgroundColor: "skyblue",
        borderWidth: 2,
        width: "70%",
        padding: 16

    },
    btnText: {
        fontSize: 24,
        textAlign: "center"
    }
})