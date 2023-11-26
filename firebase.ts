// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  FieldValue,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  updateDoc,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

// function for save form into the db
interface IGeoloc {
  fLat: string;
  fLng: string;
  fNam: string;
  fDes: string;
}
const saveGeoloc = (geoloc: IGeoloc) => {
  addDoc(collection(db, 'geoloc'), {
    lat: geoloc.fLat,
    lng: geoloc.fLng,
    name: geoloc.fNam,
    description: geoloc.fDes,
  });
  // console.log(geoloc.fDes, geoloc.fLat, geoloc.fLng, geoloc.fNam);
};

const getGeolocs = async () => {
  const queryDB = query(collection(db, 'geoloc'));
  const docs = await getDocs(queryDB);
  const allRegisters: unknown[] = [];
  docs.forEach((doc: { data: () => unknown }) => {
    allRegisters.push(doc.data());
  });

  return allRegisters;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onGetGeoloc = (callback: any) =>
  onSnapshot(collection(db, 'geoloc'), callback);

const deleteGeoloc = (id: string) => deleteDoc(doc(db, 'geoloc', id));

const getGeoloc = async (id: string) => {
  const data = await getDoc(doc(db, 'geoloc', id));
  const geolocA = data.data();

  return geolocA;
};

const updateGeoloc = (
  id: string,
  newFields: { [x: string]: FieldValue | Partial<unknown> | undefined },
) =>
  updateDoc(doc(db, 'geoloc', id), {
    lat: newFields.fLat,
    lng: newFields.fLng,
    name: newFields.fNam,
    description: newFields.fDes,
  });

export {
  app,
  saveGeoloc,
  getGeolocs,
  onGetGeoloc,
  deleteGeoloc,
  getGeoloc,
  updateGeoloc,
};
