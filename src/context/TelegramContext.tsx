import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useInitData } from "@vkruglikov/react-telegram-web-app";

const initialState = {
  loading: false,
  user: null,
  balance: 0,
  getUserInfo: () => Promise.resolve(),
  getBalance: () => Promise.resolve(),
};

/**PATH */
const user_balance_path =
  process.env.REACT_APP_URL + "api/landing/info-t_balance";
const user_info_path = process.env.REACT_APP_URL + "api/auth/login-register/";
const user_trophy_path = process.env.REACT_APP_URL + "api/landing/info-trophy";
/**PATH */

const TelegramContext = createContext({});

const TelegramProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(initialState.user);
  const [loading, setLoading] = useState(initialState.loading);
  const [rootLoading, setRootLoading] = useState(initialState.loading);
  const [balance, setBalance] = useState(Number(initialState.balance));
  const [trophy, setTrophy] = useState(null);
  const [loadingTrophy, setLoadingTrophy] = useState(initialState.loading);
  const [teleAccountInfo, setTeleAccountInfo] = useState([]);
  const location = useLocation();
  const [initDataUnsafe] = useInitData();

  const value = {};

  return (
    <TelegramContext.Provider value={value}>
        <p style={{ color: "red" }}>{initDataUnsafe?.user?.id}</p>
      {/* {children} */}
    </TelegramContext.Provider>
  );
};

export { TelegramContext, TelegramProvider };
