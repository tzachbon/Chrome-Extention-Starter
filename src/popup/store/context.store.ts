
import * as React from 'react';
import { Store } from './main.store';

export const storesContext = React.createContext({
    store: new Store(),
})

export const useStores = () => React.useContext(storesContext)