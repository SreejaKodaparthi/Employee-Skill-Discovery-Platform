// import { useEffect,useState } from "react";
// import { Link } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import API from "../../services/api";

// <<<<<<< HEAD
// function Dashboard() {
//   const navigate = useNavigate();
//   const { logout } = useAuth();
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     getUser();
//   }, []);

//   const getUser = async () => {
//     try {
//       const res = await API.get("/auth/me");
//       console.log("Logged in user:", res.data.user);
//       setUser(res.data.user);
      
//     } catch (err) {
//       console.error("Failed to fetch user:", err);
//       logout();
//       navigate("/login");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = () => {
//     logout();
//     navigate("/");
//   };

//   if (loading) {
//     return (
//       <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
//         <div className="spinner-border text-primary" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//   <div className="dashboard">
//     <div className="dashboard-header">
//       <h2>✨ Skill Discovery Platform</h2>
//     </div>

//     {user && (
//       <div className="profile-card">
//         <h3>👋 Welcome, {user.name}!</h3>
//         <p><strong>📧 Email:</strong> {user.email}</p>
//         <p>
//           <strong>🎯 Role:</strong>{" "}
//           <span className="badge-role">
//             {user.role.toUpperCase()}
//           </span>
//         </p>
//       </div>
//     )}

//     <div className="dashboard-cards">

//       {/* Everyone */}
//       <div className="card-box" onClick={() => navigate("/profile")}>
//         <span className="icon">👤</span>
//         <h3>My Profile</h3>
//         <p>Create or update your profile</p>
//       </div>

//       {/* Everyone */}
//       <div className="card-box" onClick={() => navigate("/skills")}>
//         <span className="icon">⚡</span>
//         <h3>My Skills</h3>
//         <p>Manage your skills</p>
//       </div>

//       {/* Everyone */}
//       <div className="card-box" onClick={() => navigate("/resume")}>
//         <span className="icon">📄</span>
//         <h3>Resume Parser</h3>
//         <p>Upload and parse your resume</p>
//       </div>
//       {/* Everyone */}
// <div className="card-box" onClick={() => navigate("/skill-gap")}>
//   <span className="icon">📊</span>
//   <h3>Skill Gap Analysis</h3>
//   <p>Analyze your skills against a target role</p>
// </div>

//       {/* Only Manager, HR and L&D */}
//       {["manager", "hr", "ld"].includes(user?.role) && (
//         <div className="card-box" onClick={() => navigate("/search")}>
//           <span className="icon">🔍</span>
//           <h3>Search Employees</h3>
//           <p>Discover talent by skill</p>
//         </div>
//       )}

//     </div>
//   </div>
// );
// =======
// export default function Dashboard(){
//   const {user}=useAuth(); const [summary,setSummary]=useState(null); const [error,setError]=useState("");
//   const management=["manager","hr","ld"].includes(user?.role);
//   useEffect(()=>{if(management) API.get("/analytics/summary").then(r=>setSummary(r.data.summary)).catch(()=>{});},[management]);
//   const cards=[
//     ["👤","My Profile","Update department, education and career interests.","/profile"],
//     ["⚡","My Skills","Manage skills, proficiency and experience.","/skills"],
//     ["🏅","Certifications","Maintain your professional credentials.","/certifications"],
//     ["📄","Resume Parser","Extract resume data and save it to your profile.","/resume"],
//   ];
//   if(management) cards.push(["🔎","Talent Search","Find employees with advanced filters.","/search"],["📊","Analytics","View organisation skill and resume metrics.","/analytics"],["🎯","Role Requirements","Define target skills for roles.","/roles"]);
//   return <div className="container-page">
//     <div className="page-head"><span className="badge">{user?.role?.toUpperCase()}</span><h1>Welcome, {user?.name}</h1><p>Your connected employee skill workspace.</p></div>
//     {management&&summary&&<div className="grid grid-4" style={{marginBottom:20}}>{[
//       ["Employees",summary.totalEmployees],["Skills",summary.totalSkills],["Unique skills",summary.uniqueSkills],["Certifications",summary.totalCertifications]
//     ].map(([l,v])=><div className="card metric" key={l}><div className="label">{l}</div><div className="value">{v}</div></div>)}</div>}
//     {error&&<div className="alert alert-danger">{error}</div>}
//     <div className="grid grid-3">{cards.map(([icon,title,text,to])=><Link to={to} className="card" style={{textDecoration:"none"}} key={title}><div style={{fontSize:30}}>{icon}</div><h3>{title}</h3><p style={{color:"var(--muted)",fontSize:14}}>{text}</p></Link>)}</div>
//   </div>;
// >>>>>>> c6f86c44d5302f3574bf087aaff748500c9fdaca
// }

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import API from "../../services/api";

