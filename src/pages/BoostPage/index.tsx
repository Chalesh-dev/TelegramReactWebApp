import { useState } from "react";
import bgImg from "../../assets/bg_images/bg-6.png";
import Balance from "../../components/Balance/Balance";
import {
  BatteryIcon,
  FlameIcon,
  FlashIcon,
  Hand,
  Robot,
} from "../../components/Icons";
import Modal from "../../components/Modal";
import "./Boosters.css";
import RootLayout from "../../components/RootLayout/RootLayout";
import DailyBooster from "../../components/DailyBooster";
import CardLoading from "../../components/CardLoading";
import Card from "../../components/Card";

interface BoostPageProps {
  loading: boolean;
  userId: number;
  userBalance: number;
  multiScore: number;
  multiLevel: number;
  energyLimitScore: number;
  energyLimitLevel: number;
  rechargingSpeedScore: number;
  rechargingSpeedLevel: number;
  setUserBalance: React.Dispatch<React.SetStateAction<number>>;
}

const BoostPage = ({
  userId,
  userBalance,
  multiScore,
  multiLevel,
  energyLimitScore,
  energyLimitLevel,
  rechargingSpeedScore,
  rechargingSpeedLevel,
  loading,
  setUserBalance,
}: BoostPageProps) => {
  /**open Modal */
  const [openMulti, setOpenMulti] = useState(false);
  const [openEnergy, setOpenEnergy] = useState(false);
  const [openRecharging, setOpenRecharging] = useState(false);
  const [openBot, setOpenBot] = useState(false);
  const [openGuru, setOpenGuru] = useState(false);

  const handleTapingGuru = () => {
    setOpenGuru(true);
  };

  const handleMulti = () => {
    setUserBalance((prevState) => prevState - multiScore);
    setOpenMulti(false);
  };
  const handleEnergyLimit = () => {
    setUserBalance((prevState) => prevState - energyLimitScore);
    setOpenEnergy(false);
  };
  const handleRecharging = () => {
    setUserBalance((prevState) => prevState - rechargingSpeedScore);
    setOpenRecharging(false);
  };

  return (
    <RootLayout
      bg_img={bgImg}
      // bg_radial={
      //   "radial-gradient(ellipse at 30% 40%, rgb(224, 224, 65) -27%, transparent 40%)"
      // }
    >
      <Balance
        border={true}
        description={"Your Share balance"}
        balance={userBalance}
      />
      <div className="flex flex-col gap-2">
        <p className="text-2xl text-white mt-4 mb-2 font-bold">
          Your Daily boosters :
        </p>
        <div className="grid grid-cols-2 gap-2">
          <DailyBooster
            icon={<FlameIcon size={28} color={"yellow"} />}
            name={"Taping Guru"}
            remain_num={1}
            onClick={handleTapingGuru}
          />
          <DailyBooster
            onClick={() => {}}
            icon={<FlashIcon size={28} color={"yellow"} />}
            name={"Full Tank"}
            remain_num={3}
          />
        </div>
      </div>

      <h1 className="text-white text-2xl my-2">Boosters:</h1>
      <div className="container--task">
        {loading ? (
          <>
            <CardLoading />
            <CardLoading />
            <CardLoading />
            <CardLoading />
          </>
        ) : (
          <>
            <Card
              icon={<Hand color={"yellow"} size={28} />}
              name={"Multitap"}
              coin_num={multiScore}
              level={multiLevel}
              onClick={() => setOpenMulti(true)}
            />
            <Card
              icon={<BatteryIcon color={"yellow"} size={28} />}
              name={"Energy Limit"}
              coin_num={energyLimitScore}
              level={energyLimitLevel}
              onClick={() => setOpenEnergy(true)}
            />
            <Card
              icon={<FlashIcon color={"yellow"} size={28} />}
              name={"Recharging Speed"}
              coin_num={rechargingSpeedScore}
              level={rechargingSpeedLevel}
              onClick={() => setOpenRecharging(true)}
            />
            <Card
              icon={<Robot color={"yellow"} size={28} />}
              name={"Tap Bot"}
              coin_num={"1245"}
              level={"18"}
              onClick={() => setOpenBot(true)}
            />
          </>
        )}
      </div>

      {/* Modals */}
      {openMulti && (
        <Modal
          setOpenModal={setOpenMulti}
          openModal={openMulti}
          icon={<Hand color={"yellow"} size={58} />}
          boostTitle={"MultiTap"}
          boostDescription={"Increase amount of TAP you can earn per one tap."}
          boostTapInfo={`+${multiLevel} per tap for each level.`}
          boostTokenRequired={multiScore}
          boostLevel={multiLevel}
          balance={userBalance}
          disabled={Number(userBalance) < Number(multiScore)}
          onClick={handleMulti}
        ></Modal>
      )}

      {openEnergy && (
        <Modal
          setOpenModal={setOpenEnergy}
          openModal={openEnergy}
          icon={<BatteryIcon color={"yellow"} size={58} />}
          boostTitle={"Energy Limit"}
          boostDescription={"Increase amount of TAP you can earn per one tap."}
          boostTapInfo={`+${energyLimitLevel} per tap for each level.`}
          boostTokenRequired={energyLimitScore}
          boostLevel={energyLimitLevel}
          balance={userBalance}
          onClick={handleEnergyLimit}
          disabled={Number(userBalance) < Number(energyLimitScore)}
        ></Modal>
      )}

      {openRecharging && (
        <Modal
          setOpenModal={setOpenRecharging}
          openModal={openRecharging}
          icon={<FlashIcon color={"yellow"} size={58} />}
          boostTitle={"Recharging Speed"}
          boostDescription={"Increase amount of TAP you can earn per one tap."}
          boostTapInfo={`+${rechargingSpeedLevel} per tap for each level.`}
          boostTokenRequired={rechargingSpeedScore}
          boostLevel={rechargingSpeedLevel}
          balance={userBalance}
          disabled={Number(userBalance) < Number(rechargingSpeedScore)}
          onClick={handleRecharging}
        ></Modal>
      )}

      {/* Guru&tank */}
      {/* {openGuru && (
        <Modal
          setOpenModal={setOpenGuru}
          openModal={openGuru}
          icon={<FlameIcon color={"yellow"} size={58} />}
          boostTitle={"Taping Guru"}
          boostDescription={
            "Increase amount of TAP you can earn per one tap for 20 seconds."
          }
          boostTapInfo={`+45 per tap for each level.`}
          tap_tank={true}
          boostTokenRequired={recharging?.amount}
          boostLevel={recharging?.title}
          balance={user?.balance}
          onClick={handleRecharging}
        ></Modal>
      )} */}
    </RootLayout>
  );
};

export default BoostPage;
