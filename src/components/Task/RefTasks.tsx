import React, { useEffect, useState } from "react";
import CardLoading from "../CardLoading";
import CardBarComp from "./CardBarComp";
import { FindIndexByName, trophies } from "../config/trophiesList";

interface SingleRefTypes {
  title: string;
  threshold: number;
  reward: number;
}

interface RefTypes {
  userBalance: number;
  setUserBalance: React.Dispatch<React.SetStateAction<number>>;
  socket: any;
  unClaimedRefs: SingleRefTypes[];
  setUnClaimedRefs: React.Dispatch<React.SetStateAction<never[]>>;
  claimableRefs: SingleRefTypes[];
  setClaimableRefs: React.Dispatch<React.SetStateAction<never[]>>;
}

const RefTasks = ({
  userBalance,
  setUserBalance,
  socket,
  unClaimedRefs,
  setUnClaimedRefs,
  claimableRefs,
  setClaimableRefs,
}: RefTypes) => {
  const [loading, setLoading] = useState(false);

  //todo: fix useEffect and handleClaim with ali....
  useEffect(() => {
    setLoading(true);
    socket.on("refs", (data: any) => {
      if (data) {
        setUnClaimedRefs(data.unClaimed);
        setClaimableRefs(data.claimable);
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
          {claimableRefs.map((ref, index) => {
            return (
              <CardBarComp
                key={index}
                img={'./images/cat.png'}
                title={ref?.title}
                price={Number(ref?.reward)}
                disabled={false}
                present_value={Number(userBalance)}
                final_value={Number(ref?.threshold)}
                onCLick={() => handleClaim(ref?.reward)}
              />
            );
          })}
          {unClaimedRefs.map((ref, index) => {
            return (
              <CardBarComp
                key={index}
                img={'./images/cat.png'}
                title={ref?.title}
                price={Number(ref?.reward)}
                disabled={true}
                present_value={Number(userBalance)}
                final_value={Number(ref?.threshold)}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default RefTasks;
