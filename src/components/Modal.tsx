import React from "react";
import { Close, Coin } from "./Icons";

interface ModalTypes {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  openModal: boolean;
  task?: boolean;
  taskInfo?: {
    uuid?: string;
    title?: string;
    reward?: number;
    link?: string;
    status?: boolean;
    claimed?: boolean;
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
  bot?: boolean;
  botEarning?: number | undefined | null;
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
  bot,
  botEarning,
}: ModalTypes) => {
  return (
    <div
      className={`${
        openModal &&
        (task ? "translate-y-24" : bot ? "translate-y-36" : "translate-y-5")
      } transition-all ease-linear duration-700 fixed w-full h-full bg-gray-800/95 right-0 top-0 z-[999] flex flex-col xs:p-5 p-3 shadow-lg drop-shadow-lg`}
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
            <h1 className="capitalize xs:text-2xl text-xl text-center mb-3">
              {taskInfo?.title}
            </h1>
            <div className="my-3 bg-slate-900 py-2 px-3 rounded-md flex gap-3 items-center">
              <img
                className="w-[40px] h-[40px]"
                src="/images/coin-icon.png"
                alt="coin"
              />
              <div className="flex flex-col gap-1 items-center">
                <span className="text-white xs:text-sm text-xs">Reward</span>
                <span>{Number(taskInfo?.reward).toLocaleString()}</span>
              </div>
            </div>
            <h1 className="text-xl text-white mb-3">Your Tasks</h1>
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
            <p className="my-2 text-center text-white">{boostDescription}</p>
            <p className="text-sm">{boostTapInfo}</p>
            {!tap_tank && !bot && (
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
            {bot && (
              <div className="flex justify-center items-center gap-2">
                <Coin color="yellow" size={28} />
                <span className="text-white text-2xl">{botEarning}</span>
              </div>
            )}
            <button
              onClick={onClick}
              className={`${
                bot
                  ? "bg-gradient-to-b from-purple-300 to-purple-800 text-3xl"
                  : "bg-gradient-to-b from-slate-500 to-slate-700"
              } w-full xs:mt-10 mt-5 xs:py-7 py-3.5 rounded-md ${
                disabled && "text-gray-400"
              }`}
              disabled={disabled}
            >
              {bot ? "Get it!" : disabled ? "Insufficient amount" : "Upgrade"}
            </button>
          </div>
        )}
      </>
    </div>
  );
};

export default Modal;
