import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AccommodationEntity } from '@shared/interfaces/Accommodation.interfaces';

interface AccommodationState {
  accommodations: AccommodationEntity[];
  selectedAccommodation: AccommodationEntity | null;
}
const initialState: AccommodationState = {
  accommodations: [],
  selectedAccommodation: null,
};

export const AccommodationSlice = createSlice({
  name: 'AccommodationSlice',
  initialState,
  reducers: {
    setAccommodations(state, action: PayloadAction<AccommodationEntity[]>) {
      state.accommodations = action.payload;
    },
    setSelectedAccommodation(state, action: PayloadAction<AccommodationEntity>) {
      state.selectedAccommodation = action.payload;
    },
  },
});

export const AccommodationReducer = AccommodationSlice.reducer;
