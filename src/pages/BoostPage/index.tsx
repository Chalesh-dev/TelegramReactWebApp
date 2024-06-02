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
import { useNavigate } from "react-router-dom";

interface BoostPageProps {
  userId: number;
  userBalance: number;
  setUserBalance: React.Dispatch<React.SetStateAction<number>>;

  guruRemains: number;
  setGuruRemains: React.Dispatch<React.SetStateAction<number>>;

  guruState: boolean;
  setGuruState: React.Dispatch<React.SetStateAction<boolean>>;

  tankRemains: number;
  setTankRemains: React.Dispatch<React.SetStateAction<number>>;

  startTankTime: string;
  setStartTankTime: React.Dispatch<React.SetStateAction<string>>;

  multiScore: number;
  setMultiScore: React.Dispatch<React.SetStateAction<number>>;
  multiLevel: number;
  setMultiLevel: React.Dispatch<React.SetStateAction<number>>;

  energyLimitScore: number;
  setEnergyLimitScore: React.Dispatch<React.SetStateAction<number>>;
  energyLimitLevel: number;
  setEnergyLimitLevel: React.Dispatch<React.SetStateAction<number>>;

  rechargingLevel: number;
  setRechargingLevel: React.Dispatch<React.SetStateAction<number>>;
  rechargingScore: number;
  setRechargingScore: React.Dispatch<React.SetStateAction<number>>;

  socket: any;
}

const BoostPage = ({
  userId,
  userBalance,
  setUserBalance,

  guruRemains,
  setGuruRemains,
  guruState,
  setGuruState,

  tankRemains,
  setTankRemains,
  startTankTime,
  setStartTankTime,

  multiScore,
  setMultiScore,
  multiLevel,
  setMultiLevel,

  energyLimitScore,
  setEnergyLimitScore,
  energyLimitLevel,
  setEnergyLimitLevel,

  rechargingLevel,
  setRechargingLevel,
  rechargingScore,
  setRechargingScore,

  socket,
}: BoostPageProps) => {
  /**open Modal */
  const [openMulti, setOpenMulti] = useState(false);
  const [openEnergy, setOpenEnergy] = useState(false);
  const [openRecharging, setOpenRecharging] = useState(false);
  const [openBot, setOpenBot] = useState(false);
  const [openGuru, setOpenGuru] = useState(false);
  const [openFullTank, setOpenFullTank] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //todo: check sockets with ali
  socket.on("guru", (data: any) => {
    setGuruRemains(data?.remain);
    // setStartGuruTime(data?.guru_time);
  });

  socket.on("tank", (data: any) => {
    setTankRemains(data?.remain);
    setStartTankTime(data?.tank_time);
  });

  socket.on("multitap", (data: any) => {
    setMultiLevel(data?.level);
    setMultiScore(data?.score);
  });

  socket.on("energy_limit", (data: any) => {
    setEnergyLimitLevel(data?.level);
    setEnergyLimitScore(data?.score);
  });

  socket.on("recharging_speed", (data: any) => {
    setRechargingLevel(data?.level);
    setRechargingScore(data?.score);
  });

  //todo: should i emit socket in functions bellow.
  const handleMulti = () => {
    setUserBalance((prevState) => prevState - multiScore);
    setOpenMulti(false);
  };
  const handleEnergyLimit = () => {
    setUserBalance((prevState) => prevState - energyLimitScore);
    setOpenEnergy(false);
  };
  const handleRecharging = () => {
    setUserBalance((prevState) => prevState - rechargingScore);
    setOpenRecharging(false);
  };

  const handleActiveGuru = () => {
    setOpenGuru(false);
    navigate("/tap");
  };

  const handleActiveTank = () => {
    setOpenFullTank(false);
    navigate("/tap");
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
            onClick={() => setOpenGuru(true)}
          />
          <DailyBooster
            onClick={() => {
              setOpenFullTank(true);
            }}
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
              coin_num={rechargingScore}
              level={rechargingLevel}
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
          boostTapInfo={`+${rechargingLevel} per tap for each level.`}
          boostTokenRequired={rechargingScore}
          boostLevel={rechargingLevel}
          disabled={Number(userBalance) < Number(rechargingScore)}
          onClick={handleRecharging}
        ></Modal>
      )}

      {/* Guru&tank */}
      {openGuru && (
        <Modal
          setOpenModal={setOpenGuru}
          openModal={openGuru}
          icon={<FlameIcon color={"yellow"} size={58} />}
          boostTitle={"Taping Guru"}
          boostDescription={"Multiply your tap income by x5 for 20 seconds."}
          boostTapInfo={"Do not use energy while active."}
          tap_tank={true}
          onClick={handleActiveGuru}
        ></Modal>
      )}

      {openFullTank && (
        <Modal
          setOpenModal={setOpenFullTank}
          openModal={openFullTank}
          icon={<FlashIcon color={"yellow"} size={58} />}
          boostTitle={"Full Tank"}
          boostDescription={"Fill your energy to the max."}
          tap_tank={true}
          onClick={handleActiveTank}
        ></Modal>
      )}
    </RootLayout>
  );
};

export default BoostPage;
