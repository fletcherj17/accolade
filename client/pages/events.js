import React, { useContext, useEffect } from "react";
import eventContext from "../context/events/eventContext";
import Layout from "../components/Layout";
import moment from "moment";
import authContext from "../context/auth/authContext";
import NewEvent from "../components/NewEvent";
import Event from "../components/Event";

const UpcomingEvents = () => {
  // Define events context
  const EventContext = useContext(eventContext);
  const {
    events,
    message,
    getEvents,
    currentEvent,
    event,
  } = EventContext;
  // Define auth context
  const AuthContext = useContext(authContext);
  const { user, autenticatedUser } = AuthContext;

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
    getEvents();
  }, [message]);

  // Function to select event
  const selectEvent = (id) => {
    currentEvent(id); // Fix event
  };


  //  check if there are posts
  if (events.length === 0)
    return (
      <Layout>
        <div className="text-center font-bold text-xl">
          {" "}
          There aren't upcoming events {user ? <NewEvent /> : null}
        </div>
      </Layout>
    );

  // if (!event) {
  //   currentEvent(events[0]._id);
  // }

  return (
    <Layout>
      <div className="mb-30 items-center">
        {user ? <NewEvent /> : null}
        <table className="border-collapse w-full">
          <thead>
            <tr>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                Event
              </th>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                Date
              </th>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                Time
              </th>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                Location
              </th>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                Status
              </th>

            
            </tr>
          </thead>
          <tbody>
            {events.map((event) => {
              return (
                <tr
                  className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0"
                  key={event._id}
                  onClick={() => selectEvent(event._id)}
                >
                  <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                    <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                      Title
                    </span>
                    {event.title}
                  </td>
                  <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                    <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                      Date
                    </span>
                    {moment(event.date).format("L")}
                  </td>
                  <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                    <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                      Time
                    </span>
                    {moment(event.date).format("LT")}
                  </td>
                  <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                    <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                      Location
                    </span>
                    {event.city}
                  </td>
                  <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                    <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                      Status
                    </span>
                    {moment(event.date).isBefore(new Date()) ? (
                      <span className="rounded bg-red-400 py-1 px-3 text-xs font-bold">
                        Expired
                      </span>
                    ) : (
                      <span className="rounded bg-green-400 py-1 px-3 text-xs font-bold">
                        Soon
                      </span>
                    )}
                  </td>

                 
                </tr>
                
              );
            })}
          </tbody>
        </table>
        {event ? <Event /> : null}
      </div>
    </Layout>
  );
};

export default UpcomingEvents;
