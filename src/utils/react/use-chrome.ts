import { useState, useEffect } from 'react';
import { Chrome, ChromeListener } from '../../models/chrome.model';
import { Callback } from '../../models/general.model'

export const useChromeStorage = (key: string) => {
    const [item, setItem] = useState(null);
    const storage = chrome.storage.sync;

    useEffect(() => {
        let unmounted = false;
        storage.get(key, (obj) => {
            if (!unmounted) {
                setItem(obj[key])
            }
        })

        return () => {
            unmounted = true;
        }
    }, [])

    const setLocalItem = <T = any>(value: T) => {
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