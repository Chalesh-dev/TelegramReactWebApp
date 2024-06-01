import { useEffect, useState } from "react";
import bgImg from "../../assets/bg_images/bg-2.png";
import RootLayout from "../../components/RootLayout/RootLayout";
import Loading from "../../components/LoadingComp/Loading";
import Balance from "../../components/Balance/Balance";
import CoinIcon from "../../components/Tap/CoinIcon";
import ScoreBar from "../../components/Tap/ScoreBar";

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
  setUserBalance: React.Dispatch<React.SetStateAction<number>>;
  setCurrentEnergy: React.Dispatch<React.SetStateAction<number>>;
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
  useEffect(() => {
    socket.on("top", (data: any) => {
      setUserBalance((prevState) => (prevState ?? 0) + Number(data.level));
      setCurrentEnergy((prevState) => (prevState ?? 0) - Number(data.energy));
    });

    socket.on("energy", (data: any) => {
      setCurrentEnergy(Number(data));
    });
  }, [socket]);

  //todo: change this or emit when user upgrade its energy fill speed in boost page
  // useEffect(() => {
  //   socket.emit(
  //     "id",
  //     {
  //       id: userId,
  //       limit: maxEnergyLimit,
  //       speed: energyFillSpeed,
  //       energy: currentEnergy,
  //     },
  //     (data: any) => {}
  //   );
  // }, [maxEnergyLimit, energyFillSpeed]);
  const [fireMode, setFireMode] = useState(1);

  const handleCoinClick = () => {
    socket.emit(
      "tap",
      {
        // id: userId,
        level: Number(userMultiTap).toString(),
      },
      (data: any) => {}
    );
  };

  return (
    <>
      <RootLayout bg_img={bgImg}>
        <div className="flex flex-col items-center justify-around w-full h-full">
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
    </>
  );
};

export default TapPage;
