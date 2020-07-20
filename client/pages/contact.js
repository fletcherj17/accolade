import React from "react";
import Layout from "../components/Layout";

const Contact = () => {
  return (
    <Layout>
      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
        <h2 className="text-4xl font-sans font-bold text-gray-800 text-center my-4">
          Reach Out!
        </h2>
        {/* {mensaje && <Alerta />} */}
        <div className="flex justify-center mt-5">
          <div className="w-full max-w-lg">
            <form
              className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
              // onSubmit={formik.handleSubmit}
            >
              <div className="mb-4">
                <label
                  className="block text-black text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  placeholder="Your email"
                  // value={formik.values.email}
                  // onChange={formik.handleChange}
                  //onBlur={formik.handleBlur}
                />
                {/*  {formik.touched.email && formik.errors.email ? (
                    <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.email} </p>
                    </div>
                  ) : null} */}
              </div>

              <div className="mb-4">
                <label
                  className="block text-black text-sm font-bold mb-2"
                  htmlFor="message"
                >
                  Message
                </label>
                <input
                  type="message"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="message"
                  placeholder="Your message"
                  // value={formik.values.email}
                  // onChange={formik.handleChange}
                  //onBlur={formik.handleBlur}
                />
                {/*  {formik.touched.email && formik.errors.email ? (
                    <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.email} </p>
                    </div>
                  ) : null} */}
              </div>

              <input
                type="submit"
                className="bg-teal-600 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold"
                value="Send Message"
              />
            </form>

            <div className="pt-20">
              <button className="bg-transparent mx-10 hover:bg-teal-600 py-2 px-4 rounded-full">
                <img className="h-10 w-10" src="/twitter.svg" />
              </button>
              <button className="bg-transparent mx-10 hover:bg-teal-600 py-2 px-4 rounded-full">
                <img className="h-10 w-10" src="/facebook.svg" />
              </button>
              <button className="bg-transparent  mx-10 hover:bg-teal-600 py-2 px-4 rounded-full">
                <img className="h-10 w-10" src="/instagram.svg" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
