import { useCallback, useState } from "react";
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
  guruLeft: number;
  tankLeft: number;
  max_special_boost: number;
  next_update: number;

  boostBotLevel: number;
  boostBotIsMax: boolean;
  boostBotScore: number;

  boostRechargingScore: number;
  boostRechargingLevel: number;
  boostRechargingIsMax: boolean;

  boostEnergyLimitScore: number;
  boostEnergyLimitLevel: number;
  boostEnergyLimitIsMax: boolean;

  boostMultiScore: number;
  boostMultiLevel: number;
  boostMultiIsMax: boolean;

  userBalance: number;
  sendMessage: any;
}

const BoostPage = ({
  boostMultiScore,
  boostMultiLevel,
  boostMultiIsMax,
  boostEnergyLimitScore,
  boostEnergyLimitLevel,
  boostEnergyLimitIsMax,
  boostRechargingScore,
  boostRechargingLevel,
  boostRechargingIsMax,
  boostBotLevel,
  boostBotIsMax,
  boostBotScore,
  guruLeft,
  tankLeft,
  max_special_boost,
  next_update,
  userBalance,
  sendMessage,
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

  const handleOpenGuru = () => {
    if (guruLeft !== 0) {
      setOpenGuru(true);
    }
  };

  //todo: check sockets with ali
  // socket.on("guru", (data: any) => {
  //   setGuruRemains(data?.remain);
  //   // setStartGuruTime(data?.guru_time);
  // });

  // socket.on("tank", (data: any) => {
  //   setTankRemains(data?.remain);
  //   setStartTankTime(data?.tank_time);
  // });

  // socket.on("multitap", (data: any) => {
  //   setMultiLevel(data?.level);
  //   setMultiScore(data?.score);
  // });

  // socket.on("energy_limit", (data: any) => {
  //   setEnergyLimitLevel(data?.level);
  //   setEnergyLimitScore(data?.score);
  // });

  // socket.on("recharging_speed", (data: any) => {
  //   setRechargingLevel(data?.level);
  //   setRechargingScore(data?.score);
  // });

  //todo: should i emit socket in functions bellow.
  const handleMulti = useCallback(() => {
    sendMessage(JSON.stringify({ topic: "upgrade", request: "multi_tap" }));
    setOpenMulti(false);
  }, []);
  const handleEnergyLimit = useCallback(() => {
    sendMessage(JSON.stringify({ topic: "upgrade", request: "limit" }));
    setOpenEnergy(false);
  }, []);
  const handleRecharging = useCallback(() => {
    sendMessage(JSON.stringify({ topic: "upgrade", request: "speed" }));
    setOpenRecharging(false);
  }, []);
  const handleBot = useCallback(() => {
    sendMessage(JSON.stringify({ topic: "upgrade", request: "bot" }));
    setOpenBot(false);
  }, []);

  const handleActiveGuru = useCallback(() => {
    sendMessage(JSON.stringify({ topic: "activate", request: "guru" }));
    setOpenGuru(false);
    navigate("/tap");
  }, []);
  const handleActiveTank = useCallback(() => {
    sendMessage(JSON.stringify({ topic: "activate", request: "refill" }));
    setOpenFullTank(false);
    navigate("/tap");
  }, []);

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
            icon={
              <FlameIcon size={28} color={guruLeft !== 0 ? "yellow" : "gray"} />
            }
            name={"Taping Guru"}
            remain_num={guruLeft}
            onClick={handleOpenGuru}
            max_boost={max_special_boost}
            next_update={next_update}
          />
          <DailyBooster
            onClick={() => {
              setOpenFullTank(true);
            }}
            icon={
              <FlashIcon size={28} color={tankLeft !== 0 ? "yellow" : "gray"} />
            }
            name={"Full Tank"}
            remain_num={tankLeft}
            max_boost={max_special_boost}
            next_update={next_update}
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
              icon={<Hand color={boostMultiIsMax ? "gray" : "yellow"} size={28} />}
              name={"Multitap"}
              coin_num={boostMultiScore}
              level={boostMultiLevel}
              onClick={() => setOpenMulti(!boostMultiIsMax)}
              isMax={boostMultiIsMax}
            />
            <Card
              icon={<BatteryIcon color={boostEnergyLimitIsMax ? "gray" : "yellow"} size={28} />}
              name={"Energy Limit"}
              coin_num={boostEnergyLimitScore}
              level={boostEnergyLimitLevel}
              onClick={() => setOpenEnergy(!boostEnergyLimitIsMax)}
              isMax={boostEnergyLimitIsMax}
            />
            <Card
              icon={<FlashIcon color={boostRechargingIsMax ? "gray" : "yellow"} size={28} />}
              name={"Recharging Speed"}
              coin_num={boostRechargingScore}
              level={boostRechargingLevel}
              onClick={() => setOpenRecharging(!boostRechargingIsMax)}
              isMax={boostRechargingIsMax}
            />
            <Card
              icon={<Robot color={boostBotIsMax ? "gray" : "yellow"} size={28} />}
              name={"Tap Bot"}
              coin_num={boostBotScore}
              level={boostBotLevel}
              onClick={() => setOpenBot(!boostBotIsMax)}
              isMax={boostBotIsMax}
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
          boostTapInfo={`+${boostMultiLevel} per tap for each level.`}
          boostTokenRequired={boostMultiScore}
          boostLevel={boostMultiLevel + 1}
          disabled={Number(userBalance) < Number(boostMultiScore)}
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
          boostTapInfo={`+${boostEnergyLimitLevel} per tap for each level.`}
          boostTokenRequired={boostEnergyLimitScore}
          boostLevel={boostEnergyLimitLevel + 1}
          onClick={handleEnergyLimit}
          disabled={Number(userBalance) < Number(boostEnergyLimitScore)}
        ></Modal>
      )}

      {openRecharging && (
        <Modal
          setOpenModal={setOpenRecharging}
          openModal={openRecharging}
          icon={<FlashIcon color={"yellow"} size={58} />}
          boostTitle={"Recharging Speed"}
          boostDescription={"Increase amount of TAP you can earn per one tap."}
          boostTapInfo={`+${boostRechargingLevel} per tap for each level.`}
          boostTokenRequired={boostRechargingScore}
          boostLevel={boostRechargingLevel}
          disabled={Number(userBalance) < Number(boostRechargingScore)}
          onClick={handleRecharging}
        ></Modal>
      )}

      {openBot && (
        <Modal
          setOpenModal={setOpenBot}
          openModal={openBot}
          icon={<Robot color={"yellow"} size={58} />}
          boostTitle={"Tap Bot"}
          boostDescription={"Tap bot will tap when your energy is full."}
          boostTapInfo={`Max bot work duration is 12 hours.`}
          boostTokenRequired={boostRechargingScore}
          boostLevel={boostRechargingLevel}
          disabled={Number(userBalance) < Number(boostRechargingScore)}
          onClick={handleBot}
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
