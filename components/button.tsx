import { ActivityIndicator, Pressable, PressableProps, Text, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

type TButton = {
    title: string,
    icon?: React.ReactNode,
    isLoading?: boolean,
    variants?: 'sm' | 'md' | 'lg',
    color?: "cancel" | "add" | "rnc" | "send"
} & PressableProps

export function Button(props: TButton){
    const {title, isLoading, variants='md', icon, color} = props
    const { styles } = useStyles(stylesheet, {
        size: variants,
        color: color
    })
    const size = {
        sm: 12,
        md: 16,
        lg: 24,
   }
    return (
        <Pressable style={styles.container} {...props}>
            {isLoading ? <ActivityIndicator size={size['md']} color={'#ffffff'} /> 
            : <Text style={styles.text}>{title}</Text>}
            {icon && icon} 
        </Pressable>
    )
}

const stylesheet = createStyleSheet( theme => ({
    container: {
        backgroundColor: '#2563EB',
        flexDirection: 'row',
        position: 'relative',
        flex: 1,
        padding: theme.padding[16],
        borderRadius: 6,
        justifyContent: 'center',

        variants: {
            color: {
                default:{
                    backgroundColor: '#2563EB'
                },
                cancel: {
                    backgroundColor: theme.colors.cancel
                },
                add: {
                    backgroundColor: theme.colors.add
                },
                rnc: {
                    backgroundColor: theme.colors.rnc
                },
                send: {
                    backgroundColor: theme.colors.send
                },
           }
        }
    },
    text: {
        variants: {
           size: {
                sm: {
                    fontSize: 12,
                },
                md: {
                    fontSize: 16,
                },
                lg: {
                    fontSize: 24,
                },
           },
        },
        color: '#ffffff'
    }
,
}))