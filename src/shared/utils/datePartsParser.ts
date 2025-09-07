export const datePartsParser = (
  date?: string | { day: string | number; month: string | number; year: string | number }
): { day: string; month: string; year: string } => {
  if (!date) return { year: '', month: '', day: '' };

  if (typeof date !== 'string') {
    return {
      year: String(date.year || ''),
      month: date.month !== undefined ? String(Number(date.month)) : '',
      day: date.day !== undefined ? String(Number(date.day)) : '',
    };
  }

  const [day, month, year] = date.split('-');
  return {
    year: year || '',
    month: month ? String(Number(month)) : '',
    day: day ? String(Number(day)) : '',
  };
};
