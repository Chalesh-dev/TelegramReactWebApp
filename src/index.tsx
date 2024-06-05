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
  const [userTrophy, setUserTrophy] = useState<number>(0);
  const [userTotalAmount, setUserTotalAmount] = useState<number>(0);

  /********************Tap page *********************/
  const [userLevel, setUserLevel] = useState<number>(0);
  const [maxEnergyLimit, setMaxEnergyLimit] = useState<number>(0);
  const [guru, setGuru] = useState<boolean>(false);
  const [autoBot, setAutoBot] = useState<boolean>(false);
  const [energyFillSpeed, setEnergyFillSpeed] = useState<number>(0);
  const [currentEnergy, setCurrentEnergy] = useState<number>(0);
  const [autoEarning, setAutoEarning] = useState<number>(0);

  //******************boost page *******************/
  const [boostMultiScore, setBoostMultiScore] = useState<number>(0);
  const [boostMultiLevel, setBoostMultilevel] = useState<number>(0);
  const [boostMultiIsMax, setBoostMultiIsMax] = useState<boolean>(false);

  const [boostEnergyLimitScore, setBoostEnergyLimitScore] = useState<number>(0);
  const [boostEnergyLimitLevel, setBoostEnergyLimitLevel] = useState<number>(0);
  const [boostEnergyLimitIsMax, setBoostEnergyLimitIsMax] =
    useState<boolean>(false);

  const [boostRechargingScore, setBoostRechargingScore] = useState<number>(0);
  const [boostRechargingLevel, setBoostRechargingLevel] = useState<number>(0);
  const [boostRechargingIsMax, setBoostRechargingIsMAx] =
    useState<boolean>(false);

  const [boostBotLevel, setBoostBotLevel] = useState<number>(0);
  const [boostBotIsMax, setBoostBotIsMax] = useState<boolean>(false);
  const [boostBotScore, setBoostBotScore] = useState<number>(0);

  const [guruLeft, setGuruLeft] = useState(0);
  const [TankLeft, setTankLeft] = useState(0);
  const [max_special_boost, setMax_special_boost] = useState(0);
  const [next_update, setNext_update] = useState(0);

  /********************Stats page**************************/
  const [totalShareBalance, setTotalShareBalance] = useState<string>("");
  const [totalTouches, setTotalTouches] = useState<number>(0);
  const [totalPlayers, setTotalPlayers] = useState<number>(0);
  const [dailyUsers, setDailyUsers] = useState<number>(0);
  const [onlinePlayers, setOnlinePlayers] = useState<number>(0);

  /******************Task page ***************************/
  const [tasks, setTasks] = useState([]);
  const [leagues, setLeagues] = useState([]);
  const [refs, setRefs] = useState([]);
  const [taskClickAnswer, setTaskClickAnswer] = useState([]);

  /******************Ref page ****************************/
  const [myRefs, setMyRefs] = useState(null);

  /*********************End ******************************/

  /*********************sockets *************************/

  const WS_URL = "ws://127.0.0.1:6001/" + telegramUserId;
  //Public API that will echo messages sent to it back to the client
  const socketUrlRef = useRef(WS_URL);

  const { sendMessage, lastJsonMessage } = useWebSocket(socketUrlRef.current, {
    onOpen: () => console.log("Connected to WebSocket"),
    onMessage: (message) => {
      try {
        const parsedData = JSON.parse(message.data);
        const data = parsedData?.result;
        const topic = parsedData?.topic;
        const status = parsedData?.status;
        if (status) {
          /**tap page */
          if (topic === "balance") {
            setUserBalance(Number(data?.balance));
            setUserLevel(Number(data?.multi_tap));
            setGuru(data?.guru);
            setUserTrophy(data?.league);
            setAutoBot(data?.auto_bot);
          } else if (topic === "energy") {
            setCurrentEnergy(Number(data?.energy));
            setMaxEnergyLimit(Number(data?.max_energy));
            setEnergyFillSpeed(Number(data?.energy_speed));
          } else if (topic === "bot earning") {
            setAutoEarning(Number(data?.earning));
          } else if (topic === "stats") {
            /*****stats page */
            setTotalShareBalance(data?.total_shares);
            setTotalTouches(data?.total_touches);
            setTotalPlayers(data?.total_players);
            setDailyUsers(data?.daily_players);
            setOnlinePlayers(data?.online_players);
          } else if (topic === "special boost") {
            /**boost page */
            setGuruLeft(data?.guru_left);
            setTankLeft(data?.full_tank_left);
            setNext_update(data?.next_update);
            setMax_special_boost(data?.max_special_boost);
          } else if (topic === "boost") {
            /**multi */
            setBoostMultiScore(data?.multi_tap?.next_level_price);
            setBoostMultilevel(data?.multi_tap?.level);
            setBoostMultiIsMax(data?.multi_tap?.is_max);
            /**energy_limit */
            setBoostEnergyLimitIsMax(data?.energy_limit?.is_max);
            setBoostEnergyLimitLevel(data?.energy_limit?.level);
            setBoostEnergyLimitScore(data?.energy_limit?.next_level_price);
            /**recharging */
            setBoostRechargingScore(data?.recharging_speed?.next_level_price);
            setBoostRechargingLevel(data?.recharging_speed?.level);
            setBoostRechargingIsMAx(data?.recharging_speed?.is_max);
            /**bot */
            setBoostBotLevel(data?.tap_bot?.level);
            setBoostBotIsMax(data?.tap_bot?.is_max);
            setBoostBotScore(data?.tap_bot?.next_level_price);
          } else if (topic === "activate") {
            let unit = data?.unit;
            if (unit === "guru") {
              setGuruLeft(data?.new_left);
            } else {
              setTankLeft(data?.new_left);
            }
            setNext_update(data?.finish_time);
            setCurrentEnergy(data?.energy);
          } else if (topic === "upgrade") {
            let unit = data?.upgraded_unit;
            if (unit === "multi_tap") {
              setBoostMultiIsMax(data?.is_max);
              setBoostMultilevel(data?.new_level);
              setBoostMultiScore(data?.next_level_price);
            }
            if (unit === "limit") {
              setBoostEnergyLimitIsMax(data?.is_max);
              setBoostEnergyLimitLevel(data?.new_level);
              setBoostEnergyLimitScore(data?.next_level_price);
            }
            if (unit === "speed") {
              setBoostRechargingIsMAx(data?.is_max);
              setBoostRechargingLevel(data?.new_level);
              setBoostRechargingScore(data?.next_level_price);
            }
            if (unit === "bot") {
              setBoostBotIsMax(data?.is_max);
              setBoostBotLevel(data?.new_level);
              setBoostBotScore(data?.next_level_price);
            }
            setUserBalance(data?.balance);
          } else if (topic === "tasks") {
            /****task page */
            setTasks(data?.special_tasks);
            setLeagues(data?.leagues);
            setRefs(data?.referral);
          } else if (topic === "task pending") {
            setTaskClickAnswer(data);
          } else if (topic === "referral") {
            /***referral page */
            setMyRefs(data);
          } else if (topic === "tap") {
            setCurrentEnergy(data?.energy);
            setUserBalance(data?.balance);
            setUserTotalAmount(data?.amount);
          }
        }
      } catch (error) {
        console.error("Failed to decode JSON:", error);
      }
    },
    onError: (event) => console.error("WebSocket error:", event),
    // todo: onclose
    onClose: () => console.log("WebSocket connection closed"),
    shouldReconnect: (closeEvent) => true, // Automatically reconnect on disconnection
  });

  // useEffect(() => {
  //   if (lastJsonMessage !== null) {
  // setMessageHistory((prev) => prev.concat(lastJsonMessage));
  // }
  // console.log("lastMessage1121", lastJsonMessage);
  // let data12 = lastMessage?.data
  // data12 = JSON.parse(data12)
  // console.log(data12)
  // console.log('lastMessage',JSON.parse(lastMessage?.data));
  // }, [lastJsonMessage]);

  // const handleClickSendMessage = useCallback(
  //   () =>
  //     sendMessage(JSON.stringify({ topic: "upgrade", power: "energy limit" })),
  //   []
  // );

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

  useEffect(() => {
    console.log(currentEnergy);

    setInterval(() => {
      if (currentEnergy < maxEnergyLimit) {
        setCurrentEnergy((prevState) => {
          if (prevState + Number(energyFillSpeed) < maxEnergyLimit) {
            return prevState + Number(energyFillSpeed);
          } else {
            return maxEnergyLimit;
          }
        });
      }
    }, 1000);
  }, [maxEnergyLimit, energyFillSpeed]);

  return (
    <WebAppProvider options={{ smoothButtonsTransition }}>
      {/* <button onClick={handleClickSendMessage}>
        Click Me to change Socket Url
      </button> */}
      <BrowserRouter>
        {/* <SocketProvider socket={socket}> */}
        <Routes>
          <Route path="/" element={<Navigate to="/tap" replace />} />
          <Route
            path="/tap"
            element={
              <TapPage
                loading={loading}
                sendMessage={sendMessage}
                userBalance={userBalance}
                guru={guru}
                autoBot={autoBot}
                user_trophy={userTrophy}
                userLevel={userLevel}
                maxEnergyLimit={maxEnergyLimit}
                energyFillSpeed={energyFillSpeed}
                currentEnergy={currentEnergy}
                autoEarning={autoEarning}
                userTotalAmount={userTotalAmount}
              />
            }
          />

          <Route
            path="/stats"
            element={
              <StatsPage
                userBalance={userBalance}
                totalShareBalance={totalShareBalance}
                totalTouches={totalTouches}
                totalPlayers={totalPlayers}
                dailyUsers={dailyUsers}
                onlinePlayers={onlinePlayers}
              />
            }
          />

          <Route
            path="/boost"
            element={
              <BoostPage
                userBalance={userBalance}
                boostMultiScore={boostMultiScore}
                boostMultiLevel={boostMultiLevel}
                boostMultiIsMax={boostMultiIsMax}
                boostEnergyLimitScore={boostEnergyLimitScore}
                boostEnergyLimitLevel={boostEnergyLimitLevel}
                boostEnergyLimitIsMax={boostEnergyLimitIsMax}
                boostRechargingScore={boostRechargingScore}
                boostRechargingLevel={boostRechargingLevel}
                boostRechargingIsMax={boostRechargingIsMax}
                boostBotLevel={boostBotLevel}
                boostBotIsMax={boostBotIsMax}
                boostBotScore={boostBotScore}
                guruLeft={guruLeft}
                tankLeft={TankLeft}
                max_special_boost={max_special_boost}
                next_update={next_update}
                sendMessage={sendMessage}
              />
            }
          />

          <Route
            path="/task"
            element={
              <TaskPage
                userBalance={Number(userBalance)}
                special_tasks={tasks}
                leagues={leagues}
                referral={refs}
                sendMessage={sendMessage}
                taskClickAnswer={taskClickAnswer}
              />
            }
          />
          {/* <Route
              path="/trophy"
              element={
                <TrophyPage
                  socket={socket}
                  user_trophy={userTrophy}
                  userBalance={Number(userBalance)}
                />
              }
            /> */}
          {/* <Route path="/referrals" element={<RefPage socket={socket} />} /> */}
        </Routes>
        {/* </SocketProvider> */}
      </BrowserRouter>
    </WebAppProvider>
  );
};

root.render(<App />);
