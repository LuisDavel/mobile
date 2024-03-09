import {  View, Text, FlatList} from 'react-native';
import { Box, Camera } from 'lucide-react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { CardMenu } from '@/components/cardIconMenu';
import React from 'react';
import { HeaderComponent } from '@/components/header';

export default function TabOneScreen() {
  const { styles, theme } = useStyles(stylesheet)

  const mockScreens = [
    {
      id: 1,
      name: 'Peça Adiantada',
      icon:<Camera size={24} color={theme.colors.foreground} />,
      redirect: 'control-quality-defect'
    },
    {
      id: 2,
      name: 'Controle de Qualidade e Defeito',
      icon:<Box size={24} color={theme.colors.foreground} />,
      redirect: 'control-quality-defect'
    },
   
  ]
 
  return (
      <View style={styles.container}>
      <HeaderComponent />
        <Text style={styles.title}>Módulos</Text>
        <FlatList
          data={mockScreens}
          showsHorizontalScrollIndicator={false}
          snapToInterval={6}
          style={{
            flexGrow: 0
          }}
          horizontal
          contentContainerStyle={{
            paddingLeft: 20,
          }}
          ItemSeparatorComponent={() => <View style={{ width: 20 }}/>}
          renderItem={({ item }) => {
            return (
              <CardMenu
                key={item.id} 
                description={item.name}
                icon={item.icon} 
                redirect={item.redirect}
              />
            )}
          }
        />
      </View>
  );
}

const stylesheet = createStyleSheet( theme => ({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.foreground,
    padding: theme.padding[20],
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
}));
