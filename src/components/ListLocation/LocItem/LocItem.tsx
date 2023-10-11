import { FC } from 'react'
import { IGeoData } from '../../../utils/interfaces'

interface ILoc {
  item: IGeoData
}

export const LocItem:FC<ILoc> = ({item}) => {
  return (
    <div>{item.name}</div>
  )
}
