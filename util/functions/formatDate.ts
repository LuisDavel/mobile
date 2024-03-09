import { format, parseISO } from 'date-fns';

export const formatDate = (date: string) => {
  if (!date) return;
  const newDate = parseISO(date);
  const result = format(newDate, 'dd/MM/yyyy');
  return result;
};
