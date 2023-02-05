import { useState, useEffect, useRef } from "react"

function useHover() {
    const [hovered, setHovered] = useState(false)
    const ref = useRef(null)

    function enter() {
        setHovered(true)
    }

    function leave() {
        setHovered(false)
    }

    useEffect(() => {
        ref.current.addEventListener("mouseenter", enter)
        ref.current.addEventListener("mouseleave", leave)

        return () => {
            /* TODO Why does having remove event listener break the hover hook? is it because I am
            deleting the item earlier then when this is triggered it is removing the event listener from nothing hence the null ref error?*/
            //  ref.current.removeEventListener("mouseenter", enter)
            // ref.current.removeEventListener("mouseleave", leave)
        }
    }, [])

    return [hovered, ref]
}

export default useHover