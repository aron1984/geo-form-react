import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

interface GeoState {
  coordinates: {
    latitude: number;
    longitude: number;
  };

  myCoordinates: {
    latitude: number | null;
    longitude: number | null;
  };

  loadingSpinner: boolean;

  setShowLoadingSpiner: (status: boolean) => void;
  setCoordinates: (lat: number, long: number) => void;
  setLatitude: (lat: number) => void;
  setLongitude: (long: number) => void;

  setMyPosition: (lat: number, long: number) => void;
}

export const useGeoStore = create<GeoState>()((set) => ({
  coordinates: {
    latitude: 0,
    longitude: 0,
  },

  loadingSpinner: false,

  setShowLoadingSpiner: (status) =>
    set(() => ({ loadingSpinner: status })),
  setCoordinates: (lat, long) =>
    set((state) => ({
      ...state.coordinates,
      coordinates: {
        latitude: lat,
        longitude: long,
      },
    })),
  setLatitude: (lat: number) =>
    set((state) => ({
      ...state.coordinates,
      coordinates: {
        latitude: lat,
        longitude: state.coordinates.longitude,
      },
    })),
  setLongitude: (long: number) =>
    set((state) => ({
      ...state.coordinates,
      coordinates: {
        latitude: state.coordinates.latitude,
        longitude: long,
      },
    })),
  myCoordinates: {
    latitude: null,
    longitude: null,
  },
  setMyPosition: (lat, long) =>
    set((state) => ({
      ...state.myCoordinates,
      myCoordinates: {
        latitude: lat,
        longitude: long,
      },
    })),
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("Store", useGeoStore);
}
