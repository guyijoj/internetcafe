export type restaurantsInfo = {
  id: number;
  restaurant_name: string;
  address: string;
  phone: string;
  city: string;
  workingHours: string;
  photo: string;
  link: string;
};
export type RestaurantsModalPayload = {
  fromCheckout: boolean;
};
