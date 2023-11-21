import {FC} from "react";

interface IProps {
    check?: boolean
}
export const CheckEmpty:FC<IProps> = ({check = false}) => {

    return (
        <img src={check ? "/img/check-stencil.png" : "/img/check-empty.png" } alt="Pending" width={20} height={20} className='mr-2'/>
    )
}