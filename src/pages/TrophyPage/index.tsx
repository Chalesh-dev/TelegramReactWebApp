import bgImg from "../../assets/bg_images/bg-4.png";
import TrophySlider from "../../components/Trophy/TrophySlider";
import LayoutLoading from "../../components/LoadingComp/LayoutLoading";
import RootLayout from "../../components/RootLayout/RootLayout";

interface TrophyPageTypes {
  loading: boolean;
  trophies: any;
  userBalance: number;
  user_trophy: string
}

const TrophyPage = ({ loading, trophies, userBalance, user_trophy }: TrophyPageTypes) => {

  return (
    <>
      {loading ? (
        <LayoutLoading />
      ) : (
        <RootLayout
          bg_img={bgImg}
          // bg_radial={
          //   "radial-gradient(ellipse at 0% 40%, rgb(224, 224, 65) -7%, transparent 40%)"
          // }
        >
          <div className="w-full h-full">
            <TrophySlider
              trophies={trophies}
              user_trophy={user_trophy}
              user_balance={userBalance}
            />
          </div>
        </RootLayout>
      )}
    </>
  );
};

export default TrophyPage;
