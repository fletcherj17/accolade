import React, { useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer';
import axiosClient from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';
import { 
    SIGNUP_OK,
    SIGNUP_ERROR,
    HIDE_ALERT,
    LOGIN_OK,
    LOGIN_ERROR,
    USER_AUTENTICATED,
    LOG_OUT,
    SPINNER_ON
} from '../../types';

const AuthState = ({children}) => {

    // define initial state
    const initialState = {
        token: typeof window !== 'undefined' ? localStorage.getItem('token') : '',
        autenticated: null,
        user: null,
        message: null,
        loading: null,
        spinnerauth: null
    }

    // define reducer
    const [ state, dispatch ] = useReducer(authReducer, initialState);

    // create new users
    const createUser = async datos => {
        
        try {
            const resp = await axiosClient.post('/api/users', datos);
            dispatch({
                type: SIGNUP_OK,
                payload: resp.data.msg
            });
        } catch (error) {
            dispatch({
                type: SIGNUP_ERROR,
                payload: error.response.data.msg
            })
        }
        // clean alert after 3 seconds
        setTimeout(() => {
            dispatch({
                type: HIDE_ALERT
            })
        }, 3000);
    }

    // login user
    const login = async datos => {
        dispatch({
            type: SPINNER_ON
        })
        try {
            const resp = await axiosClient.post('/api/auth', datos);
            dispatch({
                type: LOGIN_OK,
                payload: resp.data.token
            })
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            })
        }

        // clean alert after 3 seconds
        setTimeout(() => {
            dispatch({
                type: HIDE_ALERT
            })
        }, 3000);
    }


    
    // get autenticated user
    const autenticatedUser = async () => {
        const token = localStorage.getItem('token');
        if(token) {
            tokenAuth(token)
        }

        try {
            const resp = await axiosClient.get('/api/auth');
            if(resp.data.user) {
                dispatch({
                    type: USER_AUTENTICATED,
                    payload: resp.data.user
                }) 
            }

        } catch (error) {
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            })
        }
    }

    // close session
    const logout = () => {
        dispatch({
            type: LOG_OUT
        })
    }

    return (
        <authContext.Provider
            value={{ 
                token: state.token,
                autenticated: state.autenticated,
                user: state.user,
                message: state.message,
                loading: state.loading,
                spinnerauth: state.spinnerauth,
                createUser,
                login,
                autenticatedUser, 
                logout
            }}
        >
            {children}
        </authContext.Provider>
    )
}

export default AuthState;