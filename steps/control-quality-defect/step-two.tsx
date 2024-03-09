import { TStepProps } from "@/@types/general";
import { Form } from "@/components/input";
import { useOnRequired } from "@/hooks/useOnRequired";
import { View } from "react-native";

export function StepTwo(props: TStepProps) {
    const { methods, onRequired } = props

    // useOnRequired(['product', 'defects'], {
    //     methods,
    //     onRequired,
    // });

    return (
        <View>
            <Form.Label label="Selecione um Produto" required >
                <></>
            </Form.Label>
            <Form.Label label="Selecione um ou mais Defeitos" required >
                <></>
            </Form.Label>
        </View>
    )
}