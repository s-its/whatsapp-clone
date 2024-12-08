import React, {useState} from "react";
import {X, UserCircle} from "lucide-react"
import FormInput from "./FormInput";
import SubmitButton from "./SubmitButton";
import {Link, useNavigate} from "react-router-dom";
import uploadFile from "../uitls/uploadFile";
import axios from "axios";
import {toast} from "sonner";

const Register = () =>{
  const navigate = useNavigate();
  const  [registerData, setRegisterData] = useState({
    name:"",
    email:"",
    password:"",
    profilePic:""
  });

  const [uploadImg, setUploadImg] = useState("");

  const handleClearPhoto = (event) => {
    event.preventDefault();
    setUploadImg(null);
  };

  const handleChange=(event)=>{
    const {name, value} = event.target;

    setRegisterData((prev) =>{
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUpload = async (event) => {
    const file = event.target.files?.[0];
    const uploadImage= await uploadFile(file);
    console.log(uploadImage, "image")
    setUploadImg(file);
    setRegisterData((prev) => {
      return {
        ...prev,
        profilePic: uploadImage,
      };
    });

  };

  const handleSubmit = async (event)=>{
    event.preventDefault();
    event?.stopPropagation();
    console.log("debugger1")
    try{
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/register`, registerData);
      console.log("debugger2" , res.data)
      if (res.data.success) {
        toast.success(res?.data?.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
      <div className={"grid place-content-center h-screen"}>
        <div className={"bg-white w-96 rounded overflow-hidden p-5 shadow-md"}>
          <div className={"w-fit mx-auto mb-2"}>
            <UserCircle size={80} />
          </div>

          <h3 className={"text-center"}>Welcome to whatsapp</h3>

          <form onSubmit={handleSubmit} action="" className="grid gap-4 mt-3">
            <FormInput
                label={"Name"}
                type={"text"}
                name={"name"}
                placeholder={"Enter the name"}
                value={registerData.name}
                onChange={handleChange}
            />
            <FormInput
                label={"Email"}
                type={"email"}
                name={"email"}
                placeholder={"Enter the email"}
                value={registerData.email}
                onChange={handleChange}
            />
            <FormInput
                label={"Password"}
                type={"password"}
                name={"password"}
                placeholder={"Enter the password"}
                value={registerData.password}
                onChange={handleChange}
            />
            <div>
              <label htmlFor={"profilePic"}> Profile Picture:
                <div className={"h-14 bg-slate-200 flex justify-center items-center border rounded hover:border-primary"}>
                  <p className={"text-sm mx-w-[300px] text-ellipsis line-clamp-1"}>
                    {uploadImg?.name || "upload profile photo"}
                  </p>
                  {uploadImg?.name && (
                      <button className={"text-lg ml-2 hover:text-red-600"} onClick={handleClearPhoto}>
                        < X />
                      </button>
                  )}
                </div>
              </label>
              <input
                  type={"file"}
                  id={"profilePic"}
                  name={"profilePic"}
                  className={"bg-slate-100 px-2 py-1 focus:outline-none hidden"}
                  onChange={handleUpload}
              />
            </div>
            <SubmitButton>
              Submit
            </SubmitButton>
          </form>
          <p className={"mt-3 text-center"}>
            Existing User ? <Link to={"/login"} className={"text-blue-500"}>Login</Link>
          </p>
        </div>
      </div>
  )
}

export default Register