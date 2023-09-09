"use client";
import React, { FormEventHandler, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { FaSignOutAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { uploadReport } from "@/app/api/app.api";
import { useRouter } from "next/navigation";

export interface OutletType {
  _id: string;
  name: string;
  username: string;
  league: string;
  noOfDays: number;
  allTimeSales: number;
  averageDailySales: number;
  totalSeasonSales: number;
  created: string;
  updated: string;
  __v: number;
}

const UploadFilePage = () => {
  const router = useRouter()
  let stringedOutlet = Cookies.get("d3m-outlet");
  let outlet: OutletType = stringedOutlet ? JSON.parse(stringedOutlet) : null;

  const [selectedFile, setSelectedFile] = useState<any>("");

  const handleFileChange: FormEventHandler<HTMLInputElement> = (e) => {
    if (e.currentTarget.files) {
      setSelectedFile(e.currentTarget.files[0]);
    }
  }

  const { mutate: uploadFile, isLoading: uploading } = useMutation(uploadReport, {
    onError: (err) => {
      // console.log(err);
      toast.error("An error occured when uploading file, Try again.")
    },
    onSuccess: (data) => {
      if (data.status === "error") {
        return toast.error(data.message)
      }
      toast.success("File uploaded successfully");
      setSelectedFile("")
    },
  });

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    if (!selectedFile) { return toast.error("You have not selected a file") }
    const formData = new FormData();
    formData.append("d3m", selectedFile);
    let token = Cookies.get("d3m-auth-token")
    if (token) {
      await uploadFile({
        formData, token
      });
    }
  }

  const handleLogout = () => {
    Cookies.remove("d3m-auth-token");
    Cookies.remove("d3m-outlet");
    router.push("/login")
  }

  const checkAuth = () => {
    if (!outlet) {
      router.push("/login")
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])



  return (
    <>
      <div className="w-full h-screen bg-scale bg-gray-300">
        <div className="w-full text-black">
          <h1 className="md:text-4xl text-3xl text-center font-bold tracking-wide py-4 ease-in-out duration-500">
            Upload File
          </h1>
          <p className="text-sm text-center font-normal mb-2 text-black/60">
            Upload your day sales as exported from Eazee
          </p>
          <p
            className={`text-md  text-center font-light ${outlet ? "text-green-600" : "text-red-600"
              } font-bold`}
          >
            {outlet
              ? `Logged in as ${outlet.name} `
              : "You are not logged in"}
          </p>
          <div className="text-center my-3 flex justify-center">
            <button
              className=" flex items-center space-x-2 p-4 sm:p-2 bg-gray-200 dark:bg-gray-600 shadow-lg text-red-500 dark:text-white border border-gray-300 dark:border-gray-700 rounded-md hover:scale-105 transition-all duration-150"
              onClick={handleLogout}
            >
              {/* {icon} */}
              <FaSignOutAlt />
              <span className="hidden sm:block">Logout</span>
            </button>
          </div>
        </div>



        <div className="px-14">
          <div className="w-full flex flex-col md:flex-row justify-between my-6 mx-4 bg-white rounded-md">
            {/* {isLoading && <Loader />} */}
            <form
              onSubmit={handleSubmit}
              className="w-full md:w-[50%] md:mx-2 mx-auto"
            >
              <div className="h-auto relative my-2 p-4">
                <div className="mt-8 mb-2 pb-4 flex flex-col">
                  <div className="flex items-center justify-center w-full mb-4">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800  hover:bg-gray-100"
                    >
                      <div className="w-full flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500 "
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 ">
                          {selectedFile ? (
                            <span className="font-semibold">
                              {selectedFile?.name}
                            </span>
                          ) : (
                            <>
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
                              or drag and drop
                            </>
                          )}
                        </p>
                        <p className="text-xs text-gray-500 ">
                          {selectedFile ? (
                            Math.round(selectedFile?.size / 1000) + " KB"
                          ) : (
                            <>xlsx or CSV (MAX. 10MB)</>
                          )}
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>

                  <button
                    type={"submit"}
                    className={`btn button text-white ${selectedFile
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-green-300"
                      } transition-all duration-150 py-2 rounded-md font-semibold`}
                    disabled={!selectedFile || uploading}
                  >
                    {uploading ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </div>
            </form>

            {/* <div className="w-full md:w-[50%] md:mx-2 mx-auto mt-4"> */}
            {/* <UploadHistoryTable
                title="File Upload History"
              /> */}
            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadFilePage;
