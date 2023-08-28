"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { UploadHistoryTable } from "../components/Tables/AllTables";
// import { TextInput } from "../components/Inputs/Inputs";
import "react-datepicker/dist/react-datepicker.css";
import { useMutation, useQuery } from "@tanstack/react-query";
// import { getPayrollHistory, uploadPayroll } from "@/app/api/payroll.api";
import { useSelector } from "react-redux";
// import { RootState } from "@/app/redux/store";
import { FaCloudUploadAlt } from "react-icons/fa";
// import { PayslipTable } from "../components/Tables/PayslipTable";
import { toast } from "react-toastify";
// import { Loader } from "@/app/(auth)/components/Loader";
// import { queryClient } from "@/app/redux/provider";

interface FileSelect {
  name: string;
  size: number;
}
const UploadFile = () => {
  const [dateValue, setDateValue] = useState<any>(new Date());
  const [selectedFile, setSelectedFile] = useState<any>("");

  return (
    <>
      <div className="w-full h-screen bg-scale bg-gray-300">
        <div className="w-full text-black">
          <h1 className="md:text-4xl text-3xl text-center font-bold tracking-wide py-4 ease-in-out duration-500">
            Upload File
          </h1>
          <p className="text-sm text-center font-normal mb-2 text-black/60">
            Choose a date and upload the file for that month
          </p>
        </div>
        <div className="px-14">
          <div className="w-full flex flex-col md:flex-row justify-between my-6 mx-4 bg-white rounded-md">
            {/* {isLoading && <Loader />} */}
            <form
              onSubmit={() => {
                console.log("submitted!");
              }}
              className="w-full md:w-[50%] md:mx-2 mx-auto"
            >
              <div className="h-auto relative my-2 p-4">
                <div className="my-2 flex flex-col border border-gray-200 px-4 rounded-md shadow-lg">
                  <label
                    htmlFor="monthSelect"
                    className="text-black border-b border-gray-200 font-semibold my-2"
                  >
                    Select Month
                  </label>
                  <DatePicker
                    id="monthSelect"
                    selected={dateValue}
                    className={`w-full py-2 text-black`}
                    showMonthYearPicker
                    dateFormat="MM/yyyy"
                    onChange={(val: Date) => {
                      console.log(val);
                    }}
                  />
                </div>

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
                        onChange={() => {
                          console.log("file uploaded!");
                        }}
                      />
                    </label>
                  </div>

                  <button
                    type={"submit"}
                    className={`btn button text-white ${
                      selectedFile
                        ? "bg-green-400 hover:bg-green-600"
                        : "bg-trueGray-300"
                    } transition-all duration-150 py-2 rounded-md font-semibold`}
                    disabled={!selectedFile}
                  >
                    {/* {isLoading ? "Submitting..." : "Submit"} */}
                  </button>
                </div>
              </div>
            </form>

            <div className="w-full md:w-[50%] md:mx-2 mx-auto mt-4">
              <UploadHistoryTable
                title="File Upload History"
                // tableRow={payrollHistory.data}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadFile;
