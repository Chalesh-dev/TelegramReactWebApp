import { useEffect, useState } from "react";
import bgImg from "../../assets/bg_images/bg-6.png";
import Balance from "../../components/Balance/Balance";
import DailyBooster from "../../components/DailyBooster";
import {
  BatteryIcon,
  FlameIcon,
  FlashIcon,
  Hand,
  Robot,
} from "../../components/Icons";
import { useTelegram } from "../../hooks/useTelegram";
import CardLoading from "../../components/CardLoading";
import Card from "../../components/Card";
import Modal from "../../components/Modal";
import "./Boosters.css";
import LayoutLoading from "../../components/LoadingComponent/LayoutLoading";
import Loading from "../../components/LoadingComponent/Loading";
import RootLayout from "../../components/RootLayout/RootLayout";

/**PATH */
const path_multiTap = process.env.REACT_APP_URL + "api/landing/info-multi";
const path_energy_limit = process.env.REACT_APP_URL + "api/level-up/energy";
const path_recharging = process.env.REACT_APP_URL + "api/level-up/recharging";
const path_bot = process.env.REACT_APP_URL + "api/level-up/robot";
const path_increase_level_by_multitap =
  process.env.REACT_APP_URL + "api/level-up/multi-up";
const path_increase_level_by_energy_limit =
  process.env.REACT_APP_URL + "api/level-up/energy-up";
const path_increase_level_by_recharging =
  process.env.REACT_APP_URL + "api/level-up/recharging-up";
/**PATH */

