import React from "react";
import { Text, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

type TLabel =  {
    label: string,
    required?: boolean,
    children: React.ReactNode
    message?: string
}

export function Label({ label, required = false, children, message }: TLabel) {
    const { styles } = useStyles(stylesheet)

    return(
        <View style={{ position: 'relative' }}>
            <Text style={styles.text}>{label} {required && <Text style={{ color: 'red' }}> *</Text>}</Text>
            {children}
            {message && <Text style={{ color: 'red' }}>{message}</Text>}
        </View>
    )
}

const stylesheet = createStyleSheet( theme => ({
    text: {
        color: theme.colors.foreground,
        marginBottom: 6,
        fontSize: 16,
    }
}));