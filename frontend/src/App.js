import React, {lazy, Suspense} from "react";
import {Route, Routes} from "react-router-dom";
import {Toaster} from "sonner";

const Login = lazy(() => import("./components/Login"))
const Register = lazy(() => import("./components/Register"))
function App() {
  return (
    <div className="App">
      <Toaster/>
      <Suspense fallback={<div>Loading</div>}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
