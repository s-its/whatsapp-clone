import { useLocalStorage } from "@mantine/hooks";
import React, { createContext, useContext, useMemo } from "react";
import io from "socket.io-client";

const SocketContext = createContext();

const GetSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
  const [user] = useLocalStorage({
    key: "userData",
    defaultValue: {},
  });
  console.log(user?.token, "user");

  const socket = useMemo(() => {
    if (user?.token) {
      return io(process.env.REACT_APP_BACKEND_URL, { auth: { token: user?.token } });
    }
  }, [user?.token]);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketProvider, GetSocket };