"use client";
// import ModalButton from "./Modals";
import React, { RefObject, useEffect, useRef, useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { DropdownInput } from "../Inputs/DropdownInput";
import { UserDropdown } from "../Dropdowns/AllDropdowns";
import Tooltip from "../Tooltips";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getOutlets, getProducts } from "@/app/api/app.api";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setOutlet, setSelectedProduct, setSingleDate, setStartAndEndDate, setTimeframe } from "@/app/store/slices/app.slice";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Cookies from "js-cookie";
import { RootState } from "@/app/store/store";



interface OutletData {
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
  // __v: number;
  budgetPercentage: number;
  timeElapsed: number;
  budget: number;
  role: string;
}
interface FormDataInterface {
  outletId: string,
  timeframe: string,
  selectedDate:   Date | undefined,
  startDate:   Date | undefined,
  endDate:   Date | undefined,
  selectedProduct: string
}

let token = Cookies.get("d3m-auth-token");

export default function Header() {
  const pathname = usePathname();
  const dispatch = useDispatch()
  const isActivePageUploads = pathname === "/upload";
  if (isActivePageUploads) {
    return null;
  }
  const [allOutlet, setAllOutlet] = useState<OutletData[]>([]);
  const [products, setProducts] = useState<{name:string}[] | null>(null)
  const { outletId, timeframe, startDate, endDate, date, product } = useSelector((state:RootState)=>state.app)
  const [formData, setFormData] = useState<FormDataInterface>({
    outletId: outletId || "",
    timeframe: timeframe || "",
    selectedDate: date? new Date(date) : undefined,
    startDate: startDate ? new Date(startDate) : undefined,
    endDate: endDate ? new Date(endDate) : undefined,
    selectedProduct: product || "",
  });
  const filterBar = useRef<HTMLDivElement>(null);
  const handleScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY >= 92) {
      filterBar.current?.classList.add("fixed");
    } else {
      filterBar.current?.classList.remove("fixed");
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  //get all outlets
 useQuery({
    queryKey: ["getAllOutlets"],
    queryFn: getOutlets,
    onError: err => {
      console.log(err)
      toast.error("An internal server error has occured, Could not get outlets")
    },
    onSuccess: data => {
      if (data.status === "error") {
        return toast.error(data.message)
      }
      setAllOutlet(data.allOutlets)
    },
    refetchOnWindowFocus: false
  })

  //get all products
   useQuery({
    queryKey: ["getAllProducts", token],
    queryFn: getProducts,
    onSuccess: response => {
      if (response.status === "error") {
        return toast.error(response.message)
      }
      setProducts(response.data)
    },
    onError: err => {
      console.log(err)
      toast.error("An internal server error has occured, Could not get Products.")
    },
  })

  const handleChange = (type: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [type]: value
    }))
    switch (type) {
      case "outletId": {
        return dispatch(setOutlet(value))
      };
      break;
      case "timeframe": {
        if (value !== "day" && value !== "custom") {
          dispatch(setStartAndEndDate(undefined))
          dispatch(setSingleDate(undefined))
          // dispatch(setSelectedProduct(undefined))
          return dispatch(setTimeframe(value));
        }
      };
      break;
      case "selectedProduct": {
        if(value === "All Products"){
          return dispatch(setSelectedProduct(undefined))
        }else {
        return dispatch(setSelectedProduct(value))
        }
      };
      break;
      case "day": {
        return;
      };
    };


  }


  let periodFilter = [
    {
      label: "Specific Day",
      value: "day"
    },
    {
      label: "Custom",
      value: "custom"
    },
    {
      label: "Today",
      value: "today"
    },
    {
      label: "Yesterday",
      value: "yesterday"
    },
    {
      label: "Current Week",
      value: "currentweek"
    },
    {
      label: "Last Week",
      value: "lastweek"
    },
    {
      label: "This Month",
      value: "month"
    },
    {
      label: "Last Month",
      value: "lastmonth"
    }
  ]

  const handleSingleDateChange = (date: Date) => {
    setFormData(prev => ({
      ...prev,
      selectedDate: date
    }))
    dispatch(setTimeframe(undefined))
    dispatch(setStartAndEndDate(undefined))
    dispatch(setSingleDate(date))
  }

  const handleCustomDateChange = (date: any[]) => {
    const [start, end] = date;
    setFormData(prev => ({
      ...prev,
      startDate: start,
      endDate: end
    }))
    if (start && end) {
      dispatch(setTimeframe(undefined))
      dispatch(setSingleDate(undefined))
      dispatch(setStartAndEndDate({ startDate: start, endDate: end }))
    }
  }
  return (
    <nav className="z-50 w-full flex flex-col bg-gray-100/90 dark:bg-gray-900/90 text-gray-900 shadow-lg top-0 left-0">
      <div className="w-full px-8 py-4 flex flex-row justify-between items-center align-end">
        <div className="flex justify-start items-center">
          {/* Company Logo */}
          <a
            href="/dashboard"
            className="lg:inline-block text-5xl font-bold cursor-pointer"
          >
            <img
              src="./assets/imgs/GenesisLogo.png"
              className="w-40"
              alt="logo"
              draggable={false}
            />
          </a>
          {/* Title */}
          <div className="hidden md:inline-block md:mx-4">
            <h1 className="font-bold text-3xl uppercase dark:text-gray-100">
              Genesis Group D3M Dashboard
            </h1>
            <p className="text-gray-500 dark:text-gray-300 font-light text-sm">
              Company Data-Driven Decision Making Platform
            </p>
          </div>
        </div>
        <UserDropdown />
      </div>
      <div ref={filterBar}  className="w-full bg-gray-100/90 dark:bg-gray-900/90 py-4 flex flex-row justify-between items-center align-end border-t border-gray-200 dark:border-gray-700 z-40">
        <div className="w-[100%] px-8 flex flex-col md:flex-row justify-between">
          <div className="flex flex-col md:flex-row w-full relative">
            {/* Tooltip */}
            <div style={{ position: "relative", zIndex: "999" }}>
              <Tooltip
                icon={
                  <BiInfoCircle className="w-5 h-5 mx-2 text-black/50 dark:text-white" />
                }
                text="Filters can be used to get more specific data"
                className="absolute top-[50%] left-[-30px] translate-y-[-50%]"
              />
            </div>
            {/* Filters for data - Dropdowns */}
            <DropdownInput
              label="Select Outlet"
              selectable={true}
              select={formData.outletId}
              options={[{ name: "All Outlets", _id: "0" }, ...allOutlet].map((outlet) => ({
                value: outlet._id,
                label: outlet.name,
              }))}
              onChange={(val) => handleChange("outletId", val)}
            />
            <DropdownInput
              label="Select Timeframe"
              selectable={true}
              select={formData.timeframe}
              options={periodFilter.map((period) => ({
                value: period.value,
                label: period.label,
              }))}
              onChange={(val) => handleChange("timeframe", val)}
            />

            {(formData.timeframe === "day") &&
              <div className="w-full">
                <label
                  className="block mb-1 font-bold text-sm text-gray-700"
                  htmlFor="singleDate"
                >
                  Select Date
                </label>
                <div className="font-light text-sm mt-1 block w-[90%] border mr-3 text-center bg-white rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                  <DatePicker
                    showIcon
                    selected={formData.selectedDate}
                    onChange={handleSingleDateChange}
                    className=""
                    id="singleDate"
                  />
                </div>
              </div>
            }

            {(formData.timeframe === "custom") &&
              <div className="w-full">
                <label
                  className="block mb-1 font-bold text-sm text-gray-700"
                  htmlFor="dateRange"
                >
                  Select Date Range
                </label>
                <div className="font-light text-sm mt-1 block w-[90%] border mr-3 text-center bg-white rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                  <DatePicker
                    selectsRange={true}
                    startDate={formData.startDate}
                    endDate={formData.endDate}
                    onChange={handleCustomDateChange}
                    isClearable={true}
                    id="dateRange"
                    className="mh38"
                  />
                </div>
              </div>
            }

            {
              products &&  
              <div className="w-full">
              <DropdownInput
              label="Select a Product"
              selectable={true}
              select={formData.selectedProduct}
              options={[{name:"All Products"},...products].map((prod) => ({
                value: prod.name,
                label: prod.name,
              }))}
              onChange={(val) => handleChange("selectedProduct", val)}
            />
            </div>
            }
          </div>
        </div>
      </div>
    </nav>
  );
}
