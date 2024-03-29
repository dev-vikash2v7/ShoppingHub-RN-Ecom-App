import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { scale } from 'react-native-size-matters'
import { Colors, fontSize } from '../../constants/theme'
export default function Label({text,style}) {
    return (
    <Text style={[styles.label,style]}>{text}</Text>
    )
}

const styles = StyleSheet.create({
    label:{
        fontSize:fontSize.regular,
        color:Colors.black,
        
    }
})
