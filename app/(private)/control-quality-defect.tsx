import { Button } from '@/components/button';
import { HeaderComponent } from '@/components/header';
import Modal, { TComportModalProps } from '@/components/modal';
import { StepModal } from '@/components/step-modal';
import { useFetch } from '@/hooks/useFetch';
import { StepOne, StepThree, StepTwo } from '@/steps/control-quality-defect';
import { qualityDefectsSchema } from '@/steps/control-quality-defect/schema';
import { api } from '@/util/axios/axios';
import { formatDate } from '@/util/functions/formatDate';
import { removeHourZeros } from '@/util/functions/functionHours';
import { addLabelAndValue } from '@/util/functions/handle-options-props';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { Alert, FlatList, Pressable, ScrollView, Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import * as z from 'zod'

export type TItem = {
  ID: number;
  FLAG: {
    ID: number;
    DESCRICAO: string;
  };
  DATA: string;
  HORA: string;
  QUALIDADE: number;
  AMOSTRA: number;
  INDICE: number;
  TOM: number;
  TONALIDADE: string;
  QUANTIDADE: {
    C: number;
    QUEBRA: number;
  };
  PRODUTO: {
    ID: number;
    REFERENCIA: number;
  };
  DEFEITO: {
    ID: number;
    DESCRICAO: string;
  };
  USUARIO: {
    ID: number;
    NOME: string;
  };
};

const formSchema = z.object({
  product: z.string(),
  defect: z.string(),
  tone: z.string(),
  sample: z.string(),
})

export default function ControlQualityDefect() {
  const [ itemSelected, setItemSelected ] = React.useState<TItem | null>(null)
  const refModal = React.useRef<TComportModalProps>(null)

  const { data, isLoading, refetch} = useQuery({
    queryKey: ['query-control-quality-defects'],
    queryFn: async function fetch(){
      const res = await api.get<TItem[]>(`v3/retifica/defeito/${1}/${28}`)
      if(res.status === 200) return res.data
    },
  })
 
  const { styles } = useStyles(stylesheet)

  const onSubmit: SubmitHandler<qualityDefectsSchema> = async (data) => {
    
    return;
  };

  const handleSelect = React.useCallback((index: number) => {
    const find = data[index]
    return setItemSelected(find)
  }, [itemSelected, data])

  const handleCancel = React.useCallback(() => {
    if (!itemSelected)
      return Alert.alert(
        'Selecione um registro',
        'Selecionar um registro antes de cancelar!'
      );

    if (itemSelected.FLAG.ID == 1){
      return Alert.alert(
        'Registro ja cancelado',
        'Selecione um outro registro para realizar está ação.'
      );
    }

    Alert.alert('Deseja realizar esta ação?', '', [
      {
        style: 'cancel',
        text: 'Não',
      },
      {
        onPress: async () => {
          try {
            await api.put(`v3/retifica/defeito/${itemSelected?.ID}`);
            refetch();
            Alert.alert('', 'Registro cancelado com sucesso');
          } catch (err: any | AxiosError) {
            console.log(err.response.data.message);
          }
        },
        text: 'Sim',
      },
    ]);

    return setItemSelected(null);
  }, [itemSelected]);

  const title = React.useMemo(() => [
    'Situação',
    'Data',
    'Hora',
    'Referência',
    'Defeito',
    'Qtd. C',
    'Qtd. Quebra',
    'Qtd Amostra',
    'Índice de Qualidade',
    'Tom',
    'Tonalidade/Lote',
    'Usuário',
  ], [data]);

 const steps = React.useMemo(() => [
   StepOne,
   StepTwo,
   StepThree,
 ], []);

  return (
    <View style={styles.container}>
      {/* <HeaderComponent /> */}
      <ScrollView
          disableIntervalMomentum
          horizontal
          showsHorizontalScrollIndicator={false}
      >
        <View style={{ zIndex: 0 }}>
          <View style={[styles.header, styles.border]}>
            {title.map((value, index) => (
              <Text key={index} style={styles.headerItem}>
                {value}
              </Text>
            ))}
          </View>
          <FlatList
            data={data}
            renderItem={({ item, index }) => {
              return (
                <Pressable
                  style={[styles.row(itemSelected?.ID == item.ID), styles.border]}
                  onPress={() => handleSelect(index)}
                  key={index}
                >
                  <Text
                    style={[styles.cell, styles.situation(item.FLAG.ID != 0)]}
                  >
                    {item.FLAG.DESCRICAO}
                  </Text>
                  <Text style={styles.cell}>{formatDate(item.DATA)}</Text>
                  <Text style={styles.cell}>
                    {removeHourZeros(item.HORA)}
                  </Text>
                  <Text style={styles.cell}>{item.PRODUTO.REFERENCIA}</Text>
                  <Text style={styles.cell}>{item.DEFEITO.DESCRICAO}</Text>
                  <Text style={styles.cell}>{item.QUANTIDADE.C}</Text>
                  <Text style={styles.cell}>{item.QUANTIDADE.QUEBRA}</Text>
                  <Text style={styles.cell}>{item.AMOSTRA}</Text>
                  <Text style={styles.cell}>{item.INDICE}</Text>
                  <Text style={styles.cell}>{item.TOM}</Text>
                  <Text style={styles.cell}>{item.TONALIDADE}</Text>
                  <Text style={styles.cell}>{item.USUARIO.NOME}</Text>
                </Pressable>
              );
            }}
          />
        </View>
      </ScrollView>
      <View style={styles.bottom}>
        <Button title='Adicionar' onPress={() => refModal.current?.handlePresentModal()} />
        <Button title='Cancelar' color='cancel' onPress={handleCancel} />
      </View>

      <Modal enableDynamicSizing ref={refModal} >
          <StepModal onSubmit={onSubmit}  schema={formSchema} steps={steps} />
      </Modal>
    </View>
  );
}

const stylesheet = createStyleSheet( theme => ({
  container: {
    flex: 1,
  },
  bottom: {
    flexDirection: 'row', 
    gap: 10,
    padding: theme.padding[12]
  },
  cell: {
    color: theme.colors.foreground,
    fontSize: 16,
    textAlign: 'center',
    width: 200,
  },
  situation: (active: boolean) => ({
    backgroundColor: active ? 'orange' : 'transparent',
    padding: 14,
  }),
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
  },
  headerItem: {
    color: theme.colors.foreground,
    opacity: 0.8,
    fontSize: 20,
    textAlign: 'center',
    width: 200,
  },
  border: {
    borderBottomWidth: 1,
    borderColor: theme.borderColor,
  },
  row: (active: boolean) => ({
    zIndex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
    backgroundColor: active ? theme.colors.muted : 'transparent'
  }),
}));
