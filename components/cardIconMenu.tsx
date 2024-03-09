import { router } from "expo-router"
import React from "react"
import { Pressable, Text, View } from "react-native"
import { createStyleSheet, useStyles } from "react-native-unistyles"

type TCardMenu = {
    description: string
    redirect: string
    icon: React.ReactNode
}

export function CardMenu(props: TCardMenu) {
    const { description, icon, redirect } = props
    const { styles } = useStyles(stylesheet)
    const handleRedirect = React.useCallback(() => {
        return router.push(`/${redirect}` as any)
    },[])

    return (
        <Pressable style={styles.container} onPress={handleRedirect}>
            <View style={[styles.icon, styles.shadow]}>
                {icon}
            </View>
            <Text style={styles.text}>{description}</Text>
        </Pressable>
    )
}

const stylesheet = createStyleSheet (theme => ({
    container:{
        alignItems: 'center',
        maxWidth: 100
    },
    text:{
        fontSize: 14,
        textAlign: 'center',
        color: theme.colors.foreground,
        fontWeight: '500'
    },
    icon:{
        backgroundColor: theme.colors.background,
        borderWidth: 1,
        borderColor: theme.borderColor,
        borderRadius: 10,
        padding: theme.padding[14],
        marginBottom: theme.margins[10],
    },
    shadow:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 1,
        shadowRadius: 3.84,
        elevation: 4,
    }
}))