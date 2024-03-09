import React from 'react';
import { Stack, router } from 'expo-router';
import { useStyles } from 'react-native-unistyles';
import { Pressable } from 'react-native';
import { LucideArrowLeft } from 'lucide-react-native';

export default function TabLayout() {
  const  { theme } = useStyles()
  function handleGoBackRedirect(){
    return router.back()
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          contentStyle: {
            backgroundColor: theme.colors.background
          },
        }}
      />
      <Stack.Screen
        name="control-quality-defect"
        options={{
          headerLeft: () => {
            return (
              <Pressable hitSlop={20} onPress={handleGoBackRedirect}>
                <LucideArrowLeft size={24} color={theme.colors.foreground} />
              </Pressable>
            )
          },
          headerTitleAlign: 'center',
          contentStyle: {
            backgroundColor: theme.colors.background
          },
          title: 'Controle de qualidade e defeito',
        }}
      />
    </Stack>
  );
}
