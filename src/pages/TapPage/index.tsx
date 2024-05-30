import bgImg from "../../assets/bg_images/bg-2.png";
import RootLayout from "../../components/RootLayout/RootLayout";

/**PATH */
const energy_unit_path = process.env.REACT_APP_URL + "api/landing/info-energy";
const coin_fill_speed_path =
  process.env.REACT_APP_URL + "api/landing/info-recharging";
const last_energy_path = process.env.REACT_APP_URL + "api/data/get-data";
/**PATH */

interface TapPageProps {
  socket: any;
  userId: number;
}

const TapPage = ({ socket, userId }: TapPageProps) => {
  return <RootLayout bg_img={bgImg}>
    <p className="text-red-500">salammmm : {userId}</p>
  </RootLayout>;
};

export default TapPage;
