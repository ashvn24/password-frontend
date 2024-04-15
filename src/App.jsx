import React from 'react'
import SignUp from './Auth/SignUp'
import { BrowserRouter, Route ,Routes } from "react-router-dom";
import Layout from './Auth/Layout';
import Signin from './Auth/Signin';
import Index from './Pswd/Index';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <BrowserRouter>
      <Routes>

        <Route element={<Layout/>}>
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/signin' element={<Signin/>} />
        </Route>

        <Route path='/index' element={<Index/>} />

      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
