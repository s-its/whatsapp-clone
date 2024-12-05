import React, {lazy, Suspense} from "react";
import {Route, Routes} from "react-router-dom";
import {Toaster} from "sonner";
import {SocketProvider} from "./uitls/SocketProvider";
import ProtectedRoute from "./auth/ProtectedRoute";
import {useLocalStorage} from "@mantine/hooks";

const Login = lazy(() => import("./components/Login"));
const Register = lazy(() => import("./components/Register"));
const Home = lazy(() => import("./components/Home"));
const UserDetails = lazy(() => import("./components/UserDetails"));
function App() {
  const [user] = useLocalStorage({
    key: "userDate",
    defaultValue: {}
  })
  return (
    <div className="App">
      <Toaster/>
      <Suspense fallback={<div>Loading</div>}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            element={
            <SocketProvider>
              <ProtectedRoute user={user} />
            </SocketProvider>
            }>
            <Route path="/" element={<Home />} />
            <Route path="/:userId" element={<UserDetails />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
