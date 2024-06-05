import { useCallback, useEffect, useState } from "react";
import Card from "../Card";
import { TaskIcon } from "../Icons";
import Modal from "../Modal";
import CustomBtn from "../CustomBtn";
import CardLoading from "../CardLoading";
import { Link, useNavigate } from "react-router-dom";

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
  taskClickAnswer: {
    set_pending: boolean;
    task_id: string;
  };
  // setUserBalance: React.Dispatch<React.SetStateAction<number>>;
}

const Special = ({
  loadingCards,
  specials,
  sendMessage,
  taskClickAnswer,
}: SpecialTypes) => {
  const [specialInfo, setSpecialInfo] = useState<specialsProps | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [check, setCheck] = useState(false);
  const navigate = useNavigate();

  //todo:ask ali why when click amd then back it got error
  useEffect(() => {
    if (taskClickAnswer && specialInfo) {
      if (
        taskClickAnswer?.set_pending &&
        specialInfo?.uuid === taskClickAnswer?.task_id
      ) {
        setCheck(true);
      } else {
        setCheck(false);
      }
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
      setCheck(true);
    },
    []
  );

  const handleTaskCheck = useCallback((taskId: string | undefined) => {
    //todo: when click on check button a socket should be emmited which check is really this person do the task and then "Finish Mission" button activated
    //todo: i am waiting till socket answered
  }, []);

  const handleSubmitTask = useCallback((amount: number | undefined) => {
    //todo: when successfully socket answered i added balance
    // setUserBalance((prevState) => prevState + Number(amount));
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
                onClick={() => handleGetTaskDetails(index)}
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
            {check ? (
              <CustomBtn
                title={"Check"}
                onClick={() => handleTaskCheck(specialInfo?.uuid)}
                className={"text-base"}
              />
            ) : (
              <CustomBtn
                title={"Go"}
                onClick={() =>
                  handleTaskGo(specialInfo?.link, specialInfo?.uuid)
                }
                className={"text-base"}
              />
            )}
          </div>
          <CustomBtn
            title={"Finish mission"}
            onClick={() => handleSubmitTask(specialInfo?.reward)}
            disabled={true}
            className={"text-lg py-4 mt-3"}
          />
        </Modal>
      )}
    </>
  );
};

export default Special;
