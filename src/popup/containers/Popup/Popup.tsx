import * as React from 'react';
import { STORAGE_KEY } from '../../../core';
import { useChromeStorage } from '../../../utils';
import './Popup.scss';

interface AppProps { }

interface AppState { }

const App: React.FC = (props: AppProps) => {
    const { storage, setStorage } = useChromeStorage(STORAGE_KEY);
    console.log(storage);
    
    return (
        <div className="popupContainer" >
            <h1> Hello World!</h1>
            <button onClick={() => {
                setStorage(Date.now().toString())
            }}>
                update storage
            </button>
        </div>
    )
}

export default App;