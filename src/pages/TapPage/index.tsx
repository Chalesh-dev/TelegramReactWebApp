import { useEffect, useState } from "react";
import bgImg from "../../assets/bg_images/bg-2.png";
import RootLayout from "../../components/RootLayout/RootLayout";
import Loading from "../../components/LoadingComp/Loading";
import Balance from "../../components/Balance/Balance";

/**PATH */
const energy_unit_path = process.env.REACT_APP_URL + "api/landing/info-energy";
const coin_fill_speed_path =
  process.env.REACT_APP_URL + "api/landing/info-recharging";
const last_energy_path = process.env.REACT_APP_URL + "api/data/get-data";
/**PATH */

interface TapPageProps {
  socket: any;
  userId: any;
  user?: any
}

const TapPage = ({ socket, userId, user }: TapPageProps) => {
  const [energyUnit, setEnergyUnit] = useState(0);
  const [increaseSpeed, setIncreaseSpeed] = useState(0);
  const [initialScore, setInitialScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [loading, setLoading] = useState(false);

  const getEnergyUnit = async () => {
    setLoading(true);
    if (userId) {
      try {
        const response = await fetch(energy_unit_path, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            "info-user": userId,
          },
        });
        const result = await response.json();
        setEnergyUnit(result);
        console.log("energy_unit", result);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("error2", error);
      }
    }
  };

  const getLastEnergy = async () => {
    setLoading(true);
    if (userId) {
      try {
        const response = await fetch(last_energy_path, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            // "info-user": user?.user?.uuid_name,
            "info-user": userId,
          },
        });
        const result = await response.json();
        console.log("result", result);
        setCurrentScore(Number(result?.energyLast));
        setInitialScore(Number(result?.energyLast));
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("error2", error);
      }
    }
  };

  /**speed of increase or recharging speed */
  const getRechargingSpeed = async () => {
    setLoading(true);
    if (userId) {
      try {
        const response = await fetch(coin_fill_speed_path, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            "info-user": userId,
          },
        });
        const result = await response.json();
        console.log("increase_speed", result);
        setIncreaseSpeed(result); ////balanceRef
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("error2", error);
      }
    }
  };

  useEffect(() => {
    getEnergyUnit();
    getRechargingSpeed();
    getLastEnergy();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <RootLayout bg_img={bgImg}>
          <div className="flex flex-col items-center justify-around w-full h-full">
            <p className="text-red-500">{userId}</p>
            <p className="text-white">amount:{user?.user?.t_balance[0]?.amount}</p>
            <p>status:{user?.status}</p>
            
            {/* <Balance balance={balance} cup={true} /> */}

            {/* <CoinIcon
              balance={balance}
              increment={user?.level?.unit}
              // increment={scoreRef.current}
              onCoinClick={handleCoinClick}
              currentSpark={currentSpark}
            /> */}

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
      )}
    </>
  );
};

export default TapPage;
