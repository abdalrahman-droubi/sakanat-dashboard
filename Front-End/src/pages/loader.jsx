import React from 'react'
import { PuffLoader } from "react-spinners";

function loader() {
    return ( 
        <div
        className="
          h-[100vh]
          flex 
          flex-col 
          justify-center 
          items-center 
        "
        >
          <PuffLoader
            size={100}
            color="red"
          />
        </div>
       );
}

export default loader