export default function Dashboard() {
  const { user: authUser, logout } = useAuth();
  const navigate = useNavigate();

  const [user, setUser] = useState(authUser || null);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const management = ["manager", "hr", "ld"].includes(
    authUser?.role
  );

  // Keep old user-fetching/authentication handling
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await API.get("/auth/me");
        console.log("Logged in user:", res.data.user);
        setUser(res.data.user);
      } catch (err) {
        console.error("Failed to fetch user:", err);
        logout();
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [logout, navigate]);

  // New analytics functionality
  useEffect(() => {
    if (management) {
      API.get("/analytics/summary")
        .then((res) => {
          setSummary(res.data.summary);
        })
        .catch((err) => {
          console.error("Failed to load analytics:", err);
          setError("Unable to load dashboard analytics.");
        });
    }
  }, [management]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  const cards = [
    [
      "👤",
      "My Profile",
      "Update department, education and career interests.",
      "/profile",
    ],
    [
      "⚡",
      "My Skills",
      "Manage skills, proficiency and experience.",
      "/skills",
    ],
    [
      "🏅",
      "Certifications",
      "Maintain your professional credentials.",
      "/certifications",
    ],
    [
      "📄",
      "Resume Parser",
      "Extract resume data and save it to your profile.",
      "/resume",
    ],
    [
      "📊",
      "Skill Gap Analysis",
      "Analyze your skills against a target role.",
      "/skill-gap",
    ],
  ];
  if (user?.role === "hr") {
  cards.push([
    "👥",
    "User Management",
    "View users and assign their roles.",
    "/user-management",
  ]);
}

  // Management-only features
  if (management) {
    cards.push(
      [
        "🔎",
        "Talent Search",
        "Find employees with advanced filters.",
        "/search",
      ],
      [
        "📊",
        "Analytics",
        "View organisation skill and resume metrics.",
        "/analytics",
      ],
      [
        "🎯",
        "Role Requirements",
        "Define target skills for roles.",
        "/roles",
      ]
    );
  }

  return (
    <div className="container-page">

      {/* New UI header */}
      <div className="page-head">
        <span className="badge">
          {user?.role?.toUpperCase()}
        </span>

        <h1>Welcome, {user?.name}</h1>

        <p>
          Your connected employee skill workspace.
        </p>
      </div>

      {/* Keep old user information */}
      {user && (
        <div
          className="card"
          style={{ marginBottom: 20 }}
        >
          <p>
            <strong>📧 Email:</strong> {user.email}
          </p>

          <p style={{ marginBottom: 0 }}>
            <strong>🎯 Role:</strong>{" "}
            {user.role?.toUpperCase()}
          </p>
        </div>
      )}

      {/* New analytics UI */}
      {management && summary && (
        <div
          className="grid grid-4"
          style={{ marginBottom: 20 }}
        >
          {[
            ["Employees", summary.totalEmployees],
            ["Skills", summary.totalSkills],
            ["Unique skills", summary.uniqueSkills],
            [
              "Certifications",
              summary.totalCertifications,
            ],
          ].map(([label, value]) => (
            <div className="card metric" key={label}>
              <div className="label">{label}</div>
              <div className="value">{value}</div>
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {/* New UI cards */}
      <div className="grid grid-3">
        {cards.map(([icon, title, text, to]) => (
          <Link
            to={to}
            className="card"
            style={{
              textDecoration: "none",
            }}
            key={title}
          >
            <div style={{ fontSize: 30 }}>
              {icon}
            </div>

            <h3>{title}</h3>

            <p
              style={{
                color: "var(--muted)",
                fontSize: 14,
              }}
            >
              {text}
            </p>
          </Link>
        ))}
      </div>

      {/* Keep old logout handling */}
      <button
        onClick={handleLogout}
        className="btn btn-primary"
        style={{ marginTop: 20 }}
      >
        Logout
      </button>

    </div>
  );
}