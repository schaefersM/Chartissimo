//Not needed since I've implemented makeStore.js

import React, { useContext, useReducer } from 'react';

const storeContext = React.createContext();
const dispatchContext = React.createContext();

export const StoreProvider = ({ children, reducer, initialState= {} }) => {
    // const [store, setStore] = useState(()=> initialState);
    const [store, dispatch] = useReducer(reducer, initialState);

    return (
        <dispatchContext.Provider value ={dispatch}>
            <storeContext.Provider value={store}>
                {children}
            </storeContext.Provider>
        </dispatchContext.Provider>
    )
}

export function useStore() {
    return useContext(storeContext);
}

export function useDispatch() {
    return useContext(dispatchContext);
}