import bgImg from "../../assets/bg_images/bg-4.png";
import TrophySlider from "../../components/Trophy/TrophySlider";
import RootLayout from "../../components/RootLayout/RootLayout";

interface TrophyPageProps {
  user_trophy: number;
  userTotalAmount: number;
}

const TrophyPage = ({ user_trophy, userTotalAmount }: TrophyPageProps) => {
  return (
    <>
      <RootLayout
        bg_img={bgImg}
      >
        <div className="w-full h-full">
          <TrophySlider user_trophy={user_trophy} userTotalAmount={userTotalAmount} />
        </div>
      </RootLayout>
    </>
  );
};

export default TrophyPage;
