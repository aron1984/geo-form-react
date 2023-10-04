import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

interface GeoState {
  coordinates: {
    latitude: number;
    longitude: number;
  };

  setCoordinates: (lat: number, long: number) => void;
}

export const useGeoStore = create<GeoState>()((set) => ({
  coordinates: {
    latitude: 0,
    longitude: 0,
  },
  setCoordinates: (lat, long) =>
    set((state) => ({
      ...state.coordinates,
      coordinates: {
        latitude: lat,
        longitude: long,
      },
    })),
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("Store", useGeoStore);
}
