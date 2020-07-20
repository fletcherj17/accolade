import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import eventContext from "../context/events/eventContext";
import moment from "moment";

const UpdateEvent = ({event}) => {
  // define context
  const EventContext = useContext(eventContext);
  const {  errorform, updateEvent } = EventContext;
  // Form and validation with formik y Yup
  const formik = useFormik({
    initialValues: {
      title: event.title,
      type: event.type,
      date: event.date,
      city: event.city,
      host: event.host,
      details: event.details,
      _id: event._id
    },
    validationSchema: Yup.object({
      city: Yup.string(),
      type: Yup.string(),
      title: Yup.string(),
      host: Yup.string(),
      date: Yup.date(),
      details: Yup.string(),
    }),
    onSubmit: (data) => {
      updateEvent(data);
    },
  });
 
  return (
    <div className="block items-center justify-center mb-12">
      {/* {msg && <Alerta />} */}
        <div className="flex justify-center mt-5">
          <div className="w-full max-w-lg">
            <form
              className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
              onSubmit={formik.handleSubmit}
            >
              <div className="mb-4">
                <label
                  className="block text-black text-sm font-bold mb-2"
                  htmlFor="title"
                >
                  Title
                </label>
                <input
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="title"
                  placeholder={event.title}
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.title && formik.errors.title ? (
                  <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{formik.errors.title} </p>
                  </div>
                ) : null}
              </div>

              <div className="mb-4">
                <label
                  className="block text-black text-sm font-bold mb-2"
                  htmlFor="type"
                >
                  Type
                </label>
                <select
                  className="block  w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="type"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.type}
                >
                  <option value="default">Select a type...</option>
                  <option value="Live Music Performance">Live Music Performance</option>
                  <option value="Spoken Word">Spoken Word</option>
                  <option value="Comedy Show-Art Showcase">Comedy Show-Art Showcase</option>
                  <option value="Play/Musical">Play/Musical</option>
                  <option value="Kid's Event">Kid's Event</option>
                  <option value="Movie/Short Premiere">Movie/Short Premiere</option>
                  <option value="Dance Exhibition">Dance Exhibition</option>
                </select>
                {formik.touched.type && formik.errors.type ? (
                  <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{formik.errors.type} </p>
                  </div>
                ) : null}
              </div>

              <div className="mb-4">
                <label
                  className="block text-black text-sm font-bold mb-2"
                  htmlFor="date"
                >
                  Date and time
                </label>
                <input
                  type="datetime-local"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="date"
                  value={moment(formik.values.date).format("YYYY-MM-DD[T]HH:mm:ss")}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.date && formik.errors.date ? (
                  <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{formik.errors.date} </p>
                  </div>
                ) : null}
              </div>

              <div className="mb-4">
                <label
                  className="block text-black text-sm font-bold mb-2"
                  htmlFor="city"
                >
                  City
                </label>
                <input
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="city"
                  placeholder={event.city}
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.city && formik.errors.city ? (
                  <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{formik.errors.city} </p>
                  </div>
                ) : null}
              </div>

              <div className="mb-4">
                <label
                  className="block text-black text-sm font-bold mb-2"
                  htmlFor="host"
                >
                  Host
                </label>
                <input
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="host"
                  placeholder={event.host}
                  value={formik.values.host}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.host && formik.errors.host ? (
                  <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{formik.errors.host} </p>
                  </div>
                ) : null}
              </div>

              <div className="mb-4">
                <label
                  className="block text-black text-sm font-bold mb-2"
                  htmlFor="details"
                >
                  Details
                </label>
                <input
                  type="detailstime-local"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="details"
                  placeholder={event.details}
                  value={formik.values.details}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.details && formik.errors.details ? (
                  <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{formik.errors.details} </p>
                  </div>
                ) : null}
              </div>

              <input
                type="submit"
                className="bg-teal-600 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold cursor-pointer"
                value="Update event"
              />
            </form>
            { errorform ?  <span className="rounded bg-red-400 py-1 px-3 text-xs font-bold">Error updating the event, please try again</span>  : null }
          </div>
        </div>
    </div>
  );
};

export default UpdateEvent;
