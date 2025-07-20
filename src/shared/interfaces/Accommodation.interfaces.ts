export interface AccommodationEntity {
  name: string;
  address: string;
  price: number;
  _id: string;
}

export type AddAccommodation = AccommodationEntity;
export type EditAccommodation = AccommodationEntity & {
  accommodationId: string;
};
