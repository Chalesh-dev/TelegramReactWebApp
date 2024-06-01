import React, { createContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

const SocketContext = createContext({});

const SocketProvider = ({
  children,
  socket,
}: {
  children: React.ReactNode;
  socket: any;
}) => {
  const location = useLocation();
  const pathname = location.pathname.split("/")[1];

  useEffect(() => {
    if (pathname !== "tap") {
      socket.emit("submit", "");
    }
  }, [pathname]);

  const values = {};

  return (
    <SocketContext.Provider value={values}>{children}</SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };
