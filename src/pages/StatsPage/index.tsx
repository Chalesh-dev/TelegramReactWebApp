import { useEffect, useState } from "react";
import RootLayout from "../../components/RootLayout/RootLayout";
import bgImg from "../../assets/bg_images/bg-1.png";
import Balance from "../../components/Balance/Balance";
import Loading from "../../components/LoadingComp/Loading";
import Stats from "../../components/Stat/Stats";

/**PATH */
const path = process.env.REACT_APP_URL + "api/landing/info-stats";
/**PATH */

interface statsPageProps {
  userId?: any;
  userBalance?: number;
  totalShareBalance: number;
  setTotalShareBalance: React.Dispatch<React.SetStateAction<number>>;
  totalTouches: number;
  setTotalTouches: React.Dispatch<React.SetStateAction<number>>;
  totalPlayers: number;
  setTotalPlayers: React.Dispatch<React.SetStateAction<number>>;
  dailyUsers: number;
  setDailyUsers: React.Dispatch<React.SetStateAction<number>>;
  onlinePlayers: number;
  setOnlinePlayers: React.Dispatch<React.SetStateAction<number>>;
  socket: any;
}

// interface StatsProps {
//   totalTouch: number;
//   totalPlayer: number;
//   dailyDays: number;
// }

const StatsPage = ({
  userId,
  userBalance,
  totalShareBalance,
  setTotalShareBalance,
  totalTouches,
  setTotalTouches,
  totalPlayers,
  setTotalPlayers,
  dailyUsers,
  setDailyUsers,
  onlinePlayers,
  setOnlinePlayers,
  socket,
}: statsPageProps) => {
  const [loading, setLoading] = useState(false);
  // const [stats, setStats] = useState<StatsProps | null>(null);

  //todo: fix socket with ali
  useEffect(() => {
    setLoading(true);
    socket.on("stats", (data: any) => {
      if (data) {
        setTotalShareBalance(data?.total_balance);
        setTotalTouches(data?.total_touches);
        setTotalPlayers(data?.total_players);
        setDailyUsers(data?.daily_users);
        setOnlinePlayers(data?.online_players);
        setLoading(false);
      }
    });
  }, []);

  /**in real decomment these */
  // const getStats = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await fetch(path, {
  //       method: "GET",
  //       headers: {
  //         "Content-type": "application/json",
  //         Accept: "application/json",
  //         "info-user": userId,
  //       },
  //     });
  //     const result = await response.json();
  //     setStats(result);
  //     setLoading(false);
  //   } catch (error) {
  //     setLoading(false);
  //     console.log("error2", error);
  //   }
  // };

  // useEffect(() => {
  //   getStats();
  // }, [userId]);

  return (
    <RootLayout bg_img={bgImg}>
      <>
        <Balance
          description={"Total Share Balance :"}
          balance={totalShareBalance}
          border={true}
          stats={true}
        />

        {loading ? (
          <Loading />
        ) : (
          <div className="mt-16 flex flex-col gap-2">
            <Stats description={"Total Touches:"} total={totalTouches} />
            <Stats description={"Total Players:"} total={totalPlayers} />
            <Stats description={"Daily Users:"} total={dailyUsers} />
            <Stats description={"Online Players:"} total={onlinePlayers} />
          </div>
        )}
      </>
    </RootLayout>
  );
};

export default StatsPage;
