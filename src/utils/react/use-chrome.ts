import { useState, useEffect, useCallback } from 'react';
import { Chrome, ChromeListener } from '../../models/chrome.model';
import { Callback } from '../../models/general.model'

export const useChromeStorage = <T = any>(key: string) => {
    const [item, setItem] = useState<T>(null);
    const storage = chrome.storage.sync;

    let unmounted = false
    useEffect(() => () => unmounted = true, []);
    useCallback(() => {
        storage.get(key, (obj) => !unmounted && item !== obj[key] && setItem(obj[key]))
    }, [item]);


    const setLocalItem = (value: T) => {
        storage.set({ [key]: value }, () => {
            setItem(value);
        });
    }

    const removeLocalItem = () => {
        storage.remove(key, () => {
            setItem(null);
        })
    }


    return { item, setItem: setLocalItem, removeItem: removeLocalItem };
}



export const useChromeListener = <T = any, J = any>(act: Chrome.Action, callBack?: Callback<T>) => {
    const [action, setAction] = useState(act);
    const chromeListener = new ChromeListener('POPUP', action);
    const [message, setMessage] = useState(null);

    const sendMessage = <T = any>(message: T) => {
        chromeListener.sendMessage(message);
    }

    useEffect(() => chromeListener.subscribe(
        (value) => {
            setMessage(value);
            if (callBack) {
                callBack(message)
            }
        }
    ).unsubscribe, [action])

    return { message, setAction, sendMessage };

}