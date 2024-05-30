// import { useEffect, useState } from "react";
// import bgImg from "../../assets/bg_images/bg-1.png";
// import RootLayout from "../../components/Layout";
// import Stats from "../../components/Stat/Stats";
// import { useTelegram } from "../../hooks/useTelegram";
// import Loading from "../../components/LoadingComponent/Loading";
// import Balance from "../../components/Balance/Balance";
// import LayoutLoading from "../../components/LoadingComponent/LayoutLoading";

/**PATH */
const path = process.env.REACT_APP_URL + "api/landing/info-stats";
/**PATH */

const StatsPage = () => {
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState([]);

  /**in real decomment these */
  // const user = useTelegram();
  // useEffect(() => {
  //   const telegramInfo = JSON.parse(telegram.user);
  //   const userId = telegramInfo.id;
  //   console.log("ueee", userId);
  // }, [telegram]);

  // useEffect(() => {
  //   const getStats = async () => {
  //     setLoading(true);
  //     if (user?.user?.uuid_name) {
  //       try {
  //         const response = await fetch(path, {
  //           method: "GET",
  //           headers: {
  //             "Content-type": "application/json",
  //             Accept: "application/json",
  //             "info-user": user?.user?.uuid_name,
  //           },
  //         });
  //         const result = await response.json();
  //         setStats(result);
  //         setLoading(false);
  //       } catch (error) {
  //         setLoading(false);
  //         console.log("error2", error);
  //       }
  //     }
  //   };
  //   getStats();
  // }, [user?.user?.uuid_name]);

  return (
    <>
    <p>stats page</p>
      {/* {user?.rootLoading ? (
        <LayoutLoading />
      ) : (
        <RootLayout
          bg_img={bgImg}
          // bg_radial={
          //   "radial-gradient(ellipse at 90% 10%, rgb(224, 224, 65) -17%, transparent 50%)"
          // }
        >
          <>
            <Balance
              description={"Total Share Balance :"}
              balance={Number(user?.balance)}
              border={true}
              loading={user?.loading}
              stats={true}
            />

            {loading ? (
              <Loading />
            ) : (
              <div className="mt-16 flex flex-col gap-2">
                <Stats description={"Total Touches:"} total={stats.totalTouch} />
                <Stats
                  description={"Total Players:"}
                  total={stats.totalPlayer}
                />
                <Stats description={"Daily Users:"} total={stats.dailyDays} />
                <Stats
                  description={"Online Players:"}
                  total={stats.totalPlayer}
                />
              </div>
            )}
          </>
        </RootLayout>
      )} */}
    </>
  );
};

export default StatsPage;
