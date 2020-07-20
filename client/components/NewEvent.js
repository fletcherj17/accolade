import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import eventContext from "../context/events/eventContext";

const NewEvent = () => {
  // define context
  const EventContext = useContext(eventContext);
  const { form, errorform, showForm, addEvent } = EventContext;
  // Form and validation with formik y Yup
  const formik = useFormik({
    initialValues: {
      title: "",
      type: "",
      date: "",
      city: "",
      host: "",
      details: "",
    },
    validationSchema: Yup.object({
      city: Yup.string().required("Please insert a city"),
      type: Yup.string().required("Please select a type"),
      title: Yup.string().required("Please insert a title"),
      host: Yup.string().required("Please insert a host"),
      date: Yup.date().required("Please insert a date and time"),
      details: Yup.string().required("Please insert a date"),
    }),
    onSubmit: (data) => {
      addEvent(data);
    },
  });
  // Show form
  const onClickForm = () => {
    showForm();
  };

  return (
    <div className="block items-center justify-center mb-12">
        <div className="flex justify-center ">
      <button
        className="bg-teal-600 hover:bg-gray-900 p-2 text-white uppercase font-bold cursor:pointer"
        onClick={onClickForm}
      >
        {" "}
        Add an event
      </button>
      </div>
      {/* {msg && <Alerta />} */}
      {form ? (
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
                  placeholder="Event title..."
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
                //   value={formik.values.type}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  default="default"
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
                  placeholder="Event date"
                  value={formik.values.date}
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
                  placeholder="City"
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
                  placeholder="Event host..."
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
                  placeholder="Event details"
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
                value="Add event"
              />
            </form>
            { errorform ?  <span className="rounded bg-red-400 py-1 px-3 text-xs font-bold">Error creating the event, please try again</span>  : null }
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default NewEvent;
