import React, { useEffect, useRef, useState } from "react";
import CardLoading from "../CardLoading";
import CardBarComp from "./CardBarComp";
import Modal from "../Modal";
import { refs } from "../config/refList";
import { ReferralsIcon } from "../Icons";

interface refTypes {
  referrals: any;
  sendMessage: any;
  balanceUpRef: number;
  setBalanceUpRef: React.Dispatch<React.SetStateAction<number>>;
}

const RefTasks = ({
  referrals,
  sendMessage,
  balanceUpRef,
  setBalanceUpRef,
}: refTypes) => {
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const refIdRef = useRef(0);

  useEffect(() => {
    if (balanceUpRef) {
      setOpenModal(true);
      setBalanceUpRef(0);
    }
  }, [balanceUpRef]);

  const handleClaim = async (id: number) => {
    sendMessage(JSON.stringify({ topic: "claim referral", request: id }));
    refIdRef.current = id;
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
              icon={<ReferralsIcon />}
              boostTitle={refs[refIdRef.current].name}
              boostDescription={`congratulations, You got "${
                refs[refIdRef.current].name
              }" ❤️`}
              botEarning={refs[refIdRef.current].reward}
              onClick={() => setOpenModal(false)}
            ></Modal>
          )}
          {referrals?.unclaimed?.map((item: number) => (
            <CardBarComp
              icon={<ReferralsIcon />}
              title={refs[item]?.name}
              price={Number(refs[item]?.reward).toLocaleString()}
              disabled={false}
              present_value={referrals?.total_referral}
              final_value={refs[item]?.threshold}
              onCLick={() => handleClaim(item)}
            />
          ))}
          <CardBarComp
            icon={<ReferralsIcon />}
            // img={"/images/coin-icon.png"}
            title={refs[referrals?.current]?.name}
            price={Number(refs[referrals?.current]?.reward).toLocaleString()}
            disabled={true}
            present_value={referrals?.total_referral}
            final_value={refs[referrals?.current]?.threshold}
          />
        </>
      )}
    </div>
  );
};

export default RefTasks;
