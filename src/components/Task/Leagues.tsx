import { useEffect, useRef, useState } from "react";
import CardLoading from "../CardLoading";
import CardBarComp from "./CardBarComp";
import { trophies } from "../config/trophiesList";
import Modal from "../Modal";

interface LeaguesTypes {
  leagues: any;
  sendMessage: any;
  balanceUp: number;
  setBalanceUp: React.Dispatch<React.SetStateAction<number>>;
}

const Leagues = ({
  leagues,
  sendMessage,
  balanceUp,
  setBalanceUp,
}: LeaguesTypes) => {
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const leagueIdRef = useRef(0);

  useEffect(() => {
    if (balanceUp) {
      setOpenModal(true);
      setBalanceUp(0);
    }
  }, [balanceUp]);

  const handleClaim = (id: number) => {
    sendMessage(JSON.stringify({ topic: "claim league", request: id }));
    leagueIdRef.current = id;
  };

  return (
    <div>
      {loading ? (
        <>
          <CardLoading />
          <CardLoading />
          <CardLoading />
          <CardLoading />
        </>
      ) : (
        <>
          {openModal && (
            <Modal
              bot={true}
              setOpenModal={setOpenModal}
              openModal={openModal}
              icon={
                <img src={trophies[leagueIdRef.current].src} alt="trophy" />
              }
              boostTitle={trophies[leagueIdRef.current].name + " League"}
              boostDescription={`congratulations, You got ${
                trophies[leagueIdRef.current].name
              } ❤️`}
              botEarning={trophies[leagueIdRef.current].reward}
              onClick={() => setOpenModal(false)}
            ></Modal>
          )}
          {leagues?.unclaimed?.map((item: number) => (
            <CardBarComp
              img={trophies[item]?.src}
              title={trophies[item]?.name}
              price={Number(trophies[item]?.reward).toLocaleString()}
              disabled={false}
              present_value={leagues?.total_amount}
              final_value={trophies[item]?.threshold}
              onCLick={() => handleClaim(item)}
            />
          ))}
          <CardBarComp
            img={trophies[leagues?.current]?.src}
            title={trophies[leagues?.current]?.name}
            price={Number(trophies[leagues?.current]?.reward).toLocaleString()}
            disabled={true}
            present_value={leagues?.total_amount}
            final_value={trophies[leagues?.current]?.threshold}
          />
        </>
      )}
    </div>
  );
};

export default Leagues;
