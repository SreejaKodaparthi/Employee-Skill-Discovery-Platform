import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return <header className="navbar"><NavLink className="brand" to="/">Skill<span>Discovery</span></NavLink>
      <nav><NavLink to="/login">Login</NavLink><NavLink className="nav-cta" to="/register">Register</NavLink></nav>
    </header>;
  }

  const management = ["manager", "hr", "ld"].includes(user?.role);
  return <header className="navbar">
    <NavLink className="brand" to="/dashboard">Skill<span>Discovery</span></NavLink>
    <nav className="nav-links">
      <NavLink to="/dashboard">Dashboard</NavLink>
      <NavLink to="/profile">Profile</NavLink>
      <NavLink to="/skills">Skills</NavLink>
      <NavLink to="/certifications">Certifications</NavLink>
      <NavLink to="/resume">Resume</NavLink>
      {management && <NavLink to="/search">Talent Search</NavLink>}
      {management && <NavLink to="/analytics">Analytics</NavLink>}
      {management && <NavLink to="/roles">Roles</NavLink>}
    </nav>
    <div className="nav-user"><span>{user?.name}</span><button onClick={() => { logout(); navigate("/"); }}>Logout</button></div>
  </header>;
}
