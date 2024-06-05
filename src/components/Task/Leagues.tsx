import React, { useEffect, useState } from "react";
import CardLoading from "../CardLoading";
import CardBarComp from "./CardBarComp";
import { FindIndexByName, trophies } from "../config/trophiesList";

interface SingleLeagueTypes {
  title: string;
  threshold: number;
  reward: number;
}

interface LeaguesTypes {
  userBalance: number;
  setUserBalance: React.Dispatch<React.SetStateAction<number>>;
  socket: any;
  unClaimedLeagues: SingleLeagueTypes[];
  setUnClaimedLeagues: React.Dispatch<React.SetStateAction<never[]>>;
  claimableLeagues: SingleLeagueTypes[];
  setClaimableLeagues: React.Dispatch<React.SetStateAction<never[]>>;
}

const Leagues = ({
  userBalance,
  setUserBalance,
  socket,
  unClaimedLeagues,
  setUnClaimedLeagues,
  claimableLeagues,
  setClaimableLeagues,
}: LeaguesTypes) => {
  const [loading, setLoading] = useState(false);

  //todo: fix useEffect and handleClaim with ali....
  useEffect(() => {
    setLoading(true);
    socket.on("leagues", (data: any) => {
      if (data) {
        setUnClaimedLeagues(data.unClaimed);
        setClaimableLeagues(data.claimable);
        setLoading(false);
      }
    });
  }, []);

  const handleClaim = (reward: number) => {
    socket.emit("name", (data: any) => {
      if (data.success) {
        setUserBalance((prevState) => prevState + Number(reward));
      }
    });
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
          {claimableLeagues.map((league, index) => {
            const trophyIndex = FindIndexByName(league?.title);
            return (
              <CardBarComp
                key={index}
                img={trophies[trophyIndex]?.src}
                title={league?.title}
                price={Number(league?.reward)}
                disabled={false}
                present_value={Number(userBalance)}
                final_value={Number(league?.threshold)}
                onCLick={() => handleClaim(league?.reward)}
              />
            );
          })}
          {unClaimedLeagues.map((league, index) => {
            const trophyIndex = FindIndexByName(league?.title);
            return (
              <CardBarComp
                key={index}
                img={trophies[trophyIndex]?.src}
                title={league?.title}
                price={Number(league?.reward)}
                disabled={true}
                // present_value={Number(user?.balance)}
                present_value={Number(userBalance)}
                final_value={Number(league?.threshold)}
                // onCLick={handleClick}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default Leagues;
