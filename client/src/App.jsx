import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Account from "./pages/Account";
import Parents from "./pages/Parents";
import Build from "./pages/Build";
import Games from "./pages/Games";

import "./global.css";
import ScrollToTop from "./components/ScrollToTop";
import EmotionDrawing from "./components/game/draw/EmotionDrawing";
import RoutineGames from "./components/game/MainGame";

import Unauthorized from "./components/Unauthorized";
import Admin from "./pages/Admin";
import RequireAuth from "./components/RequireAuth";

const ROLES = {
  ADMIN: "test@gmail.com",
};

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="build" element={<Build />} />
          <Route path="parents" element={<Parents />} />
          <Route path="unauthorized" element={<Unauthorized />} />

          {/* Games routes */}
          <Route path="games" element={<Games />} />
          <Route path="games/emotions-artist" element={<EmotionDrawing />} />
          <Route path="games/cozy-routines" element={<RoutineGames />} />

          {/* Protected Routes */}
          <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
            <Route path="admin" element={<Admin />} />
          </Route>

          <Route path="account" element={<Account />} />

          {/* Catch-All Route */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
