"use client";
import React, { useState } from "react";

interface Tab {
  title: string;
  role: string;
}

const LoginForm = () => {
  /* Tab functionality  - REMOVE */
  const [activeTab, setActiveTab] = useState<Tab>({
    title: "Staff",
    role: "staff",
  });
  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="border-b border-gray-200 mb-4">
        <div className="flex justify-center transition-all duration-200 ease-in">
          <div
            className={`px-4 py-2 cursor-pointer ${
              activeTab.role === "staff" ? "text-red-500" : "text-gray-500"
            }`}
            onClick={() => handleTabClick({ title: "Staff", role: "staff" })}
          >
            Outlet
          </div>
          <div
            className={`px-4 py-2 cursor-pointer ${
              activeTab.role === "admin" ? "text-red-500" : "text-gray-500"
            }`}
            onClick={() => handleTabClick({ title: "Admin", role: "admin" })}
          >
            Admin
          </div>
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
            {activeTab.role === "admin" && (
              <span className="text-xs font-semibold text-red-500 uppercase mx-2">
                Admin
              </span>
            )}
          </h1>
        </div>
        <div className="relative w-full mb-4">
          <input
            type="number"
            // onChange={(e) => handleChange("staffId", e.target.value)}
            className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            placeholder="Staff ID"
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
          {activeTab.role === "admin" && (
            <div className="relative w-full ml-2">
              <input
                type="password"
                // onChange={(e) => handleChange("adminPassword", e.target.value)}
                className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder="* Admin Password"
                required
              />
            </div>
          )}
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
            Sign In
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
