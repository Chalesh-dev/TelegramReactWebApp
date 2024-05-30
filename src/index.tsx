import React, { DispatchWithoutAction, FC, useState } from "react";
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
import { Link, Navigate, Route, Routes } from "react-router-dom";
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
// {
  /* <Route
          path="/tap"
          element={<TapPage socket={socket} userId={telegramUserId} />}
        /> */
// }

const App = () => {
  const [smoothButtonsTransition, setSmoothButtonsTransition] = useState(false);

  const [initDataUnsafe] = useInitData();
  const telegramUserId = initDataUnsafe?.user?.id;

  return (
    <WebAppProvider options={{ smoothButtonsTransition }}>
      <Routes>
        <Route path="/" element={<Navigate to="/tap" replace />} />
        <Route
          path="/tap"
          element={<TapPage userId={telegramUserId} />}
        />
      </Routes>
      <Link to={'/tap'} style={{color:'red'}}>Home</Link>

    </WebAppProvider>
  );
};

root.render(<App />);
