import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from "react-router-dom";

const Layout = () => {

  const { access } = useSelector(state => state.usertoken)
  const navigate = useNavigate()

  useEffect(() => {
    if (access!== null){
      navigate('/index')
    }
  }, [])
  

  return (
   
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-900 via-indigo-500 to-cyan-400">
    <div className="flex  bg-white w-fit h-full p-8 rounded-lg shadow-lg">
      <div className='flex flex-col justify-center'>

      <Outlet/>
      </div>
    </div>
  </div>
  )
}

export default Layout
