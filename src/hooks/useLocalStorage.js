import React, {useState, useEffect} from 'react'

const PREFIX = `codepen-clone`

export default function useLocalStorage(key, initialValue) {
    const prefixedKey = PREFIX + key

    const [value, setValue] = useState(() => {
        // retrieve a value stored in the browser's localStorage object with the specified key.
        const jsonValue = localStorage.getItem(prefixedKey)
        // parse a JSON string into a JavaScript object.
        if (jsonValue != null) return JSON.parse(jsonValue)
        
        if (typeof initialValue === 'function') {
            return initialValue()
        } else {
            return initialValue
        }
    })

    useEffect(() => {
        // JSON.stringify(value) is used to convert the value to a JSON string before storing it.
        localStorage.setItem(prefixedKey, JSON.stringify(value))
    }, [prefixedKey, value])

  return [value, setValue]
}

