import { format } from 'date-fns';

export const removeHourZeros = (hour: string) => {
  if (!hour) return;
  const result = hour.replace('.000', '');
  return result;
};
