import { Stack, router } from 'expo-router';
import '@/styles/unistyles'
import { StatusBar } from 'expo-status-bar';
import { UnistylesRuntime, useStyles } from 'react-native-unistyles';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from '@/context/authContext';
import { LucideArrowLeft, LucideSettings } from 'lucide-react-native';
import { Pressable } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export {
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  const queryClient = new QueryClient()

  const { themeName }  = UnistylesRuntime
  const  { theme } = useStyles()

  function handleRedirect(){
    return router.push('/(auth)/config')
  }
  
  function handleGoBackRedirect(){
    return router.back()
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BottomSheetModalProvider>
            <StatusBar style={themeName == 'dark' ? 'light' : 'dark'} translucent backgroundColor={theme.colors.background} />
            <Stack 
              initialRouteName='(auth)/sign-in'
            >
              <Stack.Screen name="(private)" options={{ headerShown: false }} />
              <Stack.Screen name="(auth)/config" 
                options={{ 
                  title: '',
                  headerShadowVisible: false, 
                  headerStyle:{
                    backgroundColor: theme.colors.background
                  },
                  contentStyle: {
                    backgroundColor: theme.colors.background
                  },
                  headerLeft: () => {
                    return (
                      <Pressable hitSlop={20} onPress={handleGoBackRedirect}>
                        <LucideArrowLeft size={24} color={theme.colors.foreground} />
                      </Pressable>
                    )
                  } 
                }} 
              />
              <Stack.Screen name="modal" options={{ presentation: 'modal', animation:'slide_from_bottom' }} />
              <Stack.Screen 
                name="(auth)/sign-in" 
                options={{ 
                  animation: 'fade_from_bottom', 
                  title: '',
                  headerShadowVisible: false, 
                  headerStyle:{
                    backgroundColor: theme.colors.background
                  },
                  contentStyle: {
                    backgroundColor: theme.colors.background
                  },
                  headerLeft: () => {
                    return (
                      <Pressable hitSlop={20} onPress={handleRedirect}>
                        <LucideSettings size={24} color={theme.colors.foreground} />
                      </Pressable>
                    )
                  } 
                }} />
            </Stack>
          </BottomSheetModalProvider>
        </AuthProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
