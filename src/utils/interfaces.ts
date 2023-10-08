 export type IPathId = 'home' | 'about' | 'places'

export interface IItems {
    id: IPathId
    path: string
}[]


export type IModalType = "success" | "error" | "alert";