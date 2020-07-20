import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import postContext from "../context/posts/postContext";

const NewPost = () => {
  // define context
  const PostContext = useContext(postContext);
  const { form, errorform, showForm, addPost, showError } = PostContext;
  // Form and validation with formik y Yup
  const formik = useFormik({
    initialValues: {
      title: "",
      type: "",
      pay: "",
      city: "",
      details: "",
    },
    validationSchema: Yup.object({
      city: Yup.string().required("Please insert a city"),
      type: Yup.string().required("Please select a type"),
      title: Yup.string().required("Please insert a title"),
      details: Yup.string().required("Please insert job details"),
      pay: Yup.string().required("Please enter a payment"),
    }),
    onSubmit: (data) => {
      addPost(data);
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
          Add a post
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
                  placeholder="Post title..."
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
                  <option value="Looking for actors">Looking for actors</option>
                  <option value="Looking for dancers">Looking for dancers</option>
                  <option value="Looking for influencers">Looking for influencers</option>
                  <option value="Looking for photographers or videographers">Looking for photographers or videographers</option>
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

              <div className="mb-4">
                <label
                  className="block text-black text-sm font-bold mb-2"
                  htmlFor="pay"
                >
                  Pay
                </label>

                <input
                  type="text"
                  className="shadow decoration-none appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="pay"
                  placeholder="Payment"
                  value={formik.values.pay}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.pay && formik.errors.pay ? (
                  <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{formik.errors.pay} </p>
                  </div>
                ) : null}
              </div>
              <input
                type="submit"
                className="bg-teal-600 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold cursor-pointer"
                value="Add post"
              />
            </form>
            {errorform ? (
              <span className="rounded bg-red-400 py-1 px-3 text-xs font-bold">
                Error creating the post, please try again
              </span>
            ) : null}
          </div>
        </div>
      ) : null }
    </div>
  );
};

export default NewPost;
