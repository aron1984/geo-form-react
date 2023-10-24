import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { IDataFirebase } from "../utils/interfaces";

interface GeoState {
  coordinates: {
    latitude: string;
    longitude: string;
  };

  myCoordinates: {
    latitude: number | null;
    longitude: number | null;
  };

  loadingSpinner: boolean;

  formDataStore: {
    fLat: string;
    fLng: string;
    fNam: string;
    fDes: string;
  };

  selectedDocId: string;

  setSelectedDocId: (id: string) => void;

  setFormDataStore: (data: IDataFirebase) => void;

  setShowLoadingSpiner: (status: boolean) => void;
  setCoordinates: (lat: string, long: string) => void;
  setLatitude: (lat: string) => void;
  setLongitude: (long: string) => void;

  setMyPosition: (lat: number, long: number) => void;
}

export const useGeoStore = create<GeoState>()((set) => ({
  coordinates: {
    latitude: '',
    longitude: '',
  },

  loadingSpinner: false,

  formDataStore: {
    fLat: "",
    fLng: "",
    fNam: "",
    fDes: "",
  },

  selectedDocId: '',

  setSelectedDocId: (id) =>
    set(() => ({
      selectedDocId: id,
    })),

  setFormDataStore: ({ fLat, fLng, fNam, fDes }) =>
    set((state) => ({
      ...state.formDataStore,
      formDataStore: {
        fLat: fLat,
        fLng: fLng,
        fNam: fNam,
        fDes: fDes,
      },
    })),

  setShowLoadingSpiner: (status) => set(() => ({ loadingSpinner: status })),
  setCoordinates: (lat, long) =>
    set((state) => ({
      ...state.coordinates,
      coordinates: {
        latitude: lat,
        longitude: long,
      },
    })),
  setLatitude: (lat: string) =>
    set((state) => ({
      ...state.coordinates,
      coordinates: {
        latitude: lat,
        longitude: state.coordinates.longitude,
      },
    })),
  setLongitude: (long: string) =>
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
