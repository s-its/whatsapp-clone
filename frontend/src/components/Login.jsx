import React, {useState} from "react";
import { UserCircle} from "lucide-react"
import FormInput from "./FormInput";
import SubmitButton from "./SubmitButton";
import {Link} from "react-router-dom";

const Login = () =>{
  const  [loginData, setLoginData] = useState({
    email:"",
    password:""
  })

  const handleChange=(event)=>{
    const {name, value} = event.target;

    setLoginData((prev) =>{
      return {
        ...prev,
        [name]: value,
      };
    });
  }
  return (
      <div className={"grid place-content-center h-screen"}>
        <div className={"bg-white w-96 rounded overflow-hidden p-5 shadow-md"}>
          <div className={"w-fit mx-auto mb-2"}>
            <UserCircle size={80} />
          </div>

          <h3 className={"text-center"}>Welcome to whatsapp</h3>

          <form action="" className="grid gap-4 mt-3">
              <FormInput
                  label={"Email"}
                  type={"email"}
                  name={"email"}
                  placeholder={"Enter the email"}
                  value={loginData.email}
                  onChange={handleChange}
              />
            <FormInput
                label={"Password"}
                type={"password"}
                name={"password"}
                placeholder={"Enter the password"}
                value={loginData.password}
                onChange={handleChange}
            />
            <SubmitButton>
              Submit
            </SubmitButton>
          </form>
          <p className={"mt-3 text-center"}>
            New User ? <Link to={"/register"} className={"text-blue-500"}>Register</Link>
          </p>
        </div>
      </div>
  )
}

export default Login