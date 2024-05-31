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
}

interface StatsPageProps {
  totalTouch: number;
  totalPlayer: number;
  dailyDays: number;
}

const StatsPage = ({ userId, userBalance }: statsPageProps) => {
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<StatsPageProps | null>(null);

  /**in real decomment these */
  const getStats = async () => {
    setLoading(true);
    try {
      const response = await fetch(path, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          "info-user": userId,
        },
      });
      const result = await response.json();
      setStats(result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error2", error);
    }
  };

  useEffect(() => {
    getStats();
  }, [userId]);

  return (
    <RootLayout bg_img={bgImg}>
      <>
        <Balance
          description={"Total Share Balance :"}
          balance={userBalance}
          border={true}
          stats={true}
        />

        {loading ? (
          <Loading />
        ) : (
          <div className="mt-16 flex flex-col gap-2">
            <Stats description={"Total Touches:"} total={stats?.totalTouch} />
            <Stats description={"Total Players:"} total={stats?.totalPlayer} />
            <Stats description={"Daily Users:"} total={stats?.dailyDays} />
            <Stats description={"Online Players:"} total={stats?.totalPlayer} />
          </div>
        )}
      </>
    </RootLayout>
  );
};

export default StatsPage;
