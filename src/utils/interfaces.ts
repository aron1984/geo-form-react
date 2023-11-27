export type IPathId = 'home' | 'about' | 'places' | 'notfound';

export interface IItems {
  id: IPathId;
  path: string;
}

[];

export type IModalType = 'success' | 'error' | 'alert';

// id : este id es del documento de Firestore, necesario para poder elimniar una localizacion en particular
// No viene en el objeto, sino que se lo agrego en Places, donde seteo un nuevo objeto que si lo tiene y
// se lo paso al hijo para listar los lugares, y RouterProvide usarlo para modifcar o elimiar
export interface IGeoData {
  name: string;
  description: string;
  lat: number;
  lng: number;
  id?: string | null;
}

export interface IDataFirebase {
  fLat: string;
  fLng: string;
  fNam: string;
  fDes: string;
  fUid: string;
}

//Esta interface es para agregar el id como posible data en el tipo que esperamos de firebase. Por defecto no lo tenia, pero doc.id nos devuelve el identificador de ese documento
export interface DocumentWithId {
  id: string;
  data: () => IGeoData;
}

export interface IColorSpinner {
  color: 'save' | 'delete' | 'edit';
}

export type ILoaderColor = 'save' | 'delete' | 'edit';

export interface IUser {
  name: string | null | undefined;
  profile: 'admin' | 'client' | 'visitor' | undefined;
  uid: string
}

export interface ILogin {
  email: string | null;
  password: string | null;
}
