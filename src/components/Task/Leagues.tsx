import React, { useEffect, useState } from "react";
import CardLoading from "../CardLoading";
import CardBarComp from "./CardBarComp";
import { FindIndexByName, trophies } from "../config/trophiesList";

const Leagues = ({ leagues }: any) => {
  const [loading, setLoading] = useState(false);

  // const handleClaim = (reward: number) => {
  //   socket.emit("name", (data: any) => {
  //     if (data.success) {
  //       setUserBalance((prevState) => prevState + Number(reward));
  //     }
  //   });
  // };

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
          <CardBarComp
            img={trophies[leagues?.current]?.src}
            title={trophies[leagues?.current]?.name}
            price={trophies[leagues?.current]?.reward}
            disabled={false}
            present_value={leagues?.total_amount}
            final_value={trophies[leagues?.current]?.threshold}
            // onCLick={() => handleClaim(league?.reward)}
          />
          {/* {claimableLeagues.map((league, index) => {
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
          })} */}
          {/* {unClaimedLeagues.map((league, index) => {
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
          })} */}
        </>
      )}
    </div>
  );
};

export default Leagues;
