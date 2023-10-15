export type IPathId = "home" | "about" | "places";

export interface IItems {
  id: IPathId;
  path: string;
}
[];

export type IModalType = "success" | "error" | "alert";

export interface IGeoData {
  name: string;
  description: string;
  lat: number;
  lng: number;
}

export interface IColorSpinner {
  color: 'save' | 'delete' | 'edit' 
}

export type ILoaderColor = "save" | "delete" | "edit";
