import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./styles/global.css";

import Sidebar  from "./components/Sidebar/Sidebar";
import Home     from "./pages/Home/Home";
import Library  from "./pages/Library/Library";
import Lost     from "./pages/Lost/Lost";
import Courses  from "./pages/Courses/Courses";
import History  from "./pages/History/History";
import Login    from "./pages/Admin/Login";
import Admin    from "./pages/Admin/Admin";

const ROUTE_MAP = {
  home:    "/",
  library: "/biblioteca",
  lost:    "/achados",
  courses: "/cursos",
  history: "/historia",
  admin:   "/admin",
};

export default function App() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(
    sessionStorage.getItem("admin") === "true"
  );

  const handleLogin = () => {
    sessionStorage.setItem("admin", "true");
    setIsAdmin(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin");
    setIsAdmin(false);
    navigate("/");
  };

  const handleNavigate = (id) => {
    navigate(ROUTE_MAP[id] ?? "/");
  };

  if (isAdmin) {
    return <Admin onLogout={handleLogout} />;
  }

  return (
    <div className="app-layout">
      <Sidebar onNavigate={handleNavigate} />
      <main className="app-main">
        <Routes>
          <Route path="/"           element={<Home />}    />
          <Route path="/biblioteca" element={<Library />} />
          <Route path="/achados"    element={<Lost />}    />
          <Route path="/cursos"     element={<Courses />} />
          <Route path="/historia"   element={<History />} />
          <Route path="/admin"      element={<Login onLogin={handleLogin} />} />
          <Route path="*"           element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}