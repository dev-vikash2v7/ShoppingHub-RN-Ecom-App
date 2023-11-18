import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Colors, fontSize } from '../../constants/theme';
import { ScaledSheet } from 'react-native-size-matters';

const Button = (props) => {
    const filledBgColor = props.color || Colors.primary;
    const outlinedColor = Colors.white;
    const bgColor = props.filled ? filledBgColor : outlinedColor;
    const textColor = props.filled ? Colors.white : Colors.primary;

    return (
        <TouchableOpacity
            style={{
                ...styles.button,
                ...{ backgroundColor: bgColor },
                ...props.style
            }}
            onPress={props.onPress}
        >
            <Text style={{ fontSize: fontSize.large, ... { color: textColor } }}>{props.title}</Text>
        </TouchableOpacity>
    )
}

const styles = ScaledSheet.create({
    button: {
        paddingBottom: '16@vs',
        paddingVertical: '10@vs',
        borderColor: Colors.primary,
        borderWidth: '2@s',
        borderRadius: '12@ms',
        alignItems: 'center',
        justifyContent: 'center'
    }
})
export default Button