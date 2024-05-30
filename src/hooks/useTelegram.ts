import { useContext } from "react";

import { TelegramContext } from "../context/TelegramContext";

export const useTelegram = () => useContext(TelegramContext);