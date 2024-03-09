import React from "react";
import { Control, Controller } from "react-hook-form";
import { TextInput, TextInputProps, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

type TInput = {
    onValueChanged?: (val: any) => void,
    control: Control<any>,
    name: string,
    icon?: React.ReactNode
} & TextInputProps

export function ControlledInput({ control, name, onValueChanged, icon, ...props } : TInput) {
    const { styles, theme } = useStyles(stylesheet)
    const [isFocus, setIsFocus] = React.useState(false);
    const [onBlur, setOnBlur] = React.useState(false);

    const handleInputFocus = React.useCallback(() => {
        setIsFocus(!isFocus);
    },[isFocus])

    const handleInputBlur = React.useCallback(() => {
        setIsFocus(false);
        setOnBlur(!!onBlur);
    }, [])
   
    return(
        <View>
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        focusable={isFocus}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        value={value}
                        onChangeText={(val) => {
                            onChange(val);
                            if (onValueChanged) {
                                onValueChanged(val);
                            }
                      }} 
                      style={[styles.input, styles.text, isFocus && { borderColor: theme.colors.ring }]} 
                      {...props}
                    />
                )}
            />
            
            {icon}
        </View>
    )
}

const stylesheet = createStyleSheet( theme => ({
   input: {
        paddingVertical:  8,
        paddingHorizontal: 12,  
        borderWidth: 1,
        borderRadius: 6,
        borderColor: theme.borderColor,
    },
    text: {
        color: theme.colors.foreground,
        fontSize: 14,
    }
}));