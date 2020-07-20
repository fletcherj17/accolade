import React from "react";

const Map = ({city}) => {
  return (
    <iframe
    style={{width: '100%', height: '500px'}}
      src = {"https://www.google.com/maps/embed/v1/place?key="+process.env.API_KEY+"&q="+city}
    ></iframe>
  );
};

export default Map;
