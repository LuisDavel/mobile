import { TouchableOpacity, ScrollView, View, Text, FlatList } from "react-native";
import {  } from "react-native-gesture-handler";
import { createStyleSheet, useStyles } from "react-native-unistyles";

type TTable = {
  title: string[],
  children: React.ReactNode
  data: any
}

export function Table({ children, title, data }: TTable){
  const { styles } = useStyles(stylesheet);
  return (
    <ScrollView
      disableIntervalMomentum
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      <TouchableOpacity activeOpacity={1} style={{ zIndex: 0 }}>
        <View style={styles.header}>
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
              <TouchableOpacity
                style={[styles.row]}
                // onPress={() => handleDataSelect(item)}
                activeOpacity={0.8}
                key={index}
              >
                {children}
              </TouchableOpacity>
            );
          }}
        />
      </TouchableOpacity>
    </ScrollView>
  )
}

const stylesheet = createStyleSheet((theme) => ({
  cell: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    width: 200,
  },
  header: {
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  headerItem: {
    borderColor: 'black',
    color: 'white',
    flex: 1,
    fontSize: 20,
    textAlign: 'center',
    width: 200,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    zIndex: 1,
    height: 50,
    justifyContent: 'center',
  },
}));
