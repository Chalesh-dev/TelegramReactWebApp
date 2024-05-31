import React from "react";
import { Close } from "./Icons";
import Loading from "./LoadingComponent/Loading";

const Modal = ({
  setOpenModal,
  openModal,
  loading,
  task,
  taskInfo,
  children,
  icon,
  boostTitle,
  boostDescription,
  boostTapInfo,
  boostTokenRequired,
  boostLevel,
  balance,
  onClick,
  tap_tank,
  disabled
}) => {
  return (
    <div
      className={`${
        openModal && (task ? "translate-y-0" : "translate-y-20")
      } transition-all ease-linear duration-700 fixed w-full h-full bg-gray-800/95 right-0 top-0 z-[999] flex flex-col p-5 shadow-lg drop-shadow-lg`}
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
      {loading ? (
        <Loading />
      ) : (
        <>
          {task ? (
            <div className="flex flex-col gap-2">
              <h1 className="capitalize text-2xl">{taskInfo.title}</h1>
              <p className="text-slate-400">{taskInfo.description}</p>
              <div className="my-2 bg-slate-900 py-2 px-3 rounded-md flex gap-3 items-center">
                <img
                  className="w-[40px] h-[40px]"
                  src="/images/coin-icon.png"
                  alt="coin"
                />
                <div className="flex flex-col gap-1 items-center">
                  <span className="text-white">Reward</span>
                  <span>{Number(taskInfo.number).toLocaleString()}</span>
                </div>
              </div>
              <h1 className="text-xl text-white">Your Tasks</h1>
              {children}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="w-[120px] h-[120px] flex justify-center items-center bg-slate-700 rounded-3xl">
                {icon}
              </div>
              <h1 className="text-center text-3xl text-white font-bold mt-8 mb-2">
                {boostTitle}
              </h1>
              <p className="my-2 text-center">{boostDescription}</p>
              <p className="text-sm">{boostTapInfo}</p>
              {!tap_tank && (
                <div className="flex w-full px-4 mt-8 justify-center gap-6 items-center">
                  <div className="flex gap-1 justify-center items-center">
                    <img src="/images/coin-icon.png" alt="coin" />
                    <span className="text-2xl mx-2">
                      {Number(boostTokenRequired).toLocaleString()}
                    </span>
                  </div>
                  <div className="text-2xl">|</div>
                  <div className="text-2xl">+ {boostLevel} level</div>
                </div>
              )}
              {tap_tank && <h1 className="font-bold text-4xl">Free</h1>}
              <button
                onClick={onClick}
                className={`w-full bg-gradient-to-b from-slate-500 to-slate-700 mt-10 py-5 rounded-md ${
                  disabled && "text-gray-400"
                }`}
                disabled={disabled}
              >
                {disabled ? "Insufficient amount" : "Upgrade"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Modal;
