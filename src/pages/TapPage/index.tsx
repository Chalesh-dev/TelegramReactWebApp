import { useCallback } from "react";
import bgImg from "../../assets/bg_images/bg-2.png";
import RootLayout from "../../components/RootLayout/RootLayout";
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
  guru?: boolean;
  autoBot?: boolean;
}

const TapPage: React.FC<TapPageProps> = ({
  sendMessage,
  guru,
  autoBot,
  userBalance,
  user_trophy,
  userLevel,
  maxEnergyLimit,
  energyFillSpeed,
  currentEnergy,
}) => {
  const handleCoinClick = useCallback(() => {
    sendMessage(JSON.stringify({ topic: "tap", request: "" }));
  }, [sendMessage]);

  return (
    <>
      <RootLayout bg_img={bgImg}>
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
      </RootLayout>
    </>
  );
};

export default TapPage;
