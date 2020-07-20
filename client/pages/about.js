import React from 'react';
import Layout from '../components/Layout';

const about = () => {
    return (  
        <Layout>
            <div className="w-100 h-100 rounded overflow-hidden shadow-lg">
            <img className="w-full" src="/hero.png" alt="Ideas"></img>
            <h1 className="font-bold text-5xl text-center mt-10">Who we are...</h1>
            <p className="p-12">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <h1 className="font-bold text-5xl text-center mt-10">What we do...</h1>
            <p className="p-12">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            </div>
 

        </Layout>
    );
}
 
export default about;