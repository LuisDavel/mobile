import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosResponse } from "axios";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import * as z from 'zod';
import { Button } from "./button";
import { LucideArrowLeft, LucideArrowRight, LucideSend } from "lucide-react-native";

interface StepModalProps<DataFormT extends FieldValues, DataRequestT> {
    schema: any;
    onSubmit: (
      data: DataFormT
    ) => Promise<AxiosResponse<DataRequestT[], any> | undefined>;
    steps: React.ElementType[];
    defaultValue?: any;
  }

export function StepModal<
    DataFormT extends FieldValues,
    DataRequestT = any,
> (props: StepModalProps<DataFormT, DataRequestT>) {
    const { schema, onSubmit, steps, defaultValue } = props;
    const { styles } = useStyles(stylesheet)
    const [currentStep, setCurrentStep] = React.useState(1);
    const [areRequiredFieldFilled, setAreRequiredFieldsFilled] = React.useState(false);
    
    const handleAreRequiredFieldsFilled = (value: boolean) => {
      return value
        ? setAreRequiredFieldsFilled(value)
        : setAreRequiredFieldsFilled((prev) => !prev);
    };

    const methods = useForm({
        defaultValues: defaultValue,
        resolver: zodResolver(schema),
    });
    
    const {
      control,
      handleSubmit,
      formState: { errors },
    } = methods;

    const componentElement = steps.map((Component) => (
        <Component
            onRequired={handleAreRequiredFieldsFilled}
            control={control}
            methods={methods}
            errors={errors}
        />
    ));
    
    const handleBack = React.useCallback(() => {
        if (currentStep === 1) return;
        setCurrentStep(currentStep - 1);
    }, [currentStep]);

    const handleNext = React.useCallback(() => {
        if (currentStep == steps.length) return;
        setCurrentStep((currentStep) => currentStep + 1);
    }, [currentStep, steps.length]);

    return (
        <View style={styles.container}>
            {componentElement[currentStep - 1]}
            <View style={styles.button}>
                {currentStep > 1 && (
                    <Button 
                        variants="md"
                        onPress={handleBack}
                        icon={<LucideArrowLeft style={styles.iconLeft} size={25} color={'white'} /> } 
                        title="Voltar" 
                    />
                )}
                {currentStep != steps.length ? (
                    <Button 
                        disabled={areRequiredFieldFilled}
                        variants="md"
                        onPress={handleNext}
                        icon={<LucideArrowRight style={styles.iconRight} size={25} color={'white'} />} 
                        title="Próximo" 
                    />
                ): (
                    <Button 
                        disabled={areRequiredFieldFilled}
                        variants="md"
                        color="send"
                        onPress={handleNext}
                        icon={<LucideSend style={styles.iconRight} size={25} color={'white'} />} 
                        title="Enviar" 
                    />
                )}
            </View>
        </View>
    )
}

const stylesheet = createStyleSheet( theme => ({
    container: {
        gap: 10,
        padding: theme.padding[12],
    },
    button: {
        gap: 10,
        flexDirection: 'row'
    },
    iconLeft: {
        position: 'absolute', 
        left: 12,
        bottom: 14
    },
    iconRight: {
        position: 'absolute', 
        right: 12,
        bottom: 14
    }
}));
  