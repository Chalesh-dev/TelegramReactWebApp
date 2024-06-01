import { useState } from "react";
import Card from "../Card";
import { TaskIcon } from "../Icons";
import Modal from "../Modal";
import CustomBtn from "../CustomBtn";
import CardLoading from "../CardLoading";
import { Link, useNavigate } from "react-router-dom";

interface specialsProps {
  title: string;
  body: string;
  link: URL;
  amount: number;
}

interface SpecialTypes {
  loadingCards: boolean;
  specials: specialsProps[];
  setUserBalance: React.Dispatch<React.SetStateAction<number>>;
}

const Special = ({ loadingCards, specials, setUserBalance }: SpecialTypes) => {
  const [specialInfo, setSpecialInfo] = useState<specialsProps | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [check, setCheck] = useState(false);
  const navigate = useNavigate();

  const handleGetTaskDetails = async (index: number) => {
    setSpecialInfo(specials[index]);
    setOpenModal(true);
  };

  const handleTaskGo = (link: URL | undefined) => {
    navigate(link ?? "/");
    setCheck(true);
  };

  const handleTaskCheck = () => {
    //todo: when click on check button a socket should be emmited which check is really this person do the task and then "Finish Mission" button activated
    //todo: i am waiting till socket answered
  };

  const handleSubmitTask = (amount: number | undefined) => {
    //todo: when successfully socket answered i added balance
    setUserBalance((prevState) => prevState + Number(amount));
    setOpenModal(false);
  };

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
          {specials?.map((item, index) => (
            <Card
              key={index}
              onClick={() => handleGetTaskDetails(index)}
              icon={<TaskIcon />}
              name={item?.title}
              coin_num={Number(item?.amount)}
            />
          ))}
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
            <span className="text-white">{specialInfo?.title}</span>
            <CustomBtn
              title={"Go"}
              onClick={() => handleTaskGo(specialInfo?.link)}
              className={"text-base"}
            />
            {check && (
              <CustomBtn
                title={"Check"}
                onClick={handleTaskCheck}
                className={"text-base"}
              />
            )}
          </div>
          <CustomBtn
            title={"Finish mission"}
            onClick={() => handleSubmitTask(specialInfo?.amount)}
            disabled={true} 
            className={"text-lg py-4 mt-3"}
          />
        </Modal>
      )}
    </>
  );
};

export default Special;
