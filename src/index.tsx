import React, {
  DispatchWithoutAction,
  FC,
  useEffect,
  useRef,
  useState,
} from "react";
import ReactDOM from "react-dom/client";
import {
  useThemeParams,
  WebAppProvider,
} from "@vkruglikov/react-telegram-web-app";
import { ConfigProvider, theme } from "antd";
import "antd/dist/reset.css";
import "./index.css";
import MainButtonDemo from "./MainButtonDemo";
import ShowPopupDemo from "./ShowPopupDemo";
import HapticFeedbackDemo from "./HapticFeedbackDemo";
import ScanQrPopupDemo from "./ScanQrPopupDemo";
import useBetaVersion from "./useBetaVersion";
import { useInitData } from "@vkruglikov/react-telegram-web-app";

import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import TapPage from "./pages/TapPage";
import { io } from "socket.io-client";
import { SocketProvider } from "./context/SocketContext";
import StatsPage from "./pages/StatsPage";
import BoostPage from "./pages/BoostPage";


// const DemoApp: FC<{
//   onChangeTransition: DispatchWithoutAction;
// }> = ({ onChangeTransition }) => {
//   const [colorScheme, themeParams] = useThemeParams();
//   const [isBetaVersion, handleRequestBeta] = useBetaVersion(false);
//   const [activeBtn, setActiveBtn] = useState(true);

//   return (
//     <div>
//       <ConfigProvider
//         theme={
//           themeParams.text_color
//             ? {
//                 algorithm:
//                   colorScheme === 'dark'
//                     ? theme.darkAlgorithm
//                     : theme.defaultAlgorithm,
//                 token: {
//                   colorText: themeParams.text_color,
//                   colorPrimary: themeParams.button_color,
//                   colorBgBase: themeParams.bg_color,
//                 },
//               }
//             : undefined
//         }
//       >
//         <header className="App-header">
//           <img
//             onClick={handleRequestBeta}
//             src={logo}
//             className="App-logo"
//             alt="logo"
//           />
//         </header>
//         <div className="contentWrapper">
//           {isBetaVersion && (
//             <div className="betaVersion">
//               <h3>WARNING: BETA VERSION</h3>
//               <button onClick={() => setActiveBtn(state => !state)}>
//                 change button
//               </button>
//               <button onClick={onChangeTransition}>change </button>
//             </div>
//           )}
//           <ExpandDemo />
//           {!activeBtn ? (
//             <MainButtonDemo
//               initialValues={{
//                 show: isBetaVersion,
//                 text: 'SECOND BUTTON',
//                 progress: true,
//               }}
//               key="1"
//             />
//           ) : (
//             <MainButtonDemo
//               key="2"
//               initialValues={{
//                 show: isBetaVersion,
//               }}
//             />
//           )}
//           <ShowPopupDemo />
//           <HapticFeedbackDemo />
//           <ScanQrPopupDemo />
//         </div>
//       </ConfigProvider>
//     </div>
//   );
// };

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

/**socket */
// const socket = socketIO.connect("https://socket.spxswap.com");
const socket = io("https://socket.spxswap.com");
// const socket = "frrfr";

const App = () => {
  const [smoothButtonsTransition, setSmoothButtonsTransition] = useState(false);
  const [initDataUnsafe] = useInitData();
  const telegramUserId = initDataUnsafe?.user?.id;
  //const telegramUserId = 123456;

  const [loading, setLoading] = useState<boolean>(false);
  const [userBalance, setUserBalance] = useState<number>(0);
  const [userTrophy, setUserTrophy] = useState<string>("");
  const [userMultiTap, setUserMultiTap] = useState<number>(0);
  const [maxEnergyLimit, setMaxEnergyLimit] = useState<number>(0);
  const [energyFillSpeed, setEnergyFillSpeed] = useState<number>(0);
  const [currentEnergy, setCurrentEnergy] = useState<number>(0);
  const [BoostMultiScore, setBoostMultiScore] = useState<number>(0);
  const [BoostMultiLevel, setBoostMultilevel] = useState<number>(0);
  const [BoostEnergyLimitScore, setBoostEnergyLimitScore] = useState<number>(0);
  const [BoostEnergyLimitLevel, setBoostEnergyLimitLevel] = useState<number>(0);
  const [BoostRechargingScore, setBoostRechargingScore] = useState<number>(0);
  const [BoostRechargingLevel, setBoostRechargingLevel] = useState<number>(0);

  /**PATH */
  const path_get_userInfo =
    process.env.REACT_APP_URL + "api/auth/login-register/";
  /**PATH */

  const getUserInfo = async () => {
    setLoading(true);
    try {
      const response = await fetch(path_get_userInfo + telegramUserId, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const { user } = await response.json();

      console.log("userr", user);

      socket.emit(
        "id",
        {
          id: Number(telegramUserId),
          limit: Number(user?.user_energy_limit),
          speed: Number(user?.UserEnergySpeed),
          energy: Number(user?.UserCurrentEnergy),
        },
        (data: any) => {}
      );

      setUserBalance(Number(user?.user_balance));
      setUserTrophy(user?.user_trophies);
      setUserMultiTap(Number(user?.UserMultiTap));

      setMaxEnergyLimit(Number(user?.user_energy_limit));
      setEnergyFillSpeed(Number(user?.UserEnergySpeed));
      setCurrentEnergy(Number(user?.UserCurrentEnergy));

      setBoostMultiScore(Number(user?.upgrade?.multitap));
      setBoostMultilevel(Number(11)); //unknown

      setBoostEnergyLimitScore(Number(user?.upgrade?.energyLimit));
      setBoostEnergyLimitLevel(Number(13)); //unknown

      setBoostRechargingScore(Number(user?.upgrade?.energySpeed));
      setBoostRechargingLevel(Number(12)); //unknown

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, [telegramUserId]);

  return (
    <WebAppProvider options={{ smoothButtonsTransition }}>
      <BrowserRouter>
        <SocketProvider socket={socket}>
          <Routes>
            <Route path="/" element={<Navigate to="/tap" replace />} />
            <Route
              path="/tap"
              element={
                <TapPage
                  socket={socket}
                  userId={telegramUserId}
                  userBalance={Number(userBalance)}
                  setUserBalance={setUserBalance}
                  user_trophy={userTrophy}
                  userMultiTap={userMultiTap}
                  maxEnergyLimit={maxEnergyLimit}
                  energyFillSpeed={energyFillSpeed}
                  currentEnergy={currentEnergy}
                  setCurrentEnergy={setCurrentEnergy}
                />
              }
            />
            <Route
              path="/stats"
              element={
                <StatsPage userId={telegramUserId} userBalance={userBalance} />
              }
            />
            <Route
              path="/boost"
              element={
                <BoostPage
                  userId={Number(telegramUserId)}
                  userBalance={Number(userBalance)}
                  multiScore={BoostMultiScore}
                  multiLevel={BoostMultiLevel}
                  energyLimitScore={BoostEnergyLimitScore}
                  energyLimitLevel={BoostEnergyLimitLevel}
                  rechargingSpeedScore={BoostRechargingScore}
                  rechargingSpeedLevel={BoostRechargingLevel}
                  loading={loading}
                  setUserBalance={setUserBalance}
                />
              }
            />
          </Routes>
        </SocketProvider>
      </BrowserRouter>
    </WebAppProvider>
  );
};

root.render(<App />);
