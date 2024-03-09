export function addLabelAndValue<T, K extends keyof T>(
  data: T[],
  label: K,
  value: K,
  ref?: K
) {
  if (ref) {
    return data.map((itemData: T) => ({
      label: `${itemData[ref]} - ${verifyHaveDescription(
        itemData[label] as string
      )}`,
      value: itemData[value],
      ...itemData,
    }));
  }
  return data.map((itemData: T) => ({
    label: itemData[label],
    value: itemData[value],
    ...itemData,
  }));
}

function verifyHaveDescription(description: string) {
  if (!description) return 'Sem descrição';
  return description;
}
