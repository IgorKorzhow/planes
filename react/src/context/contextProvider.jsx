import {createContext, useContext, useState} from "react";


const StateContext = createContext({
    role: null,
    token: null,
    setToken: () => {},
    setRole: () => {}
});

export const ContextProvider = ({children}) => {
    const [token, _setToken] = useState(localStorage.getItem('Access_token'));
    const [role, _setRole] = useState(localStorage.getItem('Role'));


    const setToken = (token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem('Access_token', token);
        } else {
            localStorage.removeItem('Access_token');
        }
    }

    const setRole = (role) => {
        _setRole(role);
        if (role) {
            localStorage.setItem('Role', role);
        } else {
            localStorage.removeItem('Role');
        }
    }

    return (
        <StateContext.Provider value={{
            role,
            setRole,
            token,
            setToken,

        }}>
            {children}
        </StateContext.Provider>)
}

export const useStateContext = () => {
    return useContext(StateContext);
}
