import React, {
  DispatchWithoutAction,
  FC,
  useCallback,
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
// import { useInitData } from "@vkruglikov/react-telegram-web-app";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import TapPage from "./pages/TapPage";
import { io } from "socket.io-client";
import { SocketProvider } from "./context/SocketContext";
import StatsPage from "./pages/StatsPage";
import BoostPage from "./pages/BoostPage";
import TaskPage from "./pages/TaskPage";
import TrophyPage from "./pages/TrophyPage";
import RefPage from "./pages/RefPage";

import useWebSocket, { ReadyState } from "react-use-websocket";

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

/*********************socket ********************/
// const socket = io("https://socket.spxswap.com");
// const socket = io("ws://192.168.88.166:8080");
// const socket = "frrfr";

const App = () => {
  //   const [socket, setSocket] = useState(null);
  //   useEffect(() => {
  //     const socket = io("ws://192.168.88.168:8080");

  // //@ts-ignore
  // setSocket(socket);
  // socket.on("connect", () => {
  //   console.log("eee");
  //   socket.emit("join", "C++");
  // });

  // socket.emit("user_login", 12, (data: any) => {
  //   console.log(data);
  // });
  // }, []);

  const [smoothButtonsTransition, setSmoothButtonsTransition] = useState(false);
  // const [initDataUnsafe] = useInitData();
  // const telegramUserId = initDataUnsafe?.user?.id;
  const telegramUserId = 123456;

  /*********************Initial states*****************/
  const [init, setInit] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  /********************user balance ******************/
  const [userBalance, setUserBalance] = useState<number>(0);

  /********************user trophy ******************/
  const [userTrophy, setUserTrophy] = useState<string>("");

  /********************Tap page *********************/
  const [userLevel, setUserLevel] = useState<number>(0);
  const [maxEnergyLimit, setMaxEnergyLimit] = useState<number>(0);
  const [energyFillSpeed, setEnergyFillSpeed] = useState<number>(0);
  const [currentEnergy, setCurrentEnergy] = useState<number>(0);

  //******************boost page *******************/
  const [boostMultiScore, setBoostMultiScore] = useState<number>(0);
  const [boostMultiLevel, setBoostMultilevel] = useState<number>(0);

  const [boostEnergyLimitScore, setBoostEnergyLimitScore] = useState<number>(0);
  const [boostEnergyLimitLevel, setBoostEnergyLimitLevel] = useState<number>(0);

  const [boostRechargingScore, setBoostRechargingScore] = useState<number>(0);
  const [boostRechargingLevel, setBoostRechargingLevel] = useState<number>(0);

  const [guruRemains, setGuruRemains] = useState(3);
  const [guruState, setGuruState] = useState(false);

  const [TankRemains, setTankRemains] = useState(3);
  const [startTankTime, setStartTankTime] = useState("");

  /********************Stats page**************************/
  const [totalShareBalance, setTotalShareBalance] = useState(0);
  const [totalTouches, setTotalTouches] = useState(0);
  const [totalPlayers, setTotalPlayers] = useState(0);
  const [dailyUsers, setDailyUsers] = useState(0);
  const [onlinePlayers, setOnlinePlayers] = useState(0);

  /******************Task page ***************************/
  const [tasks, setTasks] = useState([]);
  const [unClaimedLeagues, setUnClaimedLeagues] = useState([]);
  const [claimableLeagues, setClaimableLeagues] = useState([]);
  const [unClaimedRefs, setUnClaimedRefs] = useState([]);
  const [claimableRefs, setClaimableRefs] = useState([]);

  /******************Ref page ****************************/

  /*********************End ******************************/

  /*********************sockets *************************/
  const socket = 123456789;

  const WS_URL = "ws://192.168.88.168:8080/" + telegramUserId;
  //Public API that will echo messages sent to it back to the client
  const [socketUrl, setSocketUrl] = useState(WS_URL);
  const [messageHistory, setMessageHistory] = useState<MessageEvent<any>[]>([]);

  const [lastMessage, setLastMessage] = useState(null);
  const [jsonMessage, setJsonMessage] = useState(null);

  const { sendMessage, lastJsonMessage } = useWebSocket(socketUrl, {
    onOpen: () => console.log('Connected to WebSocket'),
    onMessage: (message) => {
      console.log(`Received raw message: ${message.data}`);
      setLastMessage(message.data);

      try {
        const parsedData = JSON.parse(message.data);
        setJsonMessage(parsedData);
        console.log('Converted JSON dataaaa:', parsedData.result.status);
      } catch (error) {
        console.error('Failed to decode JSON:', error);
      }
    },
    onError: (event) => console.error('WebSocket error:', event),
    // todo: onclose
    onClose: () => console.log('WebSocket connection closed'),
    shouldReconnect: (closeEvent) => true,  // Automatically reconnect on disconnection
  });

  useEffect(() => {
    if (lastJsonMessage !== null) {
      // setMessageHistory((prev) => prev.concat(lastJsonMessage));
    }
    console.log("lastMessage1121", lastJsonMessage);
    // let data12 = lastMessage?.data
    // data12 = JSON.parse(data12)
    // console.log(data12)
    // console.log('lastMessage',JSON.parse(lastMessage?.data));
  }, [lastJsonMessage]);

  const handleClickSendMessage = useCallback(() => sendMessage(JSON.stringify({topic:"upgrade",power:"energy limit"})), []);

  // const handleClickChangeSocketUrl = useCallback(
  //   () => setSocketUrl("wss://demos.kaazing.com/echo"),
  //   []
  // );

  // useEffect(() => {
  //   setInterval(() => {
  //     if (currentEnergy < maxEnergyLimit) {
  //       setCurrentEnergy((prevState) => {
  //         if (prevState + Number(energyFillSpeed) < maxEnergyLimit) {
  //           return prevState + Number(energyFillSpeed);
  //         } else {
  //           return maxEnergyLimit;
  //         }
  //       });
  //     }
  //   }, 1000);
  // }, [init]);

  // useEffect(() => {
  //   socket.on("energy", (data: any) => {
  //     if (data) {
  //       setInit(true);
  //     }
  //   });

  //   socket.emit("user_login", 12, (data: any) => {
  //     console.log(data);
  //   });
  // }, []);

  //todo: am i put these sockets in useEffect or not? // fix the socket names
  // useEffect(() => {
  //   setLoading(true);
  //   socket.on("socket_name_get_user_balance", (data: any) => {
  //     setUserBalance(data?.userBalance);
  //   });

  //   socket.on("socket_name_get_user_trophy", (data: any) => {
  //     setUserTrophy(data?.trophy);
  //   });

  //   socket.on("socket_name_get_tap_info_page", (data: any) => {
  //     if (data) {
  //       setLoading(false);
  //       setUserLevel(data?.level);
  //       setMaxEnergyLimit(data?.energyLimit);
  //       setCurrentEnergy(data?.currentEnergy);
  //       setEnergyFillSpeed(data?.energyFillSpeed);
  //     }
  //   });
  // }, []);

  /**PATH */
  // const path_get_userInfo =
  //   process.env.REACT_APP_URL + "api/auth/login-register/";
  /**PATH */
  // const getUserInfo = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await fetch(path_get_userInfo + telegramUserId, {
  //       method: "GET",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     const { user } = await response.json();

  //     console.log("userr", user);

  //     // socket.emit(
  //     //   "id",
  //     //   {
  //     //     id: Number(telegramUserId),
  //     //     limit: Number(user?.user_energy_limit),
  //     //     speed: Number(user?.UserEnergySpeed),
  //     //     energy: Number(user?.UserCurrentEnergy),
  //     //   },
  //     //   (data: any) => {}
  //     // );

  //     setUserBalance(Number(user?.user_balance));
  //     setUserTrophy(user?.user_trophies);
  //     setUserMultiTap(Number(user?.UserMultiTap));

  //     setMaxEnergyLimit(Number(user?.user_energy_limit));
  //     setEnergyFillSpeed(Number(user?.UserEnergySpeed));
  //     setCurrentEnergy(Number(user?.UserCurrentEnergy));

  //     setBoostMultiScore(Number(user?.upgrade?.multitap));
  //     setBoostMultilevel(Number(11)); //unknown

  //     setBoostEnergyLimitScore(Number(user?.upgrade?.energyLimit));
  //     setBoostEnergyLimitLevel(Number(13)); //unknown

  //     setBoostRechargingScore(Number(user?.upgrade?.energySpeed));
  //     setBoostRechargingLevel(Number(12)); //unknown

  //     setLoading(false);
  //   } catch (error) {
  //     setLoading(false);
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   getUserInfo();
  // }, [telegramUserId]);

  // const trophies = [
  //   {
  //     title: "amir",
  //     amount: 1000,
  //   },
  //   {
  //     title: "ppp",
  //     amount: 1000,
  //   },
  // ];

  return (
    <WebAppProvider options={{ smoothButtonsTransition }}>
      <button onClick={handleClickSendMessage}>
        Click Me to change Socket Url
      </button>
      {/* <BrowserRouter> */}
      {/* <SocketProvider socket={socket}>
          <Routes>
            <Route path="/" element={<Navigate to="/tap" replace />} />
            <Route
              path="/tap"
              element={
                <TapPage
                  loading={loading}
                  socket={socket}
                  userId={telegramUserId}
                  userBalance={Number(userBalance)}
                  setUserBalance={setUserBalance}
                  user_trophy={userTrophy}
                  userLevel={userLevel}
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
                <StatsPage
                  userId={telegramUserId}
                  userBalance={userBalance}
                  totalShareBalance={totalShareBalance}
                  setTotalShareBalance={setTotalShareBalance}
                  totalTouches={totalTouches}
                  setTotalTouches={setTotalTouches}
                  totalPlayers={totalPlayers}
                  setTotalPlayers={setTotalPlayers}
                  dailyUsers={dailyUsers}
                  setDailyUsers={setDailyUsers}
                  onlinePlayers={onlinePlayers}
                  setOnlinePlayers={setOnlinePlayers}
                  socket={socket}
                />
              }
            />
            <Route
              path="/boost"
              element={
                <BoostPage
                  userId={Number(telegramUserId)}
                  userBalance={Number(userBalance)}
                  setUserBalance={setUserBalance}
                  guruRemains={guruRemains}
                  setGuruRemains={setGuruRemains}
                  guruState={guruState}
                  setGuruState={setGuruState}
                  tankRemains={TankRemains}
                  setTankRemains={setTankRemains}
                  startTankTime={startTankTime}
                  setStartTankTime={setStartTankTime}
                  multiScore={boostMultiScore}
                  setMultiScore={setBoostMultiScore}
                  multiLevel={boostMultiLevel}
                  setMultiLevel={setBoostMultilevel}
                  energyLimitScore={boostEnergyLimitScore}
                  setEnergyLimitScore={setBoostEnergyLimitScore}
                  energyLimitLevel={boostEnergyLimitLevel}
                  setEnergyLimitLevel={setBoostEnergyLimitLevel}
                  rechargingLevel={boostRechargingLevel}
                  setRechargingLevel={setBoostRechargingLevel}
                  rechargingScore={boostRechargingScore}
                  setRechargingScore={setBoostRechargingScore}
                  socket={socket}
                />
              }
            />
            <Route
              path="/task"
              element={
                <TaskPage
                  // userId={telegramUserId}
                  userBalance={Number(userBalance)}
                  setUserBalance={setUserBalance}
                  tasks={tasks}
                  setTasks={setTasks}
                  unClaimedLeagues={unClaimedLeagues}
                  setUnClaimedLeagues={setUnClaimedLeagues}
                  claimableLeagues={claimableLeagues}
                  setClaimableLeagues={setClaimableLeagues}
                  unClaimedRefs={unClaimedRefs}
                  setUnClaimedRefs={setUnClaimedRefs}
                  claimableRefs={claimableRefs}
                  setClaimableRefs={setClaimableRefs}
                  socket={socket}
                />
              }
            />
            <Route
              path="/trophy"
              element={
                <TrophyPage
                  socket={socket}
                  user_trophy={userTrophy}
                  userBalance={Number(userBalance)}
                />
              }
            />
            <Route path="/referrals" element={<RefPage socket={socket} />} />
          </Routes>
        </SocketProvider> */}
      {/* </BrowserRouter> */}
    </WebAppProvider>
  );
};

root.render(<App />);
