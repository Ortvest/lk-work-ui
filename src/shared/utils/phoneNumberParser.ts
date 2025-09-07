export const phoneNumberParser = (value: string): { prefix: string; number: string } => {
  if (!value) return { prefix: '', number: '' };
  return {
    prefix: value.slice(0, 3),
    number: value.slice(3),
  };
};
