import ChromeListener from '../utils/chrome.util'
import { WebWorker } from '../models/web-worker.model';
import { WEB_WORKER_URL } from '../utils/web-worker';

window.addEventListener("load", init, false);
// const scanDomWebWorker = new Worker(WEB_WORKER_URL);

const storage = chrome.storage.sync;
const storageKey = 'STORAGE_KEY';
interface GetStorageType<T> {
    [key: string]: T | {
        newValue: T;
        oldValue: T
    }
}
storage.get(storageKey, (obj: GetStorageType<boolean>) => {
    const value = obj[storageKey];
    if (typeof value === 'boolean') {
        console.log(value);

    }
})


function init() {

    const eventChromeListener = new ChromeListener<string>('CONTENT', 'scan');
    const sendMessage = message => eventChromeListener.sendMessage(message);
    eventChromeListener.subscribe((value) => {
        console.log(value);
    })

}


