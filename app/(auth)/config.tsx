import { Button } from "@/components/button";
import { Form } from "@/components/input";
import { api } from "@/util/axios/axios";
import { useEndPointStore } from "@/util/store/filterStore";
import { format } from "date-fns";
import { router } from "expo-router";
import React from "react";
import { Alert, View } from "react-native";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";
import { createStyleSheet, useStyles } from "react-native-unistyles";

export default function ConfigPage() {
  const insets = useSafeAreaInsets()
  const { styles, theme } = useStyles(stylesheet)
  const [user, setUser] = React.useState('');
  const [isVisible, setIsVisible] = React.useState(false);
  const [isVisiblePassword, setIsVisiblePassword] = React.useState(false);
  const [value, setValue] = React.useState('');

  const { setEndPoint, endpoint } = useEndPointStore();

  const handleEnv = (value: string) => {
    if(!value) return
    setEndPoint(value);
    api.defaults.baseURL = value;
    Alert.alert('', 'Endpoint informado com sucesso');
    return router.back()
  };

  const handleAcess = (value: string) => {
    if (!user.trim() || user != 'admin') return;
    const date = format(new Date(), 'dd/MM/yyyy');

    if (date == value) {
      return setIsVisible((prev) => !prev);
    }
  };

  const toggle = () => {
    setIsVisiblePassword((prev) => !prev);
  };

  const ENVs = [
    {
      label: 'DEXCO',
      value: process.env.EXPO_PUBLIC_DEXCO_API_URL,
    },
    {
      label: 'TESTE - HTTP',
      value: process.env.EXPO_PUBLIC_TESTE_API_URL,
    },
    {
      label: 'TESTE - INTERNO',
      value: process.env.EXPO_PUBLIC_INTERNALTEST_DEXCO_API_URL,
    },
  ];
  return (
    <View style={styles.content(insets)}>
      <View style={styles.formContent}>
        <Form.Label required label="Usuário iForth">
          <Form.Input />
        </Form.Label>
        <Form.Label required label="Senha iForth">
          <Form.Input />
        </Form.Label>
        <View style={{ flexDirection: 'row' }}>
          <Button title="Configurar" onPress={() => handleEnv(process.env.EXPO_PUBLIC_TESTE_API_URL!)} />
        </View>
      </View>
    </View>
  );
}


const stylesheet = createStyleSheet( theme => ({
  content: (insets: EdgeInsets) => ({
    flex: 1,
    padding: insets.top,
  }),
  iconEye: { 
    position: 'absolute', 
    bottom: 10, 
    right: 12, 
    zIndex: 10
  },
  formContent: {
    gap: 20,
    width: '100%',
  }
}))