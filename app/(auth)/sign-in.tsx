import { Alert, Image, Keyboard, Pressable, TouchableWithoutFeedback, View } from "react-native";
import { Form } from "@/components/input";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";
import { LucideEye, LucideEyeOff, User } from "lucide-react-native";
import React from "react";
import {  SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
import { LoginSchema, resolver } from "./schema";
import { AxiosError } from "axios";
import { Button } from "@/components/button";

export default function SignInPage() {
  const { styles, theme } = useStyles(stylesheet)
  const { signIn } = useAuth();
  const [isLoading, setIsLoading] = React.useState(false);
  const insets = useSafeAreaInsets()
  const methods = useForm<LoginSchema>({
    resolver
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const [isVisiblePassword, setIsVisiblePassword] = React.useState(false)

  const handleSetVisiblePassword = React.useCallback(() => {
    return setIsVisiblePassword(prev => !prev)
  }, [isVisiblePassword])

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    setIsLoading(true);

    if (!data.username.trim() || !data.password.trim()) {
      setIsLoading(false);
      return Alert.alert('Erro', 'Todos os campos são obrigatórios');
    }

    try {
      await signIn(data.username, data.password);
      setIsLoading(false);
    } catch (err: any | AxiosError) {
      console.log(err.response.data.message);
    }
    return;
  };

  function EyeIcon() {
    return (
      <Pressable hitSlop={20} onPressOut={handleSetVisiblePassword} onPressIn={handleSetVisiblePassword} style={styles.iconEye}>
        {!isVisiblePassword ? <LucideEye size={24} color={theme.colors.foreground} /> : <LucideEyeOff size={24} color={theme.colors.foreground} />}
      </Pressable>
  )}
  
  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      accessible={false}
    >
      <View style={styles.content(insets)}>
        <Image
          style={{ width: 400, height: 240 }}
          source={require('../../assets/images/logo.png')}
        />
        <View style={styles.formContent} >
          <Form.Label message={errors.username?.message} label="Usuário" required>
            <Form.ControlledInput name="username" placeholder="Usuário" control={methods.control} icon={<User style={styles.iconEye} size={24} color={theme.colors.foreground} />} />
          </Form.Label>
          <Form.Label message={errors.password?.message} label="Senha" required>
            <Form.ControlledInput name="password" placeholder="Senha" control={methods.control}icon={<EyeIcon />} secureTextEntry={!isVisiblePassword} /> 
          </Form.Label>
          <View style={{ flexDirection: 'row' }}>
            <Button title="Enviar" isLoading={isLoading} onPress={handleSubmit(onSubmit)} />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const stylesheet = createStyleSheet( theme => ({
  content: (insets: EdgeInsets) => ({
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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