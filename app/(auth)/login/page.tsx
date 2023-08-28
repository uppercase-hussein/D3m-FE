import React from "react";
import Link from "next/link";
import LoginForm from "../components/LoginForm";

export default function Login() {
  return (
    <div className="w-full h-[100vh] bg-scale bg-red-700 bg-fixed overflow-hidden overflow-y-clip">
      <div className="container mx-auto px-4 mt-28">
        <div className="flex content-center items-center justify-center">
          <div className="w-full md:w-6/12 lg:w-5/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <LoginForm />
                <div className="flex flex-wrap mt-6 relative">
                  <div className="w-1/2">
                    <Link
                      href="/forgot-password"
                      //   onClick={(e) => e.preventDefault()}
                      className="text-gray-900 hover:border-b hover:border-gray-900 transition-all ease-in duration-100"
                    >
                      <small>Forgot password?</small>
                    </Link>
                  </div>
                  <div className="w-1/2 text-right">
                    <Link
                      href="#"
                      className="text-gray-900 hover:border-b hover:border-gray-900 transition-all ease-in duration-100"
                    >
                      <small>Create new account</small>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
