import * as yup from 'yup';

export const createAccommodationValidator = yup.object().shape({
  name: yup.string().required('Accommodation name is required'),
  address: yup.string().required('Accomodation address is required'),
  price: yup.number().required('Accomodation price is required'),
});
