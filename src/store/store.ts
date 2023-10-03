import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

interface GeoState {
  coordinates: {
    latitude: string;
    longitude: string;
  };

  setCoordinates: (lat: string, long: string) => void;
}

export const useGeoStore = create<GeoState>()((set) => ({
  coordinates: {
    latitude: "",
    longitude: "",
  },
  setCoordinates: (lat, long) =>
    set((state) => ({
      ...state.coordinates,
      coordinates: {
        latitude: lat.toString(),
        longitude: long.toString(),
      },
    })),
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("Store", useGeoStore);
}
