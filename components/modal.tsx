import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProps, BottomSheetView } from '@gorhom/bottom-sheet';
import { useStyles } from 'react-native-unistyles';

export type TComportModalProps = {
  handlePresentModal: () => void;
  handleModalDismiss: () => void;
};

type ModalProps = {
  children: React.ReactNode;
} & BottomSheetModalProps;

const Modal: React.ForwardRefRenderFunction<TComportModalProps, ModalProps> = ({ children, ...props }, ref) => {
  const { theme } = useStyles()
  const bottomSheetRef = React.useRef<BottomSheetModal>(null);
  const handlePresentModal = React.useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);
  const handleModalDismiss = React.useCallback(() => {
    bottomSheetRef.current?.dismiss();
  }, []);
  const handleRenderBackDrop = React.useCallback((props: any) => {
    return (
      <BottomSheetBackdrop
        appearsOnIndex={3}
        disappearsOnIndex={-1}
        {...props}
      />
    );
  }, []);

  React.useImperativeHandle(ref, () => {
    return {
      handleModalDismiss,
      handlePresentModal,
    };
  });

  return (
      <BottomSheetModal
        ref={bottomSheetRef}
        backgroundStyle={{
          borderWidth: 1,
          borderColor: 'white',
          backgroundColor: theme.colors.background,
        }}
        handleIndicatorStyle={{
          backgroundColor: theme.colors.foreground,
        }}
        backdropComponent={handleRenderBackDrop}
        {...props}
      >
        <BottomSheetView>
            {children}
        </BottomSheetView>
      </BottomSheetModal>
  );
};

export default React.forwardRef(Modal);
