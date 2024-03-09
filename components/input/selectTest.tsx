import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Pressable,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { createStyleSheet } from 'react-native-unistyles';
import { useStyles } from 'react-native-unistyles';

import { AntDesign } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import Loading from '../loading';

type TMultiPicker = {
  data: TSelected[] | [];
  value: any;
  isSearch: boolean;
  isLoading: boolean;
  test: any;
  placeholder: string;
  onChange?: (value: any) => void | undefined;
  isMulti: boolean;
};

type TSelected = {
  label: string | number;
  value: number | string;
};

const MultiPicker = (props: TMultiPicker) => {
  const {
    data,
    test,
    isSearch,
    isLoading,
    isMulti,
    value,
    placeholder,
    onChange,
  } = props;

  const [searchText, setSearchText] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<TSelected[]>(test || []);

  const { styles } = useStyles(stylesheet);
  const filteredItems = useMemo(() => {
    return data.filter((item: { label: string | number }) => {
      if (typeof item.label === 'string') {
        return item.label.toLowerCase().includes(searchText.toLowerCase());
      } else {
        return item.label == Number(searchText);
      }
    });
  }, [value, !isLoading, searchText]);

  const handleOpen = useCallback(() => {
    return setIsOpen((prev) => !prev);
  }, []);

  const handleSelectMultiItem = (item: TSelected) => {
    if (
      selectedItems.find((selectedItem) => selectedItem.value === item.value)
    ) {
      setSelectedItems(
        selectedItems.filter(
          (selectedItem) => selectedItem.value !== item.value
        )
      );
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };
  const handleSelect = useCallback(
    (item: TSelected) => {
      if (isMulti) return handleSelectMultiItem(item);
      selectedItems.find((selectedItem) => selectedItem.value === item.value);
      setSelectedItems([item]);
      handleOpen();
    },
    [selectedItems]
  );

  const combinedItems = useMemo(() => {
    return filteredItems.map((item: { value: number | string }) => ({
      ...item,
      isSelected: selectedItems.some(
        (selectedItem) => selectedItem.value === item.value
      ),
    }));
  }, [filteredItems, selectedItems]);

  useEffect(() => {
    if (
      value?.length > 0 &&
      JSON.stringify(value) !== JSON.stringify(selectedItems)
    ) {
      setSelectedItems(value);
    }
  }, [value]);

  useEffect(() => {
    setSearchText('');
  }, [isOpen]);

  useEffect(() => {
    if (onChange) onChange(selectedItems);
  }, [onChange, selectedItems]);

  const renderItem = ({ item }: any) => {
    const isSelected = selectedItems.some(
      (selectedItem) => selectedItem.value === item.value
    );
    return (
      <TouchableOpacity
        onPress={() => handleSelect(item)}
        style={[styles.item, isSelected ? styles.selectedItem : null]}
      >
        <Text>{item.label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Pressable onPress={handleOpen}>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
            paddingVertical: 15,
          }}
        >
          <Text style={styles.text}>
            {(!isMulti && selectedItems[0]?.label) || placeholder}
          </Text>
          <AntDesign
            name={isOpen ? 'close' : 'caretdown'}
            size={15}
            color={isOpen ? 'red' : 'gray'}
          />
        </View>
      </Pressable>

      {isOpen && (
        <View style={styles.container}>
          {isSearch && (
            <TextInput
              placeholder="Pesquisar ..."
              onChangeText={setSearchText}
              style={styles.searchInput}
            />
          )}
          <FlashList
            ListEmptyComponent={
              isLoading ? (
                <Loading />
              ) : (
                <Text
                  style={[
                    styles.text,
                    { alignSelf: 'center', paddingVertical: 10 },
                  ]}
                >
                  Não há registro para esta busca
                </Text>
              )
            }
            data={combinedItems}
            keyExtractor={(item) => item.value.toString()}
            renderItem={renderItem}
            estimatedItemSize={150}
          />
        </View>
      )}
      {!isOpen && isMulti && selectedItems.length > 0 && (
        <View style={{ maxHeight: 250 }}>
          <FlatList
            data={selectedItems}
            renderItem={({ item }) => (
              <TouchableOpacity
                key={item.value}
                style={styles.dropItem}
                onPress={() => handleSelect(item)}
              >
                <Text style={styles.text}>{item.label}</Text>
                <AntDesign name="close" size={16} color="red" />
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </>
  );
};

const stylesheet = createStyleSheet({
  container: {
    height: 250,
  },
  dropItem: {
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    gap: 10,
    padding: 6,
  },
  item: {
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    padding: 15,
  },
  searchInput: {
    borderColor: '#ddd',
    borderRadius: 5,
    borderWidth: 1,
    margin: 10,
    padding: 10,
  },
  selectedItem: {
    backgroundColor: '#e0f0ff',
  },
  text: {
    fontSize: 17,
    fontWeight: '400',
  },
});

export default MultiPicker;
