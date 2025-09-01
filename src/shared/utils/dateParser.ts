export const dateParser = (date: string): string => {
  if (!date) return '';
  const parsedDate = JSON.parse(date);
  const year = String(parsedDate.year || '');
  const month = String(parsedDate.month || '').padStart(2, '0');
  const day = String(parsedDate.day || '').padStart(2, '0');

  return `${day}-${month}-${year}`;
};
