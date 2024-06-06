import bgImg from "../../assets/bg_images/bg-3.png";
import Balance from "../../components/Balance/Balance";
import { useEffect, useState } from "react";
import RootLayout from "../../components/RootLayout/RootLayout";
import Tab from "../../components/Task/Tab";
import Special from "../../components/Task/Special";
import Leagues from "../../components/Task/Leagues";
import "./tasks.css";
import RefTasks from "../../components/Task/RefTasks";
import { trophies } from "../../components/config/trophiesList";

interface specialTypes {
  uuid: string;
  title: string;
  reward: number;
  link: string;
  status: boolean;
  claimed: boolean;
}

interface TaskPageProps {
  userBalance: number;
  special_tasks: specialTypes[];
  leagues: any;
  referral: any;
  sendMessage: any;
  taskClickAnswer: any;
  taskCheckResult: any;
  userTrophy: number;
  balanceUp: number;
  balanceUpRef: number;
  setBalanceUpRef: React.Dispatch<React.SetStateAction<number>>;
  setBalanceUp: React.Dispatch<React.SetStateAction<number>>;
}

const TaskPage = ({
  userBalance,
  special_tasks,
  leagues,
  referral,
  sendMessage,
  taskClickAnswer,
  taskCheckResult,
  userTrophy,
  balanceUp,
  balanceUpRef,
  setBalanceUpRef,
  setBalanceUp,
}: TaskPageProps) => {
  const [specials, setSpecials] = useState(false);
  const [league, setLeague] = useState(false);
  const [refTasks, setRefTasks] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSpecials(true);
  }, []);

  const handleActiveTab = (val: string) => {
    if (val === "special") {
      setSpecials(true);
      setLeague(false);
      setRefTasks(false);
    }
    if (val === "leagues") {
      setSpecials(false);
      setLeague(true);
      setRefTasks(false);
    }
    if (val === "ref_tasks") {
      setSpecials(false);
      setLeague(false);
      setRefTasks(true);
    }
  };

  return (
    <>
      <RootLayout bg_img={bgImg}>
        <Balance
          cup={true}
          border={true}
          balance={userBalance}
          user_trophy={trophies[userTrophy]?.name}
        />
        <div className="border border-gray-500 p-0.5 rounded-lg w-full h-14 mt-5 grid grid-cols-3 gap-1">
          <Tab
            className={specials && "!bg-[#ef49c6cc]/60"}
            onClick={() => handleActiveTab("special")}
            title={"Special"}
          />
          <Tab
            className={league && "!bg-[#ef49c6cc]/60"}
            onClick={() => handleActiveTab("leagues")}
            title={"Leagues"}
            notComplete={true}
          />
          <Tab
            className={refTasks && "!bg-[#ef49c6cc]/60"}
            onClick={() => handleActiveTab("ref_tasks")}
            title={"Ref Tasks"}
          />
        </div>
        <div className="container">
          {specials && (
            <Special
              specials={special_tasks}
              loadingCards={loading}
              sendMessage={sendMessage}
              taskClickAnswer={taskClickAnswer}
              taskCheckResult={taskCheckResult}
            />
          )}
          {league && (
            <Leagues
              leagues={leagues}
              sendMessage={sendMessage}
              balanceUp={balanceUp}
              setBalanceUp={setBalanceUp}
            />
          )}
          {refTasks && (
            <RefTasks
              referrals={referral}
              sendMessage={sendMessage}
              balanceUpRef={balanceUpRef}
              setBalanceUpRef={setBalanceUpRef}
            />
          )}
        </div>
      </RootLayout>
    </>
  );
};

export default TaskPage;
