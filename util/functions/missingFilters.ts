import { Alert } from 'react-native';

export function missingFilters(isValid: boolean) {
  return (
    isValid &&
    Alert.alert(
      'Ocorreu um erro',
      'Não foi possivel realizar a busca dos dados, vocês está sem filtros'
    )
  );
}
