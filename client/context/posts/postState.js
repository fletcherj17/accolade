import React, { useReducer } from 'react';

import postContext from './postContext';
import postReducer from './postReducer';
import { 
    POST_FORM, 
    POST_UPDATE_FORM,
    GET_POSTS,
    ADD_POST,
    UPDATE_POST,
    POST_ERROR,
    VALIDATE_POST,
    CURRENT_POST,
    DELETE_POST,
    GET_CREATOR,
    SPINNER_ON
} from '../../types';

import axiosClient from '../../config/axios';


const PostState = props => {

    const initialState = {
        posts : [],
        form : false,
        formupdate: false,
        errorform: false,
        postsfiltered: [], 
        message: null,
        creatorInfo: null,
        spinnerpost: null
    }

    // Dispatch 
    const [state, dispatch] = useReducer(postReducer, initialState)

    // CRUD

    const showForm = () => {
        dispatch({
            type: POST_FORM
        })
    }

    const showUpdateForm = () => {
        dispatch({
            type: POST_UPDATE_FORM
        })
    }

    // Get posts
    const getPosts = async () => {
        dispatch({
            type: SPINNER_ON
        })
        try {
            const resp = await axiosClient.get('/api/posts');

            dispatch({
                type: GET_POSTS,
                payload: resp.data.posts
            })
        } catch (error) {
            const alert = {
                msg: 'Server error, please try again',
                categoria: 'alert-error'
            }
            
            dispatch({
                type: POST_ERROR,
                payload: alert
            })
        }
    }

    // Get creator info
    const getCreator = async id => {
        try {
            const resp = await axiosClient.get('/api/users', { params: { id }});
            dispatch({
                type: GET_CREATOR,
                payload: resp.data.user
            })
        } catch (error) {
            console.log(error);
        }
    }

    // Add new post
    const addPost = async post => {
        try {
            const resp = await axiosClient.post('/api/posts', post);
            // Insertar post into state
            dispatch({
                type: ADD_POST,
                payload: resp.data
            })
        } catch (error) {
            const alert = {
                msg: 'Server error, please try again',
                categoria: 'alert-error'
            }
            
            dispatch({
                type: POST_ERROR,
                payload: alert
            })
        }
    }

    // Update event
    const updatePost = async post => {
        try {
            const resp = await axiosClient.put(`/api/posts/${post._id}`, post);
            
            dispatch({
                type: UPDATE_POST,
                payload: resp.data.post
            })
        } catch (error) {
            console.log(error);
        }
    }

    // Validate form 
    const showError = () => {
        dispatch({
            type: VALIDATE_POST
        })
    } 

    // Select Post clicked
    const filterPost = type => {
        dispatch({
            type: CURRENT_POST,
            payload: type
        })
    }

    // Delete post
    const deletePost = async postId => {
        try {
            await axiosClient.delete(`/api/posts/${postId}`);
            dispatch({
                type: DELETE_POST,
                payload: postId
            })
        } catch (error) {
            const alert = {
                msg: 'Server error, please try again',
                categoria: 'alert-error'
            }
            
            dispatch({
                type: POST_ERROR,
                payload: alert
            })
        }
    }


    return (
        <postContext.Provider
            value={{
                posts: state.posts,
                form: state.form,
                formupdate: state.formupdate,
                errorform: state.errorform,
                postsfiltered: state.postsfiltered,
                message: state.message,
                creatorInfo: state.creatorInfo,
                spinnerpost: state.spinnerpost,
                showForm,
                showUpdateForm,
                getPosts,
                addPost,
                showError,
                updatePost,
                filterPost,
                deletePost,
                getCreator
            }}
        >
            {props.children}
        </postContext.Provider>
        
    )
}

export default PostState;