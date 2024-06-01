import React, { useEffect, useState } from "react";
import CardLoading from "../CardLoading";
import CardBarComp from "./CardBarComp";
// import { FindIndexByName, images } from "../Trophy/data";

/**PATH */
const path = process.env.REACT_APP_URL + "api/tasks/get-trophy";
/**PATH */

interface LeaguesTypes {
  userBalance: number;
  setUserBalance: React.Dispatch<React.SetStateAction<number>>;
}

const Leagues = ({ userBalance, setUserBalance }: LeaguesTypes) => {
  const [loading, setLoading] = useState(false);
  const [trophies, setTrophies] = useState([]);

  // const getUserTrophies = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await fetch(path, {
  //       method: "GET",
  //       headers: {
  //         "Content-type": "application/json",
  //         Accept: "application/json",
  //         "info-user": user?.userTeleId,
  //       },
  //     });
  //     const leagues = await response.json();
  //     setTrophies(leagues);
  //     setLoading(false);
  //   } catch (error) {
  //     setLoading(false);
  //     console.log("error2", error);
  //   }
  // };

  // useEffect(() => {
  //   if (user?.userTeleId) {
  //     getUserTrophies();
  //   }
  // }, []);

  // const handleClick = () => {
  //   setBalance(() => balance + Number(300));
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
          {/* {trophies.map((trophy, index) => {
            // const trophyIndex = FindIndexByName(trophy.title);
            return (
              <CardBarComp
                key={index}
                img={images[trophyIndex]?.src}
                title={trophy.title}
                price={Number(trophy.amount).toLocaleString()}
                disabled={
                  Number(user?.balance) > Number(trophy?.amount) ? false : true
                }
                // present_value={Number(user?.balance)}
                present_value={Number(balance)}
                final_value={Number(trophy.amount)}
                onCLick={handleClick}
              />
            );
          })} */}
        </>
      )}
    </div>
  );
};

export default Leagues;
