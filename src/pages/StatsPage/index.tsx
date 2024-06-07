import RootLayout from "../../components/RootLayout/RootLayout";
import bgImg from "../../assets/bg_images/bg-1.png";
import Balance from "../../components/Balance/Balance";
import Stats from "../../components/Stat/Stats";

interface statsPageProps {
  userBalance?: number;
  totalShareBalance: string;
  totalTouches: number;
  totalPlayers: number;
  dailyUsers: number;
  onlinePlayers: number;
}

const StatsPage = ({
  totalShareBalance,
  totalTouches,
  totalPlayers,
  dailyUsers,
  onlinePlayers,
}: statsPageProps) => {
  return (
    <RootLayout bg_img={bgImg}>
      <Balance
        description={"Total Share Balance :"}
        balance={totalShareBalance}
        border={true}
      />
      <div className="mt-16 flex flex-col gap-2">
        <Stats description={"Total Touches:"} total={totalTouches} />
        <Stats description={"Total Players:"} total={totalPlayers} />
        <Stats description={"Daily Users:"} total={dailyUsers} />
        <Stats description={"Online Players:"} total={onlinePlayers} />
      </div>
    </RootLayout>
  );
};

export default StatsPage;
