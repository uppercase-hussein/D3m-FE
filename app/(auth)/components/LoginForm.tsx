"use client";
import React, { useState } from "react";

interface Tab {
  title: string;
  role: string;
}

const LoginForm = () => {
  return (
    <>
      <div className="border-b border-gray-200 mb-4">
        <div className="flex justify-center transition-all duration-200 ease-in">
          <div className="px-4 py-2 cursor-pointer text-gray-400">Please enter your login details</div>
        </div>
      </div>

      <form
        className="mt-8"
        onSubmit={() => {
          console.log("login successful");
        }}
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold mx-auto mb-8 text-gray-800">
            D<sup className="text-red-500">3</sup>M
          </h1>
        </div>
        <div className="relative w-full mb-4">
          <input
            type="number"
            // onChange={(e) => handleChange("staffId", e.target.value)}
            className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            placeholder="Username"
            required
          />
        </div>
        <div className="flex flex-row justify-evenly">
          <div className="relative w-full mb-4">
            <input
              type="password"
              //   onChange={(e) => handleChange("password", e.target.value)}
              className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              placeholder="Password"
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
            className="bg-red-600 text-white active:bg-red-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg hover:bg-red-500 outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
