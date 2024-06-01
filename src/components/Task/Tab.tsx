import clsx from "clsx";
import React from "react";

interface TabProps {
  title: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  notComplete?: boolean;
  className?: string | boolean;
}

const Tab = ({ title, onClick, notComplete, className }: TabProps) => {
  return (
    <div
      onClick={onClick}
      className={clsx(
        "xs:text-xs text-[0.7rem] border xs:p-2 p-1 relative border-gray-500 rounded-lg flex justify-center items-center text-white bg-black/50",
        className
      )}
    >
      {title}
      {notComplete && (
        <div className="absolute w-2 h-2 rounded-full bg-red-700 top-1 right-1" />
      )}
    </div>
  );
};

export default Tab;
