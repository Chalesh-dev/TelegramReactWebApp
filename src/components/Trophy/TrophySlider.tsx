// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import { FindIndexByName, images } from "./data";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import ScoreBarComp from "../ScoreBarComp";

interface trophiesTypes {
  title: string;
  amount: number;
}

interface TrophySliderTypes {
  trophies: trophiesTypes[];
  user_trophy: string;
  user_balance: number;
}

const TrophySlider = ({
  trophies,
  user_trophy,
  user_balance,
}: TrophySliderTypes) => {
  const UserTrophyIndex = Number(FindIndexByName(user_trophy));
  return (
    <Swiper
      modules={[Navigation]}
      spaceBetween={0}
      className={"w-[80vw] h-full"}
      grabCursor={true}
      mousewheel={true}
      centeredSlides={true}
      navigation={true}
      slidesPerView={1}
      freeMode={true}
      initialSlide={UserTrophyIndex}
    >
      {trophies?.map((item, index) => (
        <SwiperSlide className="w-full h-full">
          <div className="w-full h-full flex flex-col items-center justify-around">
            <div className="flex justify-center items-center flex-col gap-2">
              <h1 className="text-white font-bold text-2xl">
                {item?.title} League
              </h1>
              <p className="text-slate-400 text-center text-sm">
                Your number of shares determines the league you enter.
              </p>
            </div>
            <img src={images[index]?.src} alt={item?.title} />
            {index !== UserTrophyIndex && (
              <h1 className="font-bold text-white text-2xl">
                From {Number(item?.amount).toLocaleString()}
              </h1>
            )}
            {index === UserTrophyIndex && (
              <div className="w-full">
                <ScoreBarComp
                  present_value={user_balance}
                  final_value={item?.amount}
                  values={true}
                />
              </div>
            )}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default TrophySlider;
