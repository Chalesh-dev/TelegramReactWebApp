// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import { trophies } from "../config/trophiesList";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import ScoreBarComp from "../ScoreBarComp";

// interface trophiesTypes {
//   title: string;
//   amount: number;
// }

interface TrophySliderTypes {
  user_trophy: number;
  userTotalAmount: number;
}

// interface trophiesTypes {
//   trophies: trophiesTypes[];
// }

const TrophySlider = ({ user_trophy, userTotalAmount }: TrophySliderTypes) => {
  // const UserTrophyIndex = Number(FindIndexByName(user_trophy));
  console.log('eerrrttt',userTotalAmount);
  
  let userAmount = userTotalAmount;
  if (isNaN(userAmount)) {
    userAmount = 0;
  }
  
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
      initialSlide={user_trophy}
    >
      {trophies?.map((item, index) => (
        <SwiperSlide className="w-full h-full">
          <div className="w-full h-full flex flex-col items-center justify-around">
            <div className="flex justify-center items-center flex-col gap-2">
              <h1 className="text-white font-bold text-2xl">
                {item?.name} League
              </h1>
              <p className="text-slate-400 text-center text-sm">
                Your number of shares determines the league you enter.
              </p>
            </div>
            <img src={trophies[index]?.src} alt={item?.name} />
            {index !== user_trophy && (
              <h1 className="font-bold text-white text-2xl">
                From {Number(item?.reward).toLocaleString()}
              </h1>
            )}
            {index === user_trophy && (
              <div className="w-full">
                <ScoreBarComp
                  present_value={userAmount}
                  final_value={item?.reward}
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
