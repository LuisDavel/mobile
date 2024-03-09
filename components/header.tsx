import {  View, Pressable, Text } from 'react-native';
import { Settings2 , Settings, Search, LogOut } from 'lucide-react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { ChangeThemeButton } from '@/components/changeTheme';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect, useRouter } from 'expo-router';
import React from 'react';
import Modal, { TComportModalProps } from './modal';
import { Form } from './input';
import { useAuth } from '@/hooks/useAuth';
import { useCredentialStore, useFilterStore } from '@/util/store/filterStore';
import { Button } from './button';
import { Select } from './select';
import { useForm } from 'react-hook-form';

import * as z from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'
import { useFetch } from '@/hooks/useFetch';
import { addLabelAndValue } from '@/util/functions/handle-options-props';
import { TOptionLineRequest, TOptionUnitRequest } from '@/@types/request';
import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from '@/util/axios/axios';
import Loading from './loading';

const formSchema = z.object({
  unit: z.object({
    label: z.string(),
    value: z.number(),
  }),
  line: z.object({
    label: z.string(),
    value: z.number(),
  }),
})

export const resolver = zodResolver(formSchema)

export type headerSchema = z.infer<typeof formSchema>

export function HeaderComponent() {
  const { styles, theme } = useStyles(stylesheet)
  const { credential } = useCredentialStore();
  const { data: unitData, isLoading: unitLoading} = useQuery({
    queryKey: ['query-unit'],
    queryFn: async function fetch(){
      const res = await api.get<TOptionUnitRequest[]>(`v3/unidade/usuario/${credential?.userid}`)
      if(res.status === 200) return addLabelAndValue(res.data, 'DESCRICAO', 'ID')
    },
  })
  
  const {
    mutate,
    data: mutateData,
  } = useMutation({
    mutationFn: async (unit:  number ) => {
      const res = await api.get<TOptionLineRequest[]>(`v3/util/linha/usuario/${unit}/${credential?.userid}`)
      console.log(res.data)
      if(res.status === 200) return addLabelAndValue(res.data, 'DESCRICAO', 'ID')
    },
    mutationKey: ['get_mutate_line'],
  });

  const { signOut } = useAuth()
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const refModal = React.useRef<TComportModalProps>(null)
  const { setFilter, filters } = useFilterStore();
  const methods = useForm<headerSchema>({
    resolver
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  useFocusEffect(()=> {
    if(filters){
      return refModal.current?.handlePresentModal()
    }
  })

  return (  
    <View style={styles.container(insets)}>
        <Pressable onPress={() => refModal.current?.handlePresentModal()}>
          <Settings2 size={25} color={theme.colors.foreground} />
        </Pressable> 
        <View style={styles.containerSearch}>
            <Pressable onPress={() => router.push('/modal')}>
                <Search size={25} color={theme.colors.foreground} />
            </Pressable>
            <Pressable onPress={() => signOut()}>
                <LogOut size={25} color={theme.colors.foreground} />
            </Pressable>
            <Pressable onPress={() => router.push('/modal')}>
                <Settings size={25} color={theme.colors.foreground} />
            </Pressable>
        </View>
        <ChangeThemeButton />
        <Modal ref={refModal} enableDynamicSizing={true}>
          <View style={styles.containerModal(insets)}>
            <Form.Label label={'Unidade'} required>
              <Select 
                options={{ control: methods.control, name: 'unit' }} 
                onChangeValue={(value) => {
                  if(!value) return
                  mutate(value)
                }}
                data={unitData as []} 
                isLoading={unitLoading} 
                placeholder='Unidade' 
              /> 
            </Form.Label>
            <Form.Label label={'Linha'} required>
              <Select 
                options={{ control: methods.control, name: 'line' }} 
                data={mutateData as []} 
                isLoading={unitLoading} 
                placeholder='Linha' 
              /> 
            </Form.Label>
            <View style={{ flexDirection: 'row' }}>
              <Button title='Filtrar' />
            </View>
          </View>
        </Modal>
    </View>
  );
}

const stylesheet = createStyleSheet( theme => ({
  containerModal: (insets:EdgeInsets ) => ({
    padding: insets.top * 0.8,
    gap: 10,
  }),
  container: (insets:EdgeInsets ) => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: insets.top,
    paddingHorizontal: 20,
    padding: theme.padding[10],
    backgroundColor: theme.colors.background
  }),
  containerSearch: {
    gap: 20,
    flexDirection: 'row'
  }
}));
