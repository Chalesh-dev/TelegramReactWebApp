import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Check } from "./Icons";

interface CardTypes {
  icon?: React.ReactElement<any, any>;
  name: string;
  coin_num: number;
  level?: number;
  onClick: React.MouseEventHandler<never>;
  arrow?: boolean;
  key?: number;
  isMax?: boolean;
  claimed?: boolean
}

const Card = ({
  icon,
  name,
  coin_num,
  level,
  onClick,
  arrow = true,
  key,
  isMax,
  claimed
}: CardTypes) => {
  return (
    <div
      key={key}
      onClick={onClick}
      className="w-full p-2.5 rounded-md bg-slate-900 flex items-center justify-between my-1"
    >
      <div className="flex items-center gap-4">
        {icon}
        <div
          className={`flex flex-col justify-evenly gap-1 xs:text-xs text-[0.7rem] ${
            isMax ? "text-gray-500" : "text-white"
          }`}
        >
          {name ? name : "---"}
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5 items-center">
              <img src="./images/coin.png" alt="coin" className="w-4 h-4" />
              <span className="xs:text-xs text-[0.7rem]">
                {coin_num ? Number(coin_num).toLocaleString() : "---"}
              </span>
            </div>
            {level && (
              <div
                className={`flex items-center xs:text-xs text-[0.7rem] ${
                  isMax ? "text-gray-500" : "text-gray-400"
                }`}
              >
                | + {level ? level : "---"} level
              </div>
            )}
          </div>
        </div>
      </div>
      {arrow && !claimed && <IoIosArrowForward />}
      {claimed && <Check color={'blue'} size={24} />}
    </div>
  );
};

export default Card;
