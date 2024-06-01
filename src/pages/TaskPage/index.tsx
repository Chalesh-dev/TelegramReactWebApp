import bgImg from "../../assets/bg_images/bg-3.png";
import Balance from "../../components/Balance/Balance";
import { useEffect, useState } from "react";
import RootLayout from "../../components/RootLayout/RootLayout";
import LayoutLoading from "../../components/LoadingComp/LayoutLoading";
import Tab from "../../components/Task/Tab";
import Special from "../../components/Task/Special";
import Leagues from "../../components/Task/Leagues";
import './tasks.css';

interface TaskPageProps {
  userId: any;
  userBalance: number;
  setUserBalance: React.Dispatch<React.SetStateAction<number>>;
  loadingRoot: boolean;
}

/**PATH */
const get_user_tasks_path = process.env.REACT_APP_URL + "api/tasks/get-tasks";
/**PATH */

const TaskPage = ({
  userId,
  userBalance,
  setUserBalance,
  loadingRoot,
}: TaskPageProps) => {
  const [special, setSpecial] = useState(false);
  const [league, setLeague] = useState(false);
  const [refTasks, setRefTasks] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUserTasks = async () => {
    setLoading(true);
    try {
      const response = await fetch(get_user_tasks_path, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          "info-user": userId,
        },
      });
      const tasks = await response.json();
      setTasks(tasks);
      setLoading(false);
      return tasks;
    } catch (error) {
      setLoading(false);
      console.log("error2", error);
    }
  };

  useEffect(() => {
    getUserTasks();
    setSpecial(true);
  }, []);

  const handleActiveTab = (val: string) => {
    if (val === "special") {
      setSpecial(true);
      setLeague(false);
      setRefTasks(false);
    }
    if (val === "leagues") {
      setSpecial(false);
      setLeague(true);
      setRefTasks(false);
    }
    if (val === "ref_tasks") {
      setSpecial(false);
      setLeague(false);
      setRefTasks(true);
    }
  };

  return (
    <>
      {loadingRoot ? (
        <LayoutLoading />
      ) : (
        <RootLayout
          bg_img={bgImg}
          // bg_radial={
          //   "radial-gradient(ellipse at 30% 40%, rgb(224, 224, 65) -7%, transparent 40%)"
          // }
        >
          <Balance cup={true} border={true} balance={userBalance} />
          <div className="border border-gray-500 p-0.5 rounded-lg w-full h-14 mt-5 grid grid-cols-3 gap-1">
            <Tab
              className={special && "!bg-[#ef49c6cc]/60"}
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
            {special && <Special specials={tasks} loadingCards={loading} setUserBalance={setUserBalance} />}
            {league && <Leagues userBalance={userBalance} setUserBalance={setUserBalance} />}
            {/* {refTasks && <RefTasks />} */}
          </div>
        </RootLayout>
      )}
    </>
  );
};

export default TaskPage;
