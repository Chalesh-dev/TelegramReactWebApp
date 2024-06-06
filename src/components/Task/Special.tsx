import { useCallback, useEffect, useState } from "react";
import Card from "../Card";
import { Check, TaskIcon } from "../Icons";
import Modal from "../Modal";
import CustomBtn from "../CustomBtn";
import CardLoading from "../CardLoading";
import { useNavigate } from "react-router-dom";

interface specialsProps {
  uuid: string;
  title: string;
  link?: string;
  status: boolean;
  claimed: boolean;
  reward: number;
}

interface SpecialTypes {
  loadingCards: boolean;
  specials: specialsProps[];
  sendMessage: any;
  taskClickAnswer: string[];
  taskCheckResult: string[];
  // setUserBalance: React.Dispatch<React.SetStateAction<number>>;
}

const Special = ({
  loadingCards,
  specials,
  sendMessage,
  taskClickAnswer,
  taskCheckResult,
}: SpecialTypes) => {
  const [specialInfo, setSpecialInfo] = useState<specialsProps | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [check, setCheck] = useState<string[]>([]);
  const [claim, setClaim] = useState<string[]>([]);
  const navigate = useNavigate();

  
  //todo:ask ali why when click amd then back it got error
  useEffect(() => {
    if (taskClickAnswer && taskCheckResult && specialInfo) {
      setCheck(taskClickAnswer);
      setClaim(taskCheckResult);
    }
  }, [openModal]);

  const handleGetTaskDetails = async (index: number) => {
    setSpecialInfo(specials[index]);
    setOpenModal(true);
  };

  const handleTaskGo = useCallback(
    (link: string | undefined, uuid: string | undefined) => {
      if (link) {
        if (link.startsWith("http://") || link.startsWith("https://")) {
          window.location.href = link;
        } else {
          navigate(link);
        }
      } else {
        navigate("/");
      }
      sendMessage(JSON.stringify({ topic: "task pending", request: uuid }));
    },
    []
  );

  const handleTaskCheck = useCallback((taskId: string | undefined) => {
    sendMessage(JSON.stringify({ topic: "task check", request: taskId }));
  }, []);

  const handleSubmitTask = useCallback((taskId: string | undefined) => {
    sendMessage(JSON.stringify({ topic: "claim task", request: taskId }));
    setOpenModal(false);
  }, []);

  return (
    <>
      {loadingCards ? (
        <>
          <CardLoading />
          <CardLoading />
          <CardLoading />
          <CardLoading />
        </>
      ) : (
        <>
          {specials?.map((item, index) => {
            return (
              <Card
                key={index}
                claimed={item?.claimed}
                onClick={
                  item?.claimed ? () => {} : () => handleGetTaskDetails(index)
                }
                icon={<TaskIcon />}
                name={item?.title}
                coin_num={Number(item?.reward)}
              />
            );
          })}
        </>
      )}
      {openModal && (
        <Modal
          setOpenModal={setOpenModal}
          openModal={openModal}
          task={true}
          taskInfo={specialInfo}
        >
          <div className="p-3 rounded-md flex justify-between bg-slate-900 items-center">
            <span className="text-white text-sm">{specialInfo?.title}</span>
            {check.includes(specialInfo?.uuid ?? "") && (
              <CustomBtn
                title={"Check"}
                onClick={() => handleTaskCheck(specialInfo?.uuid)}
                className={"text-base"}
              />
            )}
            {!claim.includes(specialInfo?.uuid ?? "") &&
              !check.includes(specialInfo?.uuid ?? "") && (
                <CustomBtn
                  title={"Go"}
                  onClick={() =>
                    handleTaskGo(specialInfo?.link, specialInfo?.uuid)
                  }
                  className={"text-base"}
                />
              )}
            {claim.includes(specialInfo?.uuid ?? "") && (
              <Check color={"blue"} size={"26"} />
            )}
          </div>
          <CustomBtn
            title={"Finish mission"}
            onClick={() => handleSubmitTask(specialInfo?.uuid)}
            disabled={!claim.includes(specialInfo?.uuid ?? "")}
            className={"text-lg py-4 mt-3"}
          />
        </Modal>
      )}
    </>
  );
};

export default Special;
