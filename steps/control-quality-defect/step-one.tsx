import { TStepProps } from "@/@types/general";
import { TDefect, TProductRequest } from "@/@types/request";
import { Form } from "@/components/input";
import MultiPicker from "@/components/input/selectTest";
import { Select } from "@/components/select";
import { useFetch } from "@/hooks/useFetch";
import { useOnRequired } from "@/hooks/useOnRequired";
import { addLabelAndValue } from "@/util/functions/handle-options-props";
import React from "react";
import { View } from "react-native";
import { NativeViewGestureHandler } from "react-native-gesture-handler";
import { createStyleSheet, useStyles } from "react-native-unistyles";

export function StepOne(props: TStepProps) {
    const { methods, onRequired } = props
    const { styles } = useStyles(stylesheet)
    const [selectedDefects, setSelectedDefects] = React.useState([]);
    const [selectedProducts, setSelectedProducts] = React.useState([]);
    const { data: dataProduct, isLoading: loadingProduct } = useFetch<TProductRequest[]>({ url: `v3/util/fichaprod/ativo/${1}`})
    const { data: dataDefect, isLoading: loadingDefect } = useFetch<TDefect[]>({ url: 'v3/util/defeito/ativo/'})
    const itemProduct = !loadingProduct ? addLabelAndValue( dataProduct, 'DESCRICAO', 'ID', 'REFERENCIA') : []
    const itemDefect = !loadingDefect ? addLabelAndValue( dataDefect, 'DESCRICAO', 'ID') : []
    const handleSelectedItemsChangeProduct = React.useCallback(
        (newSelectedItems: any) => {
          setSelectedProducts(newSelectedItems);
          methods.setValue('product', newSelectedItems);
        },
        [methods]
    );
    const handleSelectedItemsChange = React.useCallback(
        (newSelectedItems: any) => {
          setSelectedDefects(newSelectedItems);
          methods.setValue('defects', newSelectedItems);
    
          const values = methods.getValues('values');
          const result = newSelectedItems?.map(
            (v: { ID: number; DESCRICAO: string }) => ({
              c: values.find((val: { id: number }) => val?.id == v.ID)?.c || 0,
              id: v.ID,
              label: v.DESCRICAO,
              q: values.find((val: { id: number }) => val?.id == v.ID)?.q || 0,
            })
          );
    
          methods.setValue('values', result);
        },
        [methods]
    );

    useOnRequired(['product'], {
        methods,
        onRequired,
    });
    console.log(methods.getValues('product'))
    return (
        <View style={styles.container}>
            <Form.Label label="Selecione um Produto" required >
                <MultiPicker 
                    isSearch={true}
                    isMulti={false}
                    test={methods.getValues('product') || []}
                    value={selectedProducts}
                    placeholder="Selecione ou pesquise um Produto"
                    data={itemProduct || []}
                    onChange={handleSelectedItemsChangeProduct}
                    isLoading={loadingProduct}
                />
                {/* <Select 
                    data={itemProduct} 
                    name="product"
                    placeholder="Produto"
                    setState={methods.setValue}
                    value={methods.getValues('product')}
                /> */}
            </Form.Label>
            <Form.Label label="Selecione um ou mais Defeitos" required >
                <MultiPicker
                    isSearch={true}
                    isMulti={true}
                    test={methods.getValues('defects') || []}
                    value={selectedDefects}
                    placeholder="Selecione ou pesquise um Defeito"
                    data={itemDefect || []}
                    onChange={handleSelectedItemsChange}
                    isLoading={loadingDefect}
                />
                {/* <Select name="defect" data={itemDefect} placeholder="Produto"/> */}
            </Form.Label>
        </View>
    )
}

const stylesheet = createStyleSheet( theme => ({
    container: {
        gap: 10,
        marginBottom: 20,
    }
}))