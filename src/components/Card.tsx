import { IoIosArrowForward } from "react-icons/io";

const Card = ({
  icon,
  name,
  coin_num,
  level,
  onClick,
  arrow = true,
  key,
}: any) => {
  return (
    <div
      key={key}
      onClick={onClick}
      className="w-full p-2.5 rounded-md bg-slate-900 flex items-center justify-between my-1"
    >
      <div className="flex items-center gap-4">
        {icon}
        <div className="flex flex-col justify-evenly gap-1">
          {name ? name : "---"}
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5 items-center">
              <img src="./images/coin.png" alt="coin" className="w-4 h-4" />
              <span className="text-sm">
                {coin_num ? Number(coin_num).toLocaleString() : "---"}
              </span>
            </div>
            {level && (
              <div className="flex items-center text-sm text-gray-400">
                | + {level ? level : "---"} level
              </div>
            )}
          </div>
        </div>
      </div>
      {arrow && <IoIosArrowForward />}
    </div>
  );
};

export default Card;
