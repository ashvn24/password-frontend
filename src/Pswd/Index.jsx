import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASEURL } from "../BaseUrl";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { Logout } from "../Store/AuthSlice";

const Index = () => {
  const { access } = useSelector((state) => state.usertoken);
  const [password, setPassword] = useState("");
  const [Save, setSave] = useState("");
  const [savedata, setSavedata] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (access === null) {
      navigate("/signin");
      toast.warning("Login First");
    }
  }, []);

  const [checkboxes, setCheckboxes] = useState({
    lower_case: true,
    upper_case: true,
    digits: true,
    special_case: true,
  });

  const handleCheckboxChange = (event) => {
    const { id } = event.target;
    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [id]: !prevCheckboxes[id], // Toggle the checkbox value
    }));
  };

  const submitForm = (e) => {
    e.preventDefault();
    const allUnchecked = Object.values(checkboxes).every((value) => !value);

    if (allUnchecked) {
      toast.warning("Please check at least one checkbox");
      return; // Stop further execution
    }
    const data = new FormData();
    data.append("upper_case", checkboxes.upper_case);
    data.append("lower_case", checkboxes.lower_case);
    data.append("digit", checkboxes.digits);
    data.append("special_case", checkboxes.special_case);

    axios
      .post(`${BASEURL}/pswd/create/`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${access}`,
        },
      })
      .then((res) => {
        console.log(res);

        setPassword(res.data.password);
      });
  };

  const savePass = () => {
    if (Save !== "") {
      try {
        const data = new FormData();
        data.append("name", Save);
        data.append("password", password);
        axios
          .post(`${BASEURL}/pswd/save/`, data, {
            headers: {
              "Content-Type": "mutipart/formdata",
              Authorization: `Bearer ${access}`,
            },
          })
          .then((res) => {
            console.log(res);
            if (res.status === 201) {
              toast.dark("Password Saved");
            }
          });
      } catch (error) {
        toast.error(error.message);
      } finally {
        setPassword("");
        setSave("");
        setCheckboxes({
          lower_case: true,
          upper_case: true,
          digits: true,
          special_case: true,
        });
      }
    }else{
      toast.warning('Please enter a name for the saved Password');
    }
  };

  const reset = () => {
    setPassword("");
    setSave("");
    setCheckboxes({
      lower_case: true,
      upper_case: true,
      digits: true,
      special_case: true,
    });
  };

  const viewpass = () => {
    axios
      .get(`${BASEURL}/pswd/save/`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })
      .then((res) => {
        setSavedata(res.data);
        console.log(savedata);
      });
  };

  const logout = () => {
    dispatch(Logout())
    navigate('/signin')
    toast.success('Logged Out')
  }

  return (
    <div className="h-screen bg-gradient-to-r from-blue-900 via-indigo-500 to-cyan-400 flex justify-between items-center relative">
      <div></div> {/* This div is for spacing */}
      <div className="absolute top-0 right-0 p-4">
        <button onClick={logout} className="p-3 bg-orange-500 rounded-md font-bold text-white">logout</button>
      </div>
      <div className="container flex flex-col justify-start items-center">
        <div className="flex flex-col bg-slate-100 w-[50rem] h-[30rem] rounded-xl bg-opacity-60">
          <div className="flex justify-center items-start w-full">
            <h1 className="text-white text-center mt-10 font-bold text-2xl">
              Password Generator
            </h1>
          </div>
          <form onSubmit={(e) => submitForm(e)}>
            <div className="flex justify-center items-start mt-12 text-white gap-5">
              <div>
                <input
                  type="checkbox"
                  id="upper_case"
                  checked={checkboxes.upper_case}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                <label htmlFor="checkbox1" className="mr-4">
                  Upper
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="lower_case"
                  checked={checkboxes.lower_case}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                <label htmlFor="checkbox2" className="mr-4">
                  Lower
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="digits"
                  checked={checkboxes.digits}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                <label htmlFor="checkbox3" className="mr-4">
                  Digits
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="special_case"
                  checked={checkboxes.special_case}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                <label htmlFor="checkbox4" className="mr-4">
                  Special
                </label>
              </div>
            </div>
            <div className="flex flex-row gap-3 justify-center items-center mt-16">
              <div className="flex flex-col justify-start items-center">
                <button
                  type="submit"
                  className=" bg-amber-400 p-3 rounded-md text-white font-bold"
                >
                  submit
                </button>
              </div>
              <div>
                <input
                  type="text"
                  readOnly
                  value={password}
                  className="h-12 w-72 rounded-md focus:outline-none pointer-events-none pl-4"
                />
              </div>
            </div>
          </form>
          <div className="flex flex-row justify-center items-center mt-10 gap-3">
            <button
              onClick={savePass}
              className="bg-green-600 p-3 rounded-md text-white font-semibold"
            >
              Save
            </button>
            <input
              type="text"
              value={Save}
              onChange={(e) => setSave(e.target.value)}
              className="w-72 h-12 rounded-md pl-4 focus:outline-none"
            />
          </div>

          <div className="flex flex-row gap-2 justify-center items-center mt-10">
            <button
              onClick={() => {
                viewpass();
                onOpen();
              }}
              className="p-3 bg-slate-600 rounded-md text-white font-semibold"
            >
              {" "}
              view
            </button>
            <button
              onClick={reset}
              className="p-3 bg-red-700 rounded-md text-white font-semibold"
            >
              {" "}
              Reset
            </button>
          </div>
        </div>
        <Modal size={"md"} isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Saved Password
                </ModalHeader>
                <ModalBody>
                  {savedata.map((item, index) => (
                    <div key={index} className="flex flex-row gap-4">
                      <p  className="font-bold">{item.name}</p> :{" "}
                      <p className="font-medium">{item.password}</p>
                    </div>
                  ))}
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default Index;
