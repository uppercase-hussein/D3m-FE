import React, { useState } from "react";
import Calendar from "react-calendar";
import { FaTimes } from "react-icons/fa";
import { FormInput } from "../Inputs/FormInput";

interface ModalButtonProps {
  outletName?: string;
  icon?: React.ReactElement;
  modalTitle: string;
  modalInstruction: string;
  modalCTA?: string;
}

export const ViewOutletDetailsModal: React.FC<ModalButtonProps> = ({
  outletName,
  modalTitle,
  modalInstruction,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div
        className="z-90 w-full px-4 py-2 text-gray-900 dark:text-white/90 text-sm"
        onClick={openModal}
      >
        View Details
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-[70%] bg-white dark:bg-gray-800 pt-4 rounded-md relative">
            <button
              className="absolute top-0 left-0 m-4 text-xl"
              onClick={closeModal}
            >
              <FaTimes className="text-gray-500 dark:text-white/90" />
            </button>
            <div className="px-4">
              <h1 className="text-2xl text-center font-bold mb-2 uppercase">
                {modalTitle}: {outletName}
              </h1>
              <p className="text-xs text-center text-gray-500 dark:text-white/90 font-light mb-4 uppercase">
                {modalInstruction}
              </p>
            </div>
            <hr className="w-full border-gray-200 dark:border-gray-700 mb-8" />
            <div className="w-full flex flex-col align-middle justify-between my-8 px-8">
              <div className="flex items-center justify-center">
                <Calendar
                  onChange={() => console.log("onclick function")}
                  selectRange={true}
                  value=""
                  className={["text-gray-900 rounded-md"]}
                />
              </div>
            </div>
            <div className="w-full text-center bg-red-400 text-white hover:bg-red-500 px-8 transition-all ease-in duration-150">
              {/* Close modal */}
              <button
                className="w-full text-sm py-3 transition-all duration-200 ease-in"
                onClick={closeModal}
              >
                close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
