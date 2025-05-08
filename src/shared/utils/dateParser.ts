export const dateParser = (date: string): string => {
  const stringifyedDate = JSON.parse(date);
  const { year, month, day } = stringifyedDate;

  const formattedDay = day.padStart(2, '0');
  const formattedMonth = month.padStart(2, '0');

  return `${formattedDay}-${formattedMonth}-${year}`;
};
