import RootLayout from "../../components/RootLayout/RootLayout";
import bgImg from "../../assets/bg_images/bg-5.png";
import InviteLink from "../../components/Referrals/InviteLink";
import { Link } from "react-router-dom";
import { ArrowRight, Coin, Trophy } from "../../components/Icons";
import { trophies } from "../../components/config/trophiesList";
interface RefPageTypes {
  myRefs: {
    name: string;
    league: number;
    total_amount: number;
    referrer_link: string;
  }[];
  refNum: number | 0;
  inviteLink: string;
}

const RefPage = ({ myRefs, refNum, inviteLink }: RefPageTypes) => {
  return (
    <>
      <RootLayout bg_img={bgImg}>
        <div className="flex flex-col items-center gap-3">
          <h1 className="xs:text-4xl text-2xl text-white">
            {refNum} Referrals
          </h1>
          <InviteLink link={inviteLink} />
          <div className="w-full h-[1px] bg-slate-400 my-5" />
          <p className="mb-5 text-2xl">My Referrals :</p>
          <div className="flex flex-col gap-1 overflow-y-auto w-full">
            {myRefs?.map((ref) => (
              <Link
                to={ref?.referrer_link}
                className="p-3 flex justify-between rounded-md bg-gradient-to-r from-purple-300 via-purple-500 to-purple-800 w-full items-center"
              >
                <div className="flex flex-col gap-1">
                  <p className="text-white text-sm capitalize">{ref?.name}</p>
                  <div className="flex gap-3 items-center">
                    <div className="flex items-center gap-1">
                      <Trophy />
                      {trophies[ref?.league]?.name}
                    </div>
                    <div>|</div>
                    <div className="flex items-center gap-1.5">
                      <Coin color={"yellow"} />
                      {ref?.total_amount}
                    </div>
                  </div>
                </div>
                <ArrowRight size={24} />
              </Link>
            ))}
          </div>
        </div>
      </RootLayout>
    </>
  );
};

export default RefPage;
