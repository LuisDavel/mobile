import React from "react";
import { TextInput, TextInputProps, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

type TInput = {
    icon?: React.ReactNode
} & TextInputProps

export function Input({ icon, ...props } : TInput) {
    const { styles, theme } = useStyles(stylesheet)
    const [isFocus, setIsFocus] = React.useState(false);
    const [onBlur, setOnBlur] = React.useState(false);

    function handleInputFocus() {
        setIsFocus(!isFocus);
    }

    function handleInputBlur() {
        setIsFocus(false);
        setOnBlur(!!onBlur);
    }
    
    return(
        <View>
            <TextInput 
                style={[styles.input, styles.text, isFocus && { borderColor: theme.colors.ring }]} 
                focusable={isFocus}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                {...props} 
            />
            {icon}
        </View>
    )
}

const stylesheet = createStyleSheet( theme => ({
   input: {
        paddingVertical:  theme.padding[8],
        paddingHorizontal: theme.padding[12],  
        borderWidth: 1,
        borderRadius: 6,
        borderColor: theme.borderColor,
    },
    text: {
        color: theme.colors.foreground,
        fontSize: 14,
    }
}));