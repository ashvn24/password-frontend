import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userSchema } from './utils'
import axios from 'axios'
import { BASEURL } from '../BaseUrl'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const SignUp = () => {

  const [signin, setSignin] = useState('SignUp')
  const [formData, setFormData] = useState({
    email:"",
    username:"",
    password:"",
    confirmpassword:""
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange =(e) => {
    const {name, value} = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }


  const submitForm = async (e) =>{
    e.preventDefault();

    const isFormValid = Object.values(formData).every(
      (value) => value.trim() !== ""
    );
    if (isFormValid) {
      try {
        setSignin('Loading...');
        await userSchema.validate(formData, { abortEarly: false });

        const data = new FormData();
        data.append('email', formData.email)
        data.append('username', formData.username)
        data.append('password', formData.password)

        axios.post(`${BASEURL}/user/reg/`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        }).then((res) => {
          if (res.status === 201) {
            toast.success("User created successfully!")
            navigate('/signin')
          }
        }).catch((error) => {
          Object.keys(error.response.data).forEach(field => {
            // Iterate over the array of error messages for the current field
            error.response.data[field].forEach(errorMessage => {
              console.log(`${field}: ${errorMessage}`);
              toast.warning(`${field}: ${errorMessage}`);
            });
          });
          });
      } catch (error) {
        if (error.errors ) {
          const errorMessage = error.errors[0];
          toast.warning(errorMessage);
        } else {
          // Handle other types of errors
          console.error('Error:', error);
          toast.error('An unexpected error occurred. Please try again later.');
        }
      }
      finally{
        setSignin('SignUp')
      }
    }
    else{
      toast.warning('fill all fields')
    }

  }

  return (
    <div>
    <h2 className=" text-3xl font-bold mb-6 text-center">Sign Up</h2>
      <form onSubmit={(e)=>submitForm(e)} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={handleChange}
              id="email"
              name="email"
              autoComplete="email"
              className="mt-1 p-3 border border-gray-300 block w-full rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={handleChange}
              id="txt"
              name="username"
              className="mt-1 p-3 border border-gray-300 block w-full rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className='flex justify-between gap-5'>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={handleChange}
              id="password"
              name="password"
              autoComplete="current-password"
              className="mt-1 p-3 border border-gray-300  w-full rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              value={formData.confirmpassword}
              onChange={handleChange}
              id="confirmpassword"
              name="confirmpassword"
              autoComplete="current-password"
              className="mt-1 p-3 border border-gray-300  w-full rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
          </div>
        </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
             {signin}
            </button>
          </div>
          <div className='flex'>
            <h3>Already have an account?</h3>
            < Link to='/signin'><p className='text-blue-700'>click here</p></Link>
          </div>
        </form>
    </div>
    
  )
}

export default SignUp
