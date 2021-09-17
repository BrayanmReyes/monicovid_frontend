import React, { useState } from "react";

const AuthenticationContext = React.createContext({
    token: null,
    userInfo: null,
    signIn: () => {},
    isLoggedIn: () => {}
});

export function useAuthContext() {
    const context = React.useContext(AuthenticationContext);
    return context;
}

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    const signIn = (data) => {
        setToken(data.token);
        console.log('token: ', token);
    };
    const isLoggedIn = (data) => {
        setUserInfo(data);
        console.log('data: ', data);
    };

    return (
        <AuthenticationContext.Provider value={ token, userInfo, signIn, isLoggedIn }>
            { children }
        </AuthenticationContext.Provider>
    )
}

