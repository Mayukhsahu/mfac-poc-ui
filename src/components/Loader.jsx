import { FallingLines } from "react-loader-spinner";

import React from 'react'

const Loader = () => {
  return (
    <div className="h-52 flex justify-center items-center w-full">
      <FallingLines
        color="#36241b"
        width="100"
        visible={true}
        ariaLabel="falling-lines-loading"
      />
    </div>
  );
}

export default Loader