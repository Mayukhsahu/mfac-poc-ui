import React from 'react'

const Button = ({btnData, apiCall}) => {

  return (
    <>
        {/* <input type="text" value={} onChange={}/> */}
        <button onClick={() => apiCall(btnData.name)} className="ml-auto bg-indigo-500 text-white rounded-full px-4 py-1 mr-9 mb-5">{btnData.name}</button>
    </>
  )
}
export default Button