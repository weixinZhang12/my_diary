import { useRef } from "react"
import styleUtils from "../../utils/styleUtils"

interface MenuPropsInter{
    onClick:()=>void
}
export default function Menu(props:MenuPropsInter) {
    
   const isDark=useRef(styleUtils.getIsDark())
   console.log(isDark.current);

    return (
        <svg onClick={props.onClick}
            viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4319"
            width="20" height="20">
            <path d="M20.48 10.24h983.04v983.04H20.48z" fill={'rgba(255,255,255,0)'} p-id="4320"></path>
            <path
                d="M112.64 256A30.72 30.72 0 0 1 143.36 225.28h737.28A30.72 30.72 0 0 1 880.64 286.72H143.36a30.72 30.72 0 0 1-30.72-30.72z m0 245.76A30.72 30.72 0 0 1 143.36 471.04h737.28a30.72 30.72 0 0 1 0 61.44H143.36a30.72 30.72 0 0 1-30.72-30.72zM143.36 716.8A30.72 30.72 0 0 0 143.36 778.24h737.28a30.72 30.72 0 0 0 0-61.44H143.36z"
                fill={'var(--icon-color)'} p-id="4321"></path>
        </svg>
    )
}