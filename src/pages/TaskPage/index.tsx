import bgImg from "../../assets/bg_images/bg-3.png";
import Balance from "../../components/Balance/Balance";
import { useEffect, useState } from "react";
import RootLayout from "../../components/RootLayout/RootLayout";
import Tab from "../../components/Task/Tab";
import Special from "../../components/Task/Special";
import Leagues from "../../components/Task/Leagues";
import "./tasks.css";
import RefTasks from "../../components/Task/RefTasks";

interface TaskPageProps {
  userBalance: number;
  setUserBalance: React.Dispatch<React.SetStateAction<number>>;
  tasks: never[];
  setTasks: React.Dispatch<React.SetStateAction<never[]>>;
  unClaimedLeagues: never[];
  setUnClaimedLeagues: React.Dispatch<React.SetStateAction<never[]>>;
  claimableLeagues: never[];
  setClaimableLeagues: React.Dispatch<React.SetStateAction<never[]>>;
  unClaimedRefs: never[];
  setUnClaimedRefs: React.Dispatch<React.SetStateAction<never[]>>;
  claimableRefs: never[];
  setClaimableRefs: React.Dispatch<React.SetStateAction<never[]>>;
  socket: any;
}

const TaskPage = ({
  userBalance,
  setUserBalance,
  tasks,
  setTasks,
  unClaimedLeagues,
  setUnClaimedLeagues,
  claimableLeagues,
  setClaimableLeagues,
  unClaimedRefs,
  setUnClaimedRefs,
  claimableRefs,
  setClaimableRefs,
  socket,
}: TaskPageProps) => {
  const [specials, setSpecials] = useState(false);
  const [leagues, setLeague] = useState(false);
  const [refTasks, setRefTasks] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSpecials(true);
  }, []);

  useEffect(() => {
    setLoading(true);
    socket.on("tasks", (data: any) => {
      if (data) {
        setTasks(data);
        setLoading(false);
      }
    });
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
        <Balance cup={true} border={true} balance={userBalance} />
        <div className="border border-gray-500 p-0.5 rounded-lg w-full h-14 mt-5 grid grid-cols-3 gap-1">
          <Tab
            className={specials && "!bg-[#ef49c6cc]/60"}
            onClick={() => handleActiveTab("special")}
            title={"Special"}
          />
          <Tab
            className={leagues && "!bg-[#ef49c6cc]/60"}
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
              specials={tasks}
              loadingCards={loading}
              setUserBalance={setUserBalance}
            />
          )}
          {Leagues && (
            <Leagues
              userBalance={userBalance}
              setUserBalance={setUserBalance}
              unClaimedLeagues={unClaimedLeagues}
              setUnClaimedLeagues={setUnClaimedLeagues}
              claimableLeagues={claimableLeagues}
              setClaimableLeagues={setClaimableLeagues}
              socket={socket}
            />
          )}
          {refTasks && (
            <RefTasks
              userBalance={userBalance}
              setUserBalance={setUserBalance}
              unClaimedRefs={unClaimedRefs}
              setUnClaimedRefs={setUnClaimedRefs}
              claimableRefs={claimableRefs}
              setClaimableRefs={setClaimableRefs}
              socket={socket}
            />
          )}
        </div>
      </RootLayout>
    </>
  );
};

export default TaskPage;
