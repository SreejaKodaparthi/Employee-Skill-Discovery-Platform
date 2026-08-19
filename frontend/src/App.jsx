import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/ProtectedRoute/Navbar/Navbar";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/Profile/Profile";
import Skills from "./pages/Skills/Skills";
import Resume from "./pages/Resume/Resume";
import Search from "./pages/Search/Search";
import Certifications from "./pages/Certifications/Certifications";
import Analytics from "./pages/Analytics/Analytics";
import Roles from "./pages/Roles/Roles";
import SkillGap from "./pages/SkillGap/SkillGap";
import "./App.css";

export default function App() {
  return <>
    <Navbar />
    <main className="app-shell">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/resume" element={<Resume />} />
          <Route element={<ProtectedRoute roles={["manager","hr","ld"]} />}>
            <Route path="/search" element={<Search />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/roles" element={<Roles />} />
          </Route>
          <Route element={<ProtectedRoute roles={["manager","hr"]} />}>
            <Route path="/skill-gap" element={<SkillGap />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  </>;
}
