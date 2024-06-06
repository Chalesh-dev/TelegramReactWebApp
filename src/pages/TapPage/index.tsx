import { useCallback, useEffect, useState } from "react";
import bgImg from "../../assets/bg_images/bg-2.png";
import RootLayout from "../../components/RootLayout/RootLayout";
import Loading from "../../components/LoadingComp/Loading";
import Balance from "../../components/Balance/Balance";
import CoinIcon from "../../components/Tap/CoinIcon";
import ScoreBar from "../../components/Tap/ScoreBar";
import { trophies } from "../../components/config/trophiesList";

interface TapPageProps {
  sendMessage: any;
  userBalance?: number;
  user_trophy: number;
  userLevel?: number;
  maxEnergyLimit?: number;
  currentEnergy?: number;
  energyFillSpeed?: number;
  loading?: boolean;
  guru?: boolean;
  autoBot?: boolean;
  userTotalAmount: number;
}

const TapPage: React.FC<TapPageProps> = ({
  loading,
  sendMessage,
  guru,
  autoBot,
  userBalance,
  user_trophy,
  userLevel,
  maxEnergyLimit,
  energyFillSpeed,
  currentEnergy,
  userTotalAmount,
}) => {
  // useEffect(() => {
  //   socket.on("top", (data: any) => {
  //     setUserBalance((prevState) => (prevState ?? 0) + Number(data.level));
  //     setCurrentEnergy((prevState) => (prevState ?? 0) - Number(data.energy));
  //   });

  //   socket.on("energy", (data: any) => {
  //     setCurrentEnergy(Number(data));
  //   });
  // }, [socket]);

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
  // const [fireMode, setFireMode] = useState(1);

  // const handleCoinClick = () => {
  //   socket.emit(
  //     "tap",
  //     {
  //       level: Number(userLevel).toString(),
  //     },
  //     (data: any) => {}
  //   );
  // };

  const handleCoinClick = useCallback(() => {
    sendMessage(JSON.stringify({ topic: "tap", request: "" }));
  }, []);

  return (
    <>
      <RootLayout bg_img={bgImg}>
        {loading ? (
          <Loading />
        ) : (
          <div className="flex flex-col items-center justify-around w-full h-full">
            <Balance
              balance={userBalance}
              user_trophy={trophies[user_trophy]?.name}
              cup={true}
            />
            <CoinIcon
              balance={userBalance}
              increment={userLevel}
              onCoinClick={handleCoinClick}
              currentSpark={currentEnergy}
            />
            <ScoreBar
              maxLimitSpark={maxEnergyLimit}
              incrementSparkNumber={userLevel}
              currentSpark={currentEnergy}
              // setCurrentSpark={setCurrentSpark}
            />
          </div>
        )}
      </RootLayout>
    </>
  );
};

export default TapPage;
