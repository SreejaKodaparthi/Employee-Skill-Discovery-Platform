// <<<<<<< HEAD
// import { Routes, Route } from "react-router-dom";

// =======
// import { Navigate, Route, Routes } from "react-router-dom";
// import Navbar from "./components/ProtectedRoute/Navbar/Navbar";
// import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
// >>>>>>> c6f86c44d5302f3574bf087aaff748500c9fdaca
// import Home from "./pages/Home/Home";
// import Login from "./pages/Login/Login";
// import Register from "./pages/Register/Register";
// import Dashboard from "./pages/Dashboard/Dashboard";
// import Profile from "./pages/Profile/Profile";
// import Skills from "./pages/Skills/Skills";
// import Resume from "./pages/Resume/Resume";
// <<<<<<< HEAD
// import SkillGap from "./pages/SkillGap/SkillGap";

// import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
// import ResetPassword from "./pages/ResetPassword/ResetPassword";
// import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute/ProtectedRoute.jsx";

// function App() {
//   return (
//     <Routes>

//       {/* ================= PUBLIC ROUTES ================= */}

//       <Route
//         path="/"
//         element={<Home />}
//       />

//       <Route
//         path="/login"
//         element={<Login />}
//       />

//       <Route
//         path="/register"
//         element={<Register />}
//       />

//       {/* Forgot Password */}
//       <Route
//         path="/forgot-password"
//         element={<ForgotPassword />}
//       />

//       {/* Reset Password */}
//       <Route
//         path="/reset-password/:token"
//         element={<ResetPassword />}
//       />


//       {/* ================= PROTECTED ROUTES ================= */}

//       <Route
//         path="/dashboard"
//         element={
//           <ProtectedRoute>
//             <Dashboard />
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/profile"
//         element={
//           <ProtectedRoute>
//             <Profile />
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/skills"
//         element={
//           <ProtectedRoute>
//             <Skills />
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/search"
//         element={
//           <ProtectedRoute>
//             <Search />
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/resume"
//         element={
//           <ProtectedRoute>
//             <Resume />
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/skill-gap"
//         element={
//           <ProtectedRoute>
//             <SkillGap />
//           </ProtectedRoute>
//         }
//       />


//       {/* ================= 404 ROUTE ================= */}

//       <Route
//         path="*"
//         element={
//           <h2
//             style={{
//               textAlign: "center",
//               marginTop: "50px",
//             }}
//           >
//             404 Page Not Found
//           </h2>
//         }
//       />

//     </Routes>
//   );
// =======
// import Search from "./pages/Search/Search";
// import Certifications from "./pages/Certifications/Certifications";
// import Analytics from "./pages/Analytics/Analytics";
// import Roles from "./pages/Roles/Roles";
// import SkillGap from "./pages/SkillGap/SkillGap";
// import "./App.css";

// export default function App() {
//   return <>
//     <Navbar />
//     <main className="app-shell">
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route element={<ProtectedRoute />}>
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/skills" element={<Skills />} />
//           <Route path="/certifications" element={<Certifications />} />
//           <Route path="/resume" element={<Resume />} />
//           <Route element={<ProtectedRoute roles={["manager","hr","ld"]} />}>
//             <Route path="/search" element={<Search />} />
//             <Route path="/analytics" element={<Analytics />} />
//             <Route path="/roles" element={<Roles />} />
//           </Route>
//           <Route element={<ProtectedRoute roles={["manager","hr"]} />}>
//             <Route path="/skill-gap" element={<SkillGap />} />
//           </Route>
//         </Route>
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </main>
//   </>;
// >>>>>>> c6f86c44d5302f3574bf087aaff748500c9fdaca
// }

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
import SkillGap from "./pages/SkillGap/SkillGap";

import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";

import Certifications from "./pages/Certifications/Certifications";
import Analytics from "./pages/Analytics/Analytics";
import Roles from "./pages/Roles/Roles";

import UserManagement from "./pages/UserManagement/UserManagement";

import "./App.css";

function App() {
  return (
    <>
      <Navbar />

      <main className="app-shell">
        <Routes>

          {/* ================= PUBLIC ROUTES ================= */}

          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />

          <Route
            path="/reset-password/:token"
            element={<ResetPassword />}
          />


          {/* ================= PROTECTED ROUTES ================= */}

          <Route element={<ProtectedRoute />}>

            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            <Route
              path="/profile"
              element={<Profile />}
            />

            <Route
              path="/skills"
              element={<Skills />}
            />

            <Route
              path="/resume"
              element={<Resume />}
            />

            <Route
              path="/certifications"
              element={<Certifications />}
            />
            <Route element={<ProtectedRoute roles={["hr"]} />}>
  <Route
    path="/user-management"
    element={<UserManagement />}
  />
</Route>


            {/* ================= MANAGEMENT ROUTES ================= */}

            <Route
              element={
                <ProtectedRoute
                  roles={["manager", "hr", "ld"]}
                />
              }
            >

              <Route
                path="/search"
                element={<Search />}
              />

              <Route
                path="/analytics"
                element={<Analytics />}
              />

              <Route
                path="/roles"
                element={<Roles />}
              />

            </Route>


            {/* ================= SKILL GAP ================= */}

            {/* <Route
              element={
                <ProtectedRoute
                  roles={["manager", "hr", "emp"]}
                />
              }
            > */}

              <Route
                path="/skill-gap"
                element={<SkillGap />}
              />

            </Route>

          {/* </Route> */}


          {/* ================= 404 ================= */}

          <Route
            path="*"
            element={
              <Navigate
                to="/"
                replace
              />
            }
          />

        </Routes>
      </main>
    </>
  );
}

export default App;