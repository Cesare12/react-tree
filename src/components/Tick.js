import React, { useState, useEffect } from 'react';

const Tick = () => {
    const [n, setN] = useState(0)
    useEffect(() => {
        const time = setInterval(() => {
            setN(n + 1)
        }, 1000)

        return () => {
            clearInterval(time)
        }
    })
    return (
        <span>{` *Life:${n}s`}</span>
    );
}

export default Tick;