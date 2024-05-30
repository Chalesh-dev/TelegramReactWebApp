import { Dispatch, SetStateAction, useEffect, useState } from "react";
import bgImg from "../../assets/bg_images/bg-2.png";
import RootLayout from "../../components/RootLayout/RootLayout";
import Loading from "../../components/LoadingComp/Loading";
import Balance from "../../components/Balance/Balance";
import CoinIcon from "../../components/Tap/CoinIcon";
import ScoreBar from "../../components/Tap/ScoreBar";
import { useLocation } from "react-router-dom";

interface TapPageProps {
  socket: any;
  userId: any;
  user?: any;
  user_balance?: number;
  user_trophy?: string;
  userMultiTap?: number;
  maxEnergyLimit?: number;
  userBalance?: number;
  currentEnergy?: number;
  energyFillSpeed?: number;
  setUserBalance?: React.Dispatch<React.SetStateAction<number>>;
  setCurrentEnergy?: React.Dispatch<React.SetStateAction<number>>;
}

const TapPage: React.FC<TapPageProps> = ({
  socket,
  userId,
  userBalance,
  setUserBalance,
  user_trophy,
  userMultiTap,
  maxEnergyLimit,
  energyFillSpeed,
  currentEnergy,
  setCurrentEnergy,
}) => {
  const location = useLocation();
  const pathname = location.pathname.split("/")[1];

  // useEffect(() => {
  //   if (pathname !== "tap") {
  //     socket.emit("submit", "");
  //   }
  // }, [pathname]);

  console.log(
    userId,
    "balance:",
    userBalance,
    "user_trophy:",
    user_trophy,
    "tapInfo:",
    userMultiTap,
    "maxEnergyLimit:",
    maxEnergyLimit
  );

  useEffect(() => {
    socket.on("top", (data: any) => {
      if (setUserBalance) {
        setUserBalance((prevState) => (prevState ?? 0) + Number(data));
      }
      // scoreRef.current = data;
      // setCurrentSpark((prevSpark) => Math.max(prevSpark - data, 0));
    });

    socket.on("energy", (data: any) => {
      if (setCurrentEnergy) {
        setCurrentEnergy(Number(data));
      }
    });

    socket.emit(
      "id",
      {
        id: userId,
        limit: maxEnergyLimit,
        speed: energyFillSpeed,
        energy: currentEnergy,
      },
      (data: any) => {}
    );
  }, [socket]);

  useEffect(() => {
    socket.emit(
      "id",
      {
        id: userId,
        limit: maxEnergyLimit,
        speed: energyFillSpeed,
        energy: currentEnergy,
      },
      (data: any) => {}
    );
  }, [maxEnergyLimit, energyFillSpeed]);

  const handleCoinClick = () => {
    socket.emit(
      "tap",
      {
        // id: userId,
        level: userMultiTap,
      },
      function (data: any) {
        console.log("data:", data);
      }
    );
    //   //   // setBalance((prevBalance) => prevBalance + Number(user?.level?.unit));
  };

  return (
    <>
      {/* {loading ? (
        <Loading />
      ) : ( */}
      <RootLayout bg_img={bgImg}>
        <div className="flex flex-col items-center justify-around w-full h-full">
          <p className="text-red-500">{userId}</p>
          {/* <p className="text-red-500">{userId}</p>
            <p className="text-white">amount:{user?.user?.t_balance[0]?.amount}</p>
            <p>status:{user?.status}</p> */}

          <Balance balance={userBalance} user_trophy={user_trophy} cup={true} />

          <CoinIcon
            balance={userBalance}
            increment={userMultiTap}
            onCoinClick={handleCoinClick}
            currentSpark={currentEnergy}
          />

          <ScoreBar
            maxLimitSpark={maxEnergyLimit}
            incrementSparkNumber={userMultiTap}
            currentSpark={currentEnergy}
            // setCurrentSpark={setCurrentSpark}
          />

          {/* {loadingRecharging ? (
          <ProgressBarLoading />
        ) : ( */}
          {/* <ScoreBar
              maxLimitSpark={energyUnit?.size}
              incrementSparkNumber={Number(increaseSpeed?.unit)}
              currentSpark={currentSpark}
              // setCurrentSpark={setCurrentSpark}
            /> */}
          {/* )} */}
        </div>
      </RootLayout>
      {/* )} */}
    </>
  );
};

export default TapPage;
