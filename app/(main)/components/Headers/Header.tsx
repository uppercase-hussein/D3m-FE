"use client";
// import ModalButton from "./Modals";
import React, { useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { DropdownInput } from "../Inputs/DropdownInput";
import { UserDropdown } from "../Dropdowns/AllDropdowns";
import Tooltip from "../Tooltips";
import { usePathname } from "next/navigation";

type terminateStaff = {
  exitDate: string | undefined;
  exitType: string | undefined;
};

export default function Header() {
  const pathname = usePathname();
  const isActivePageUploads = pathname === "/upload";
  if (isActivePageUploads) {
    return null;
  }

  const [formData, setFormData] = useState<terminateStaff>({
    exitType: undefined,
    exitDate: undefined,
  });

  const setTerminateFormData = (field: string, value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  return (
    <nav
      className="w-full fixed flex flex-col bg-gray-100/90 dark:bg-gray-600 text-gray-900 shadow-lg top-0 left-0"
      style={{ zIndex: "9999" }}
    >
      <div className="w-full px-8 py-4 flex flex-row justify-between items-center align-end">
        <div className="flex justify-start items-center">
          {/* Company Logo */}
          <a
            href="/"
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
      <div className="w-full py-4 flex flex-row justify-between items-center align-end border-t border-gray-200 dark:border-gray-700">
        <div className="w-[100%] px-8 flex flex-col md:flex-row justify-between">
          <div className="flex flex-col md:flex-row w-full relative">
            {/* Tooltip */}
            <div style={{ position: "relative", zIndex: "999" }}>
              <Tooltip
                icon={<BiInfoCircle className="w-5 h-5 mx-2 text-black/50 dark:text-white" />}
                text="Filters can be used to get more specific data"
                className="absolute top-[50%] left-[-30px] translate-y-[-50%]"
              />
            </div>
            {/* Filters for data - Dropdowns */}
            <DropdownInput
              label="Filter One"
              selectable={true}
              select={formData.exitType || ""}
              options={[
                "termination",
                "absconded",
                "resignation",
                "redundancy",
                "retirement",
                "dismissal",
                "deceased",
                "standby",
                "unavailable",
              ].map((div) => ({
                value: div,
                label: div,
              }))}
              onChange={(value) => setTerminateFormData("exitType", `${value}`)}
            />
            <DropdownInput
              label="Filter Two"
              selectable={true}
              select={formData.exitType || ""}
              options={[
                "termination",
                "absconded",
                "resignation",
                "redundancy",
                "retirement",
                "dismissal",
                "deceased",
                "standby",
                "unavailable",
              ].map((div) => ({
                value: div,
                label: div,
              }))}
              onChange={(value) => setTerminateFormData("exitType", `${value}`)}
            />
            <DropdownInput
              label="Filter Three"
              selectable={true}
              select={formData.exitType || ""}
              options={[
                "termination",
                "absconded",
                "resignation",
                "redundancy",
                "retirement",
                "dismissal",
                "deceased",
                "standby",
                "unavailable",
              ].map((div) => ({
                value: div,
                label: div,
              }))}
              onChange={(value) => setTerminateFormData("exitType", `${value}`)}
            />
            <DropdownInput
              label="Filter Four"
              selectable={true}
              select={formData.exitType || ""}
              options={[
                "termination",
                "absconded",
                "resignation",
                "redundancy",
                "retirement",
                "dismissal",
                "deceased",
                "standby",
                "unavailable",
              ].map((div) => ({
                value: div,
                label: div,
              }))}
              onChange={(value) => setTerminateFormData("exitType", `${value}`)}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
