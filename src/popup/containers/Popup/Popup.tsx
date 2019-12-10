import { observer, useLocalStore } from 'mobx-react';
import * as React from 'react';
import './Popup.scss';


interface AppProps { }

interface AppState { }

const App: React.FC = (props: AppProps) => {
    const state = useLocalStore(() => ({  }));


    return (
        <div className="popupContainer" >
            Hello World!
        </div>
    )
}

export default observer(App);