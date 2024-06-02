import bgImg from "../../assets/bg_images/bg-4.png";
import TrophySlider from "../../components/Trophy/TrophySlider";
import RootLayout from "../../components/RootLayout/RootLayout";
import { useEffect } from "react";

interface TrophyPageProps {
  socket: any;
  user_trophy: string;
  userBalance: number;
}

const TrophyPage = ({ socket, user_trophy, userBalance }: TrophyPageProps) => {
  return (
    <>
      <RootLayout
        bg_img={bgImg}
        // bg_radial={
        //   "radial-gradient(ellipse at 0% 40%, rgb(224, 224, 65) -7%, transparent 40%)"
        // }
      >
        <div className="w-full h-full">
          <TrophySlider user_trophy={user_trophy} userBalance={userBalance} />
        </div>
      </RootLayout>
    </>
  );
};

export default TrophyPage;
