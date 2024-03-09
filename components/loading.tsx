import { ActivityIndicator, Text, View } from 'react-native';
import { useStyles } from 'react-native-unistyles';


export default function Loading() {
  const { theme } = useStyles();
  return (
    <View
      style={{
        alignItems: 'center',
        gap: 10,
      }}
    >
      <ActivityIndicator color={theme.colors.foreground} size={40} />
      <Text>Carregando...</Text>
    </View>
  );
}
