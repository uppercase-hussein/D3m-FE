import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FormInput } from "../Inputs/FormInput";

interface ModalButtonProps {
  outletName: string;
  icon: React.ReactElement;
  modalTitle: string;
  modalInstruction: string;
  modalCTA: string;
}

// ... (import statements and ModalButtonProps definition)

const ModalButton: React.FC<ModalButtonProps> = ({
  outletName,
  icon,
  modalTitle,
  modalInstruction,
  modalCTA,
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
        className="flex items-center space-x-2 p-4 sm:p-2 bg-gray-200 shadow-lg text-gray-900 border border-gray-300 rounded-md hover:scale-105 transition-all duration-150"
        onClick={openModal}
      >
        <span className="">{outletName}</span>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="md:w-[25%] w-[70%] bg-white pt-4 pb-4 rounded-md relative">
            <button
              className="absolute top-0 left-0 m-4 text-xl"
              onClick={closeModal}
            >
              <FaTimes className="text-gray-500" />
            </button>
            <div className="px-4">
              <h1 className="text-3xl text-center font-bold mb-2 uppercase">
                {modalTitle}
              </h1>
              <p className="text-xs text-center text-gray-500 font-light mb-4 uppercase">
                {modalInstruction}
              </p>
            </div>
            <div className="w-full border-b border-gray-200 mb-8" />
            <div className="flex flex-col justify-between px-8 mx-auto">
              <FormInput
                type={"text"}
                id={"input"}
                placeholder={"Type details"}
              />
              {/* Onclick form submit */}
              <button className="text-sm bg-green-500/80 hover:bg-green-500 text-white/60 hover:text-white py-2 px-4 rounded transition-all duration-200 ease-in mb-2">
                {modalCTA}
              </button>
              <button
                className="text-sm text-red-500 hover:text-red-700 transition-all duration-200 ease-in"
                onClick={closeModal}
              >
                cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalButton;
