import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userService from "../services/user.service";
import { toast } from "react-toastify";

const httpAuth = axios.create();
const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};
const TOKEN_KEY = "jwt-token";
const REFRESH_KEY = "jwt-refresh-token";
const EXPRESS_KEY = "jwt-express";

const AuthProvider = ({ children }) => {
    const [currentUser, setUser] = useState({});
    const [error, setError] = useState(null);
    function setTokens({ refreshToken, idToken, expiresIn }) {
        const expiresDate = new Date().getTime() + expiresIn * 1000;
        localStorage.setItem(TOKEN_KEY, idToken);
        localStorage.setItem(REFRESH_KEY, refreshToken);
        localStorage.setItem(EXPRESS_KEY, expiresDate);
    };
    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);
    async function signUp({ email, password, ...rest }) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIRABASE_KEY}`;
        try {
             const { data } = await httpAuth.post(url, {
                email,
                password,
                returnSecureToken: true
            });
            setTokens(data);
            await createUser({ _id: data.localId, email, ...rest });
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (message === "EMAIL_EXISTS") {
                    const errorObject = {
                        email: "Пользователь с таким email уже существует"
                    };
                    throw errorObject;
                }
            }
        }
    };
    async function singIn({ email, password }) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIRABASE_KEY}`;
        try {
            const { data } = await httpAuth.post(url, {
               email,
               password,
               returnSecureToken: true
           });
           setTokens(data);
           console.log(data);
        } catch (error) {
            errorCatcher(error);
        }
    };
    async function createUser(data) {
        try {
            const { content } = userService.create(data);
            setUser(content);
        } catch (error) {
            errorCatcher(error);
        }
    };
    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }
    return (
        <AuthContext.Provider value={{ signUp, currentUser, singIn }}>
            {children}
        </AuthContext.Provider>
    );
};
AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default AuthProvider;
