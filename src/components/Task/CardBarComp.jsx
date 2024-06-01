import React from "react";
import ScoreBarComp from "../ScoreBarComp";
import { BsCoin } from "react-icons/bs";

const CardBarComp = ({
  img,
  title,
  price,
  disabled,
  present_value,
  final_value,
  key,
  onCLick,
}) => {
  return (
    <div
      key={key}
      className="flex flex-col gap-2 w-full py-2.5 px-4 rounded-md bg-slate-900 my-1"
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-3 justify-center items-center">
          <img className="w-[35px] h-[35px]" src={img} alt="change" />
          <div className="flex gap-1 flex-col justify-center items-center">
            <span className="text-[0.8rem]">{title}</span>
            <div className="flex gap-2 justify-center items-center">
              <BsCoin color="yellow" />
              <span className="text-[0.9rem]">{price}</span>
            </div>
          </div>
        </div>
        <button
          onClick={onCLick}
          className={`text-xs py-2 px-3 border border-gray-800 rounded-lg ${
            disabled
              ? "text-gray-600"
              : "text-white shadow-[0px_0px_12px_#655151]"
          }`}
          disabled={disabled}
        >
          Claim
        </button>
      </div>
      <ScoreBarComp present_value={present_value} final_value={final_value} />
    </div>
  );
};

export default CardBarComp;
