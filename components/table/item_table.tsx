import { Text } from "lucide-react-native";
import { StyleProp, ViewStyle } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

type TItemTable = {
    value: string | number
    style?: StyleProp<ViewStyle>
}

export function ItemsTable({ value, style }: TItemTable){
    const { styles } = useStyles(stylesheet);

    return (
        <>
      <Text style={[styles.cell, style ]}>{'value'}</Text>
      </>
    )
}

const stylesheet = createStyleSheet((theme) => ({
    cell: {
      color: 'black',
      fontSize: 16,
      textAlign: 'center',
      width: 200,
    },
}));
  