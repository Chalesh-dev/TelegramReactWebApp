import React from "react";
import { Close } from "./Icons";

interface ModalTypes {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  openModal: boolean;
  task?: boolean;
  taskInfo?: {
    title?: string;
    description?: string;
    number?: number;
    body?: string;
    link?: URL;
    amount?: number;
  } | null;
  children?: React.ReactNode;
  icon?: React.ReactElement<any, any>;
  boostTitle?: string;
  boostDescription?: string;
  boostTapInfo?: string;
  boostTokenRequired?: number;
  boostLevel?: number;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  tap_tank?: boolean;
  disabled?: boolean;
}

const Modal = ({
  setOpenModal,
  openModal,
  task,
  taskInfo,
  children,
  icon,
  boostTitle,
  boostDescription,
  boostTapInfo,
  boostTokenRequired,
  boostLevel,
  onClick,
  tap_tank,
  disabled,
}: ModalTypes) => {
  return (
    <div
      className={`${
        (openModal && task) ? 'translate-y-24' : 'translate-y-5'
      } transition-all ease-linear duration-700 fixed w-full h-full bg-gray-800/95 right-0 top-0 z-[999] flex flex-col xs:p-5 py-1 px-2 shadow-lg drop-shadow-lg`}
      //   className={clsx(
      //     openModal ? "translate-y-0" : "translate-y-[100vh]",
      //     "transition-all duration-700 w-full h-full absolute bg-gray-800/95 right-0 top-0 z-[999] flex flex-col p-5"
      //   )}
    >
      <div className="flex justify-end items-center">
        <Close
          color={"#f0f0f0"}
          size={24}
          onClick={() => setOpenModal(false)}
        />
      </div>
      <>
        {task ? (
          <div className="flex flex-col xs:gap-2 gap-1">
            <h1 className="capitalize text-2xl text-center">{taskInfo?.title}</h1>
            <p className="text-slate-400 text-center text-sm">{taskInfo?.body}</p>
            <div className="my-2 bg-slate-900 py-2 px-3 rounded-md flex gap-3 items-center">
              <img
                className="w-[40px] h-[40px]"
                src="/images/coin-icon.png"
                alt="coin"
              />
              <div className="flex flex-col gap-1 items-center">
                <span className="text-white">Reward</span>
                <span>{Number(taskInfo?.amount).toLocaleString()}</span>
              </div>
            </div>
            <h1 className="text-xl text-white">Your Tasks</h1>
            {children}
          </div>
        ) : (
          <div className="flex flex-col items-center xs:gap-2 gap-1">
            <div className="w-[120px] h-[120px] flex justify-center items-center bg-slate-700 rounded-3xl">
              {icon}
            </div>
            <h1 className="text-center xs:text-3xl text-xl text-white font-bold mt-8 mb-2">
              {boostTitle}
            </h1>
            <p className="my-2 text-center">{boostDescription}</p>
            <p className="text-sm">{boostTapInfo}</p>
            {!tap_tank && (
              <div className="flex w-full px-4 mt-8 justify-center gap-6 items-center">
                <div className="flex gap-1 justify-center items-center">
                  <img src="/images/coin-icon.png" alt="coin" />
                  <span className="xs:text-2xl text-xl mx-2">
                    {Number(boostTokenRequired).toLocaleString()}
                  </span>
                </div>
                <div className="xs:text-2xl text-xl">|</div>
                <div className="xs:text-2xl text-xl">+ {boostLevel} level</div>
              </div>
            )}
            {tap_tank && (
              <h1 className="font-bold xs:text-4xl text-2xl">Free</h1>
            )}
            <button
              onClick={onClick}
              className={`w-full bg-gradient-to-b from-slate-500 to-slate-700 xs:mt-10 mt-5 xs:py-5 py-2.5 rounded-md ${
                disabled && "text-gray-400"
              }`}
              disabled={disabled}
            >
              {disabled ? "Insufficient amount" : "Upgrade"}
            </button>
          </div>
        )}
      </>
    </div>
  );
};

export default Modal;
