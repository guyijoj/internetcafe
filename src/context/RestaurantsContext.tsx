import React, { createContext } from 'react'
import { restaurantsInfo } from '../types/cart';



type RestaurantsContextValue = {
    loading:boolean;
    error: string | null;
    restaurantsInfo: restaurantsInfo[];
}

const RestaurantsContext = createContext<RestaurantsContextValue | undefined>(undefined);

const RestaurantsContext = () => {
  return (
  
  )
}

export default RestaurantsContext