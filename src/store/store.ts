import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

interface GeoState {
  coordinates: {
    latitude: number | null,
    longitude: number | null
  };

  setCoordinates: (lat: number, long: number) => void;
}

export const useGeoStore = create<GeoState>()((set) => ({
  coordinates: {
    latitude: null,
    longitude: null,
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
