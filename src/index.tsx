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
import ExpandDemo from "./ExpandDemo";
import useBetaVersion from "./useBetaVersion";
import { useInitData } from "@vkruglikov/react-telegram-web-app";
import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import TapPage from "./pages/TapPage";
import { io } from "socket.io-client";
// import socketIO from "socket.io-client";

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
// const socket = io("https://socket.spxswap.com");
const socket = "frrfr";

const App = () => {
  const [smoothButtonsTransition, setSmoothButtonsTransition] = useState(false);
  const [rootLoading, setRootLoading] = useState(false);
  const userInfo = useRef(null);
  const [initDataUnsafe] = useInitData();
  const telegramUserId = initDataUnsafe?.user?.id;

  const getUserInfo = async () => {
    const path_url = process.env.REACT_APP_URL + "api/auth/login-register/";
    console.log(path_url);
    try {
      const response = await fetch(path_url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "info-user": telegramUserId,
        },
      });
      const user = await response.json();
      userInfo.current = user;
      // setUser(userInfo);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, [telegramUserId]);

  return (
    <WebAppProvider options={{ smoothButtonsTransition }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/tap" replace />} />
          <Route
            path="/tap"
            element={
              <TapPage
                socket={socket}
                userId={telegramUserId}
                user={userInfo.current}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </WebAppProvider>
  );
};

root.render(<App />);
