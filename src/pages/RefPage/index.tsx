import RootLayout from "../../components/RootLayout/RootLayout";
import bgImg from "../../assets/bg_images/bg-5.png";
import { useEffect, useState } from "react";
import Loading from "../../components/LoadingComp/Loading";
import InviteLink from "../../components/Referrals/InviteLink";
import { Link } from "react-router-dom";
import { Trophy } from "../../components/Icons";

interface RefArrTypes {
  referrer_name: string;
  referrer_trophy: string;
  referrer_score: number;
  link: string;
}

interface RefType {
  myReflink: string;
  refsInfo: RefArrTypes[];
}

interface RefPageTypes {
  socket: any;
}

const RefPage = ({ socket }: RefPageTypes) => {
  const [refs, setRefs] = useState<RefType | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    socket.emit("ref", (data: any) => {
      if (data) {
        setRefs(data);
        setLoading(false);
      }
    });
  }, []);

  return (
    <>
      <RootLayout bg_img={bgImg}>
        {loading ? (
          <Loading />
        ) : (
          <div className="flex flex-col p-5 items-center gap-3">
            <h1 className="text-4xl text-white">
              {refs?.refsInfo?.length} Referrals
            </h1>
            <InviteLink link={refs?.myReflink} />
            <div className="w-full h-[1px] bg-slate-400 my-5" />
            <p className="mb-5 text-2xl">My Referrals:</p>
            <div className="flex flex-col gap-1 overflow-y-auto">
              {refs?.refsInfo.map((ref, index) => (
                <Link
                  to={ref?.link}
                  className="p-2 flex flex-col rounded-md bg-gradient-to-r from-purple-300 via-purple-500 to-purple-800"
                >
                  <p className="text-white text-sm capitalize">
                    {ref?.referrer_name}
                  </p>
                  <div className="flex gap-1 items-center">
                    <Trophy color="#ccc" size={24} />
                    <span className="text-[#ccc] text-xs">{}</span>

                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </RootLayout>
    </>
  );
};

export default RefPage;
