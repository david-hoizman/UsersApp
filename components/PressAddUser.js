import {Button, TextInput, Modal, Pressable, StyleSheet, Text, View, Alert } from 'react-native'
import React, { useState } from 'react'


export default function PressView({addUser}) {
    const [isShow, setIsShow] = useState(false);
    const onBtnPress = () => {
        setIsShow(true)
    }
    // const [isShow1, setIsShow1] = useState(false);
    // const onBtnPress1 = () => {
    //     setIsShow1(true)
    // }

  const [inputVal1, setInputVal1] = useState("")
  const [condition1, setCondition1] = useState("")
  const [inputVal2, setInputVal2] = useState("")
  const [condition2, setCondition2] = useState("")
  const [inputVal3, setInputVal3] = useState("")
  const [condition3, setCondition3] = useState("")
  const [inputVal4, setInputVal4] = useState("")
  const [condition4, setCondition4] = useState("")
  const [inputVal5, setInputVal5] = useState("")
  const [condition5, setCondition5] = useState("")

  


    const onBtnPress1 = () => {
      let OK = true;
      if(/\d/.test(inputVal1)) {
        setCondition1("invalid");
        OK = false;
      }
      if(/\d/.test(inputVal2)) {
        setCondition2("invalid");
        OK = false;
      }
      if (inputVal3.indexOf('@') === -1) {
        setCondition3("invalid");
        OK = false;
      }
      if (inputVal4.length < 8) {
        setCondition4("invalid");
        OK = false;
      }
      if(/\d/.test(inputVal5)) {
        setCondition5("invalid");
        OK = false;
      }
      if (! OK){
        alert("something invalid")
        setIsShow(false)
        return
      }


      // this.firstName = firstName;
      // this.lastName = lastName;
      // this.phonNumber = phonNumber;
      // this.email = email;
      // this.role = role;

      addUser({"firstName": inputVal1, "lastName": inputVal2, "email": inputVal3, "phonNumber": inputVal4, "role": inputVal5})
      setIsShow(false)
      
      // alert("invalid")

    }
    // const onBtnPres1 = () => {
    //   alert(inputVal1)

    // }
    // const onBtnPress1 = () => {
    //   alert(inputVal1)

    // }
    // const onBtnPress1 = () => {
    //   alert(inputVal1)

    // }
    // const onBtnPress1 = () => {
      // alert(inputVal1)

    // }
    
  return (
    
    <>
      {/* <Modal visible={isShow} animationType='fade' transparent={true}> */}
        
            <Text></Text>
            {/* <Pressable onPress={() => {
                setIsShow(false)
            }} style={(data) => [styles.btn, {backgroundColor:"orange"}, data.pressed && {opacity:0.5}]}> */}
                {/* <Text style={styles.btnText}>Hide</Text> */}
      <Modal visible={isShow} animationType='fade' transparent={true}>
      <View style={styles.container}>
        

                <Text></Text>
                <View style={{width:"100%", marginVertical:16}}>
                  
                  
                  
                  <TextInput onChangeText={setInputVal1} style={styles.inputText}/>
                  <View>
                    <Text style={{fontSize:14}}>{condition1}</Text>
                  </View>
                  <TextInput onChangeText={setInputVal2} style={styles.inputText}/>
                  <View>
                    <Text style={{fontSize:14}}>{condition2}</Text>
                  </View>
                  <TextInput onChangeText={setInputVal3} style={styles.inputText}/>
                  <View>
                    <Text style={{fontSize:14}}>{condition3}</Text>
                  </View>
                  <TextInput keyboardType='number-pad' maxLength={10} onChangeText={setInputVal4} style={styles.inputText}/>
                  <View>
                    <Text style={{fontSize:14}}>{condition4}</Text>
                  </View>
                  <TextInput onChangeText={setInputVal5} style={styles.inputText}/>
                  <View>
                    <Text style={{fontSize:14}}>{condition5}</Text>
                  </View>
                  

                  

                </View>
                <View style={{width:"100%"}}>
                  <Button onPress={onBtnPress1} title='send'color={"red"}>
                  </Button>
                </View>
                
            {/* </Pressable> */}
        </View>
      </Modal>
    
      <Pressable onPress={onBtnPress} style={(data) => [styles.btn,data.pressed && {opacity:0.5}]}>
          <Text style={styles.btnText}>add user</Text>
 
      </Pressable>
    </>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        // backgroundColor: "rgba(255,255,255,0.7)",
        backgroundColor: "silver",
        alignItems: 'center', 
        // justifyContent: 'center', 

      },
    inputText: {
      height:40, 
      borderWidth:1, 
      backgroundColor:"white",
      paddingHorizontal:8

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