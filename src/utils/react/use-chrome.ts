import { useCallback, useEffect, useMemo, useState } from 'react';
import { ChromeStorage } from '../../core';

export const useChromeStorage = <T = any>(key: string) => {
    const [state, setState] = useState<T>()
    const chromeStorage = useMemo(() => new ChromeStorage<T>(key), [key])

    useEffect(() => {
        const { remove } = chromeStorage.subscribe(data => {
            setState(data)
        })

        return () => { remove() }
    }, []);

    const setStorage = useCallback(
        (data: T) => {
            chromeStorage.set(data)
        },
        [chromeStorage],
    )

    return { 
        storage: state,
        setStorage
     };
}