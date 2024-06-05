import React, { useEffect, useState } from "react";
import moment from "moment";
import { number } from "@tma.js/sdk-react";

interface DailyBoosterTypes {
  icon: React.ReactElement;
  name: string;
  onClick: () => void;
  remain_num: number;
  max_boost: number;
  next_update: number;
}

const DailyBooster = ({
  icon,
  name,
  onClick,
  remain_num,
  max_boost,
  next_update,
}: DailyBoosterTypes) => {
  // const time = moment(next_update).format("hh:mm:ss");

  const calculateTimeLeft = () => {
    const difference = next_update - Math.floor(Date.now() / 1000);
    let timeLeft = {
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor(difference / 3600),
        minutes: Math.floor((difference % 3600) / 60),
        seconds: difference % 60,
      };
    } else {
      timeLeft = {
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  return (
    <div
      onClick={onClick}
      className="rounded-md border border-slate-500 xs:p-4 p-2 h-14 flex items-center xs:gap-2 gap-1 bg-[#2d0a4f]/70"
    >
      {icon}
      <div className="flex flex-col">
        <span
          className={`font-bold ${
            remain_num > 0 ? "text-white" : "text-gray-500"
          } xs:text-xs text-[0.7rem]`}
        >
          {name}
        </span>
        {remain_num > 0 ? (
          <span className={"xs:text-xs text-[0.7rem]"}>
            {remain_num}/{max_boost}
          </span>
        ) : (
          <span className={"xs:text-xs text-[0.7rem] text-gray-500"}>
            {`${timeLeft?.hours}h ${timeLeft?.minutes}m ${timeLeft?.seconds}s`}
          </span>
        )}
      </div>
    </div>
  );
};

export default DailyBooster;