const BoostPage = () => {
  const [multiTap, setMultiTap] = useState([]);
  const [energyLimit, setEnergyLimit] = useState([]);
  const [recharging, setRecharging] = useState([]);
  const [bot, setBot] = useState([]);

  const [loading_one, setLoading_one] = useState(false);
  const [loading_two, setLoading_two] = useState(false);
  const [loading_three, setLoading_three] = useState(false);
  const [loading_four, setLoading_four] = useState(false);
  const [loading_five, setLoading_five] = useState(false);

  /**open Modal */
  const [openMulti, setOpenMulti] = useState(false);
  const [openEnergy, setOpenEnergy] = useState(false);
  const [openRecharging, setOpenRecharging] = useState(false);
  const [openBot, setOpenBot] = useState(false);
  const [openGuru, setOpenGuru] = useState(false);

  /**balance */
  const [balance, setBalance] = useState(0);

  /**user */
  const user = useTelegram();

  /**2.get Multi tap */
  const getMultiTap = async () => {
    setLoading_two(true);
    if (user?.user?.uuid_name) {
      try {
        const response = await fetch(path_multiTap, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            "info-user": user?.userTeleId,
          },
        });
        const result = await response.json();
        setMultiTap(result); ////balanceRef
        setLoading_two(false);
      } catch (error) {
        setLoading_two(false);
        console.log("error2", error);
      }
    }
  };

  /**3.get Energy limit */
  const getEnergyLimit = async () => {
    setLoading_three(true);
    if (user?.user?.uuid_name) {
      try {
        const response = await fetch(path_energy_limit, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            "info-user": user?.userTeleId,
          },
        });
        const result = await response.json();
        setEnergyLimit(result); ////balanceRef
        setLoading_three(false);
      } catch (error) {
        setLoading_three(false);
        console.log("error2", error);
      }
    }
  };

  /**4.get recharging */
  const getRecharging = async () => {
    setLoading_four(true);
    if (user?.user?.uuid_name) {
      try {
        const response = await fetch(path_recharging, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            "info-user": user?.userTeleId,
          },
        });
        const result = await response.json();
        setRecharging(result); ////balanceRef
        setLoading_four(false);
      } catch (error) {
        setLoading_four(false);
        console.log("error2", error);
      }
    }
  };

  /**5.get bot */
  const getBot = async () => {
    setLoading_five(true);
    if (user?.user?.uuid_name) {
      try {
        const response = await fetch(path_bot, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            "info-user": user?.userTeleId,
          },
        });
        const result = await response.json();
        setBot(result); ////balanceRef
        setLoading_five(false);
      } catch (error) {
        setLoading_five(false);
        console.log("error2", error);
      }
    }
  };

  /***click func */
  const handleMulti = async () => {
    setLoading_one(true);
    if (user?.user?.uuid_name) {
      try {
        const response = await fetch(path_increase_level_by_multitap, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            "info-user": user?.userTeleId,
          },
        });
        const result = await response.json();
        console.log("resss", result);
        await user?.getBalance();
        await getMultiTap();
        setLoading_one(false);
        setOpenMulti(false);
      } catch (error) {
        setLoading_one(false);
        console.log("error2", error);
      }
    }
  };

  const handleEnergyLimit = async () => {
    setLoading_one(true);
    if (user?.user?.uuid_name) {
      try {
        const response = await fetch(path_increase_level_by_energy_limit, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            "info-user": user?.userTeleId,
          },
        });
        const result = await response.json();
        await user?.getBalance();
        await getEnergyLimit();
        // console.log("increase_energy", result);
        setLoading_one(false);
        setOpenEnergy(false);
      } catch (error) {
        setLoading_one(false);
        console.log("error2", error);
      }
    }
  };

  const handleRecharging = async () => {
    setLoading_one(true);
    if (user?.user?.uuid_name) {
      try {
        const response = await fetch(path_increase_level_by_recharging, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            "info-user": user?.userTeleId,
          },
        });
        const result = await response.json();
        await user?.getBalance();
        await getRecharging();
        // console.log("increase_energy", result);
        setLoading_one(false);
        setOpenRecharging(false);
      } catch (error) {
        setLoading_one(false);
        console.log("error2", error);
      }
    }
  };

  const handleTapingGuru = () => {
    setOpenGuru(true);
  };

  useEffect(() => {
    getMultiTap();
    getEnergyLimit();
    getRecharging();
    getBot();
    setBalance(user?.balance);
  }, [user?.balance]);

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
          loading={loading_one}
          balance={balance}
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
            icon={<FlashIcon size={28} color={"yellow"} />}
            name={"Full Tank"}
            remain_num={3}
          />
        </div>
      </div>

      <h1 className="text-white text-2xl my-2">Boosters:</h1>
      <div className="container--task">
        {loading_two ? (
          <CardLoading />
        ) : (
          <Card
            icon={<Hand color={"yellow"} size={28} />}
            // name={multiTap?.title}
            name={"Multitap"}
            coin_num={multiTap?.amount}
            level={multiTap?.title}
            onClick={() => setOpenMulti(true)}
          />
        )}

        {loading_three ? (
          <CardLoading />
        ) : (
          <Card
            icon={<BatteryIcon color={"yellow"} size={28} />}
            // name={energyLimit?.title}
            name={"Energy Limit"}
            coin_num={energyLimit?.amount}
            level={energyLimit?.title}
            onClick={() => setOpenEnergy(true)}
          />
        )}

        {loading_four ? (
          <CardLoading />
        ) : (
          <Card
            icon={<FlashIcon color={"yellow"} size={28} />}
            // name={recharging?.title}
            name={"Recharging Speed"}
            coin_num={recharging?.amount}
            level={recharging?.title}
            onClick={() => setOpenRecharging(true)}
          />
        )}

        {loading_five ? (
          <CardLoading />
        ) : (
          <Card
            icon={<Robot color={"yellow"} size={28} />}
            // name={bot?.title}
            name={"Tap Bot"}
            coin_num={bot?.amount}
            onClick={() => setOpenBot(true)}
          />
        )}
      </div>
      
      {/* Modals */}
      {openMulti && (
        <Modal
          setOpenModal={setOpenMulti}
          openModal={openMulti}
          loading={loading_two}
          icon={<Hand color={"yellow"} size={58} />}
          boostTitle={"Energy Limit"}
          boostDescription={"Increase amount of TAP you can earn per one tap."}
          boostTapInfo={`+${multiTap?.unit} per tap for each level.`}
          boostTokenRequired={multiTap?.amount}
          boostLevel={multiTap?.title}
          balance={balance}
          disabled={Number(balance) < Number(multiTap?.amount)}
          onClick={handleMulti}
        ></Modal>
      )}
      {openEnergy && (
        <Modal
          setOpenModal={setOpenEnergy}
          openModal={openEnergy}
          loading={loading_three}
          icon={<BatteryIcon color={"yellow"} size={58} />}
          boostTitle={"Energy Limit"}
          boostDescription={"Increase amount of TAP you can earn per one tap."}
          boostTapInfo={`+${energyLimit?.unit} per tap for each level.`}
          boostTokenRequired={energyLimit?.amount}
          boostLevel={energyLimit?.title}
          balance={user?.balance}
          onClick={handleEnergyLimit}
          disabled={Number(balance) < Number(energyLimit?.amount)}
        ></Modal>
      )}

      {openRecharging && (
        <Modal
          setOpenModal={setOpenRecharging}
          openModal={openRecharging}
          loading={loading_four}
          icon={<FlashIcon color={"yellow"} size={58} />}
          boostTitle={"Recharging Speed"}
          boostDescription={"Increase amount of TAP you can earn per one tap."}
          boostTapInfo={`+${recharging?.unit} per tap for each level.`}
          boostTokenRequired={recharging?.amount}
          boostLevel={recharging?.title}
          balance={balance}
          disabled={Number(balance) < Number(recharging?.amount)}
          onClick={handleRecharging}
        ></Modal>
      )}

      {/* Guru&tank */}
      {openGuru && (
        <Modal
          setOpenModal={setOpenGuru}
          openModal={openGuru}
          loading={false}
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
      )}
    </Root>
  );
};

export default BoostPage;
