import React from 'react';
import {
  Text,
  Pressable,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { createStyleSheet } from 'react-native-unistyles';
import { useStyles } from 'react-native-unistyles';
import Loading from './loading';
import { LucideX } from 'lucide-react-native';
import { useController } from 'react-hook-form';
import Modal, { TComportModalProps } from './modal';


type OptionsProps = {
  name: string; 
  control: any 
  rules?: any; 
  defaultValue?: any 
}

type TPicker = {
  data: TSelected[];
  value: TSelected | null;
  options: OptionsProps
  isSearch?: boolean;
  onChangeValue?: (value: number | undefined) => void;
  isLoading?: boolean;
  placeholder: string;
};

type TSelected = {
  label: string | number;
  value: number | string;
};

export function Select (props: TPicker){
  const { data, placeholder, options, onChangeValue, isLoading} = props  
  const [items, setItems ] = React.useState<TSelected[]>(data)
  const [selected, setSelected ] = React.useState<TSelected>()
  const { styles, theme } = useStyles(stylesheet)
  const modalRef = React.useRef<TComportModalProps>(null)
  const {
    field: { onChange, value },
  } = useController({
    name: props.options.name,
    defaultValue: props.options.defaultValue,
    control: props.options.control,
    rules: props.options.rules
  });

  React.useEffect(() => {
    if(!onChangeValue) return
    onChangeValue(selected?.value as number)
  },[selected])

  const handleSelectItem = (item: TSelected) => {
    onChange(item.value);
    setSelected(item)
    if (modalRef.current) {
      modalRef.current.handleModalDismiss();
    }
  };
  
  return (
    <>
      <Pressable disabled={isLoading} onPress={() => modalRef.current?.handlePresentModal()} style={styles.wrapper}>
        <Text style={styles.text}>{selected ? selected.label : placeholder } </Text>
        {isLoading && <ActivityIndicator color={theme.colors.foreground}/>}
      </Pressable>
        <Modal enableDynamicSizing={true} ref={modalRef} >
          <FlatList
            keyExtractor={(i) => i.value.toString()}
            data={items}
            renderItem={({ item }) => (
              <Pressable style={styles.itemContainer} onPress={() => handleSelectItem(item)}>
                <Text style={[styles.text, styles.isSelected(selected?.value == item.value
                  )]}>{item.label}</Text>
              </Pressable>
            )}
          />
        </Modal>
    </>
  )
};

const stylesheet = createStyleSheet( theme => ({
  isSelected: (selected: boolean) => ({
    backgroundColor:selected ? theme.colors.muted : 'transparent',
    padding: 5,
  }),
  wrapper: { 
    borderRadius: 6,
    flexDirection: 'row',  
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: theme.borderColor,
    paddingVertical:  theme.padding[12],
    paddingHorizontal: theme.padding[12],  
  },
  itemContainer: {
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 1
  },
  text: {
    fontSize: 16,
    color: theme.colors.foreground
  }
}));
