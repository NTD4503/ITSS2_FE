import React, { createContext, useReducer } from 'react';
import { MatxLoading } from 'app/components';

const initialState = {
    isAuthenticated: true,
    isInitialised: true,
    user: {
        id: 1,
        role: 'SA',
        name: 'Jason Alexander',
        username: 'jason_alexander',
        email: 'jason@ui-lib.com',
        avatar: '/assets/images/face-6.jpg',
        age: 25,
    },
};

const reducer = (state, action) => {
    switch (action.type) {
        default: {
            return { ...state };
        }
    }
};

const AuthContext = createContext({
    ...initialState,
    method: 'None',
    login: () => Promise.resolve(),
    logout: () => {},
    register: () => Promise.resolve(),
});

export const AuthProvider = ({ children }) => {
    const [state] = useReducer(reducer, initialState);

    return (
        <AuthContext.Provider
            value={{
                ...state,
                method: 'None',
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
