"use client";
import { loginReq } from "@/app/api/app.api";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import React, { FormEventHandler, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation'

interface Tab {
  title: string;
  role: string;
}

const LoginForm = () => {
  const router = useRouter()
  const [pin, setPin] = useState<string>("");
  const { mutate: sendLogin, isLoading } = useMutation(loginReq, {
    onSuccess: (data) => {
      if (data.status === "error") {
        return toast.error(data.message);
      }
      toast.success("Login Successful");
      Cookies.set("d3m-auth-token", data.token, { expires: 1 });
      Cookies.set("d3m-outlet", JSON.stringify(data.outlet), { expires: 1 });
      setPin("");
      data.outlet.role === "admin"?router.push('/dashboard'):data.outlet.role === "outlet"?router.push('/upload'):router.push('/login')
    },
    onError: (error) => {
      // console.log(error)
      // console.error("e", error);
      toast.error("An internal error has occured");
    },
  });

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    sendLogin({ username: pin });
  };

  return (
    <>
      <div className="border-b border-gray-200 mb-4">
        <div className="flex justify-center transition-all duration-200 ease-in">
          <div className="px-4 py-2 cursor-pointer text-gray-400">Please enter your Secret PIN</div>
        </div>
      </div>

      <form
        className="mt-8"
        onSubmit={handleSubmit}
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold mx-auto mb-8 text-gray-800">
            D<sup className="text-red-500">3</sup>M
          </h1>
        </div>
        {/* <div className="relative w-full mb-4">
          <input
            type="number"
            // onChange={(e) => handleChange("staffId", e.target.value)}
            className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            placeholder="Username"
            required
          />
        </div> */}
        <div className="flex flex-row justify-evenly">
          <div className="relative w-full mb-4">
            <input
              type="password"
                onChange={(e) => setPin(e.target.value)}
              className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              placeholder="Secret PIN"
              required
            />
          </div>
        </div>

        <div>
          <label className="inline-flex items-center cursor-pointer">
            <input
              id="customCheckLogin"
              type="checkbox"
              className="form-checkbox border-0 rounded text-gray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
            />
            <span className="ml-2 text-sm font-semibold text-gray-600">
              Remember me
            </span>
          </label>
        </div>

        <div className="text-center mt-6">
          <button
            className={`${isLoading?"bg-gray-600 hover:bg-gray-500":"bg-red-600 hover:bg-red-500"} text-white active:bg-red-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg  outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading?"Processing":"Login"}
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
