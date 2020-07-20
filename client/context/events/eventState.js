import React, { useReducer } from 'react';

import eventContext from './eventContext';
import eventReducer from './eventReducer';
import { 
    EVENT_FORM, 
    EVENT_UPDATE_FORM,
    GET_EVENTS,
    ADD_EVENT,
    UPDATE_EVENT,
    EVENT_ERROR,
    VALIDATE_EVENT,
    CURRENT_EVENT,
    DELETE_EVENT,
    GET_CREATOR,
    SPINNER_ON
} from '../../types';

import axiosClient from '../../config/axios';


const EventState = props => {

    const initialState = {
        events : [],
        form : false,
        formupdate : false,
        errorform: false,
        event: null, 
        message: null,
        creatorInfo: null,
        spinnerevent: null
    }

    // Dispatch 
    const [state, dispatch] = useReducer(eventReducer, initialState)

    // CRUD

    const showForm = () => {
        dispatch({
            type: EVENT_FORM
        })
    }

    const showUpdateForm = () => {
        dispatch({
            type: EVENT_UPDATE_FORM
        })
    }

    // Get events
    const getEvents = async () => {
        dispatch({
            type: SPINNER_ON
        })
        try {
           
            const resp = await axiosClient.get('/api/events');
            dispatch({
                type: GET_EVENTS,
                payload: resp.data.events
            })
        } catch (error) {
            const alert = {
                msg: 'Server error, please try again',
                categoria: 'alert-error'
            }
            
            dispatch({
                type: EVENT_ERROR,
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


    // Add new event
    const addEvent = async event => {

        try {
            const resp = await axiosClient.post('/api/events', event);
            // Insertar event into state
            dispatch({
                type: ADD_EVENT,
                payload: resp.data
            })
        } catch (error) {
            const alert = {
                msg: 'Server error, please try again',
                categoria: 'alert-error'
            }
            
            dispatch({
                type: EVENT_ERROR,
                payload: alert
            })
        }
    }

    // Validate form 
    const showError = () => {
        dispatch({
            type: VALIDATE_EVENT
        })
    } 

    // Select Event clicked
    const currentEvent = eventId => {
        dispatch({
            type: CURRENT_EVENT,
            payload: eventId
        })
    }

     // Update event
     const updateEvent = async event => {

        try {
            const resp = await axiosClient.put(`/api/events/${event._id}`, event);
            
            dispatch({
                type: UPDATE_EVENT,
                payload: resp.data.event
            })
        } catch (error) {
            console.log(error);
        }
    }

    // Delete event
    const deleteEvent = async eventId => {
        try {
            await axiosClient.delete(`/api/events/${eventId}`);
            dispatch({
                type: DELETE_EVENT,
                payload: eventId
            })
        } catch (error) {
            const alert = {
                msg: 'Server error, please try again',
                categoria: 'alert-error'
            }
            
            dispatch({
                type: EVENT_ERROR,
                payload: alert
            })
        }
    }


    return (
        <eventContext.Provider
            value={{
                events: state.events,
                form: state.form,
                formupdate: state.formupdate,
                errorform: state.errorform,
                event: state.event,
                message: state.message,
                creatorInfo: state.creatorInfo,
                spinnerevent: state.spinnerevent,
                showForm,
                showUpdateForm,
                getEvents,
                addEvent,
                showError,
                currentEvent,
                updateEvent,
                deleteEvent,
                getCreator
            }}
        >
            {props.children}
        </eventContext.Provider>
        
    )
}

export default EventState;