import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Index = () => {
  const { access } = useSelector((state) => state.usertoken);
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
    if (access === null) {
      navigate("/signin");
      toast.warning("Login First");
    }
  }, []);

    const [checkboxes, setCheckboxes] = useState({
      lower_case: true,
      upper_case: true,
      digits: false,
      special_case: true,
    });


    const handleCheckboxChange = (event) => {
      const { id, checked } = event.target;
      setCheckboxes((prevCheckboxes) => ({
        ...prevCheckboxes,
        [id]: !checked[id],
      }));
    };

    const submitForm = (e) =>{
        e.preventDefault()
        const allUnchecked = Array.from(data.values()).every(value => value === "false");
        if (allUnchecked) {
            toast.warning("Please check at least one checkbox");
            return; // Stop further execution
        }
        const data = new FormData();

    }
  
  return (
    <div className="h-screen bg-gradient-to-r from-blue-900 via-indigo-500 to-cyan-400 flex justify-center items-center">
      <div className="container flex flex-col justify-start items-center">
        <div className="flex flex-col bg-slate-100 w-[50rem] h-[30rem] rounded-xl bg-opacity-60">
          <div className="flex justify-center items-start w-full">
            <h1 className="text-white text-center mt-10 font-bold text-2xl">
              Password Generator
            </h1>
          </div>
          <form onSubmit={(e)=>submitForm(e)}>
            <div className="flex justify-center items-start mt-12 text-white gap-5">
            <div>
          <input
            type="checkbox"
            id="checkbox1"
            checked={checkboxes.upper_case}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          <label htmlFor="checkbox1" className="mr-4">Upper</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="checkbox2"
            checked={checkboxes.lower_case}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          <label htmlFor="checkbox2" className="mr-4">Lower</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="checkbox3"
            checked={checkboxes.digits}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          <label htmlFor="checkbox3" className="mr-4">Digits</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="checkbox4"
            checked={checkboxes.special_case}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          <label htmlFor="checkbox4" className="mr-4">Special</label>
        </div>
            </div>
            <div className="flex flex-row gap-3 justify-center items-center mt-16">
            <div className="flex flex-col justify-start items-center">
                <button type="submit" className=" bg-amber-400 p-3 rounded-md text-white font-bold" >submit</button>
            </div>
            <div>
                <input type="text" value={password}  className="h-12 w-72 rounded-md focus:outline-none pointer-events-none pl-4"/>
            </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Index;
