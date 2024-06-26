import { useState, useEffect } from "react";

export const useDate = () => {
    
    const locale = 'en';
    const [today, setDate] = useState(new Date())
    
    
    useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date())
        }, 60000)

        return () => {
            clearInterval(timer)
        }
    }, [])

    const day  = today.toLocaleDateString(locale, {weekend: 'long'})

    const date = `${day}, ${today.getDate()}, ${today.toLocaleDateString(locale, {month:"long"})}\n\n`

    const time =today.toLocaleDateString(locale, {hour: 'numeric', hour12:true, minute: 'numeric'})

    return{
        date, time
    }
}
export default useDate