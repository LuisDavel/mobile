import { Container, Moon, Sun } from "lucide-react-native"
import React from "react"
import { Pressable, Switch, Text, View } from "react-native"

import { UnistylesRuntime, createStyleSheet, useStyles } from "react-native-unistyles"

type TCardMenu = {
    description: string
    icon: React.ReactNode
}

export function ChangeThemeButton() {
    const [isEnabled, setIsEnabled] = React.useState(true);
    const { setTheme } = UnistylesRuntime
    const toggleSwitch = () => {
        setTheme(!isEnabled ? 'light' : 'dark')
        setIsEnabled(previousState => !previousState);
    }
    const { styles, theme } = useStyles(stylesheet)
    return (
        <View style={styles.container}>
            <Moon size={20} color={!isEnabled ? theme.colors.ring : theme.colors.foreground} />
            <Switch
                trackColor={{false: '#b4b4b4', true: '#b4b4b4'}}
                thumbColor={isEnabled ? '#ffffff' : '#000000'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
            <Sun size={20} color={isEnabled ? theme.colors.ring : theme.colors.foreground}/>
        </View>
    )
}

export const stylesheet = createStyleSheet (theme => ({
    container:{
        flexDirection:'row',
        alignItems: 'center'
    },
    text: {
        fontSize: 14,
        fontWeight: '500'
    },
    icon: {
        backgroundColor: theme.colors.background,
        borderRadius: 10,
        padding: theme.padding[14],
        marginBottom: theme.margins[10],
    }
}))