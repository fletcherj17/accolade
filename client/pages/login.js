import React, { useContext, useEffect } from "react";
import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import authContext from "../context/auth/authContext";
//import Alerta from "../components/Alerta"; 
import { useRouter } from "next/router";
import Link from "next/link";

const Login = () => {
    // define context
    const AuthContext = useContext(authContext);
    const { message, autenticated, login, spinner} = AuthContext;

    // Next router
    const router = useRouter();

    useEffect(() => {
      if(autenticated) {
        router.push('/');
      }
    }, [autenticated]);


    // Form and validation with formik y Yup
    const formik = useFormik({
        initialValues: {
          email: '',
          password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                      .email('Invalid email!')
                      .required('Please insert your email'),
            password: Yup.string()
                      .required('You have to insert your password')
        }),
        onSubmit: data => {
          login(data)
        }
    });
 

  return (
    <Layout>
      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
        <h2 className="text-4xl font-sans font-bold text-gray-800 text-center my-4">
          Log-in
        </h2>
        { message  ? <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{message.msg} </p>
                  </div> : null}
        <div className="flex justify-center mt-5">
          <div className="w-full max-w-lg">
            <form
              className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
             onSubmit={formik.handleSubmit}
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
                 value={formik.values.email}
                 onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
               {formik.touched.email && formik.errors.email ? (
                  <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{formik.errors.email} </p>
                  </div>
                ) : null} 
              </div>

              <div className="mb-4">
                <label
                  className="block text-black text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  type="password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  placeholder="Your password"
                 value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur} 
                />
               {formik.touched.password && formik.errors.password ? (
                  <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{formik.errors.password} </p> 
                  </div>
               ) : null} 
              </div>
                { spinner ?
                 <div className="w-full h-full fixed block top-0 left-0 bg-white opacity-100 z-50">
                 <span className="text-teal-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0">
                   <i className="fas fa-circle-notch fa-spin fa-5x" />
                 </span>
               </div>    
                : null
              }
              <input
                type="submit"
                className="bg-teal-600 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold cursor-pointer"
                value="Log in"
              />
               <Link href="/signup" variant="body2">
               <a  className="block mt-4 text-gray-800 hover:text-gray-600">Don't have an account? <span className="underline">Sign Up</span></a>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
