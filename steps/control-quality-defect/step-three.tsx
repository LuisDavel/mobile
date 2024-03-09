import { TStepProps } from "@/@types/general";
import { Form } from "@/components/input";
import { useOnRequired } from "@/hooks/useOnRequired";
import { View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

export function StepThree(props: TStepProps) {
    const { methods, onRequired } = props
    const { styles } = useStyles(stylesheet)
    useOnRequired(['sample', 'tone'], {
        methods,
        onRequired,
    });

    return (
        <View style={styles.container}>
            <Form.Label label="Amostra" required >
                <Form.ControlledInput keyboardType="number-pad" placeholder="Informe uma amostra" control={methods.control} name="sample" />
            </Form.Label>
            <Form.Label label="Tom" required >
                <Form.ControlledInput keyboardType="number-pad" placeholder="Informe um tom" control={methods.control} name="tone" />
            </Form.Label>
            <Form.Label label="Tonalidade/Lote" required >
                <Form.ControlledInput placeholder="Informe uma tonalidade" control={methods.control} name="tonality" />
            </Form.Label>
        </View>
    )
}

const stylesheet = createStyleSheet( theme => ({
    container: {
        gap: 10,
    }
}))