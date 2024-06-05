import clsx from "clsx";
import { Link } from "react-router-dom";
import { ArrowRight, Trophy } from "../Icons";

interface BalanceType {
  border?: boolean;
  cup?: boolean;
  description?: string;
  referral?: boolean;
  referral_score?: number;
  referral_status?: boolean;
  balance?: number | string;
  user_trophy?: string
}

const Balance = ({
  border,
  cup,
  description,
  referral,
  referral_score,
  referral_status = false,
  balance,
  user_trophy
}: BalanceType) => {
  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center gap-3 p-3",
        border && "border-b-[1px] border-slate-500"
      )}
    >
      {referral_status ? (
        <div className="flex flex-col gap-1 items-center justify-center">
          <p className="text-xl text-white font-bold">{referral} Referrals</p>
          <span className="text-sm text-green-600">+ {referral_score}</span>
        </div>
      ) : (
        <>
          {description && <p className="pb-0 text-sm">{description}</p>}
          <div className="flex gap-2 items-center w-full justify-center">
            <img src="./images/coin-icon.png" alt="coin" />
            {/* {user?.loading ? (
              <span className="text-3xl text-white font-bold">----</span>
            ) : (
              <span className="text-3xl text-white font-bold">
                {balance} {stats && user?.balance > 0 && " T"}
              </span>
            )} */}
            <span className="text-3xl text-white font-bold">
              {balance} 
            </span>
          </div>
          {cup && (
            <Link
              className="flex justify-center items-center gap-2"
              to={"/trophy"}
            >
              <Trophy />
              {user_trophy}
              <ArrowRight size={24} />
            </Link>
          )}
          {/* {cup && (
            <Link
              to={"/trophy"}
              className="flex justify-center items-center gap-2"
            >
              <Trophy />
              {user?.user_trophy}
              <ArrowRight size={24}
            </Link>
          )} */}
        </>
      )}
    </div>
  );
};

export default Balance;
