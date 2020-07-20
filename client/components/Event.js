import React, { useContext, useEffect } from "react";
import moment from "moment";
import eventContext from "../context/events/eventContext";
import Map from "./Map.js";
import UpdateEvent from "../components/UpdateEvent";
import authContext from "../context/auth/authContext";

// comente {event}
const Event = () => {
  // define context
  const EventContext = useContext(eventContext);
  const {
    message,
    getCreator,
    creatorInfo,
    event,
    formupdate,
    showUpdateForm,
    deleteEvent
  } = EventContext;

  const AuthContext = useContext(authContext);
  const { user, autenticatedUser } = AuthContext;
  
  
  // get craetor info when component is loaded
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      autenticatedUser();
    }
    // if there is an error
    if (message) {
      //mostrarAlerta(mensaje.msg, mensaje.categoria);
      console.log(message);
    }
    getCreator(event.creator);
    // eslint-disable-next-line
  }, [message]);

    // Function to delete event
    const delEvent = (id) => {
      deleteEvent(id);
      getEvents();
    };
  
  return (
    <div className=" mt-20 p-3 font-bold mx-20 bg-gray-200 text-gray-600 border border-gray-300">
      <h1 className="text-5xl text-center uppercase">{event.title}</h1>
      {creatorInfo ? (
        <h2 className="text-xl text-center">Posted by {creatorInfo.name} </h2>
      ) : null}
      <h2 className="text-xl text-center">Hosted by {event.host} </h2>
      <div className="pb-10">
        <p>Date: {moment(event.date).format("L")} </p>
        <p>Time: {moment(event.date).format("LT")}</p>
        <p>Details: {event.details}</p>
      </div>
      <Map city={event.city} />

      {user && user._id === event.creator ? (
        <div className="mt-12">
          {message ? (
            <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
              <p className="font-bold">Error</p>
              <p>{message.msg} </p>
            </div>
          ) : null}
          <button
           className="mt-12 ml-12 bg-teal-600 hover:bg-gray-900 p-2 text-white uppercase font-bold cursor:pointer"
            onClick={() => showUpdateForm()}
          >
            Edit
          </button>
          <button
            className="mt-12 ml-12 bg-teal-600 hover:bg-gray-900 p-2 text-white uppercase font-bold cursor:pointer"
            onClick={() => delEvent(event._id)}
          >
            Remove
          </button>
          {formupdate ? <UpdateEvent event={event} /> : null}
        </div>
      ) : (
        null
      )}
     
    </div>
  );
};

export default Event;
