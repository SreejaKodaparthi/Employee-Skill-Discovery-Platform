// import { useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";

// export default function Login() {
//   const { login } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [form,setForm]=useState({email:"",password:""});
//   const [error,setError]=useState("");
//   const [loading,setLoading]=useState(false);

//   const submit=async(e)=>{
//     e.preventDefault(); setLoading(true); setError("");
//     try {
//       await login(form.email.trim(),form.password);
//       navigate(location.state?.from || "/dashboard",{replace:true});
//     } catch(err) { setError(err.response?.data?.message || "Login failed."); }
//     finally{setLoading(false);}
//   };
// <<<<<<< HEAD

//   return (
//     <div className="login-container">
//       <div className="login-card">
//         <h2>✨ SkillDiscovery</h2>
//         <p className="subtitle">Welcome back! Sign in to continue</p>

//         {error && (
//           <div className="alert alert-danger" style={{ borderRadius: "12px", fontSize: "14px" }}>
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit}>
//           <input
//             type="email"
//             name="email"
//             placeholder="📧 Email Address"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="🔒 Password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />

//           <div className="forgot-password">
//             <Link to="/forgot-password">
//               Forgot Password?
//             </Link>
//           </div>

//           <button type="submit" className="btn-primary" disabled={loading}>
//             {loading ? "Logging in..." : "Sign In"}
//           </button>
//         </form>

//         <div className="link-text">
//           Don't have an account? <Link to="/register">Create one</Link>
//         </div>

//         <div className="demo-info">
//           <strong>Demo Credentials:</strong><br />
//           <code>employee@example.com</code> / <code>password123</code>
//         </div>

//       </div>
// =======
//   return <div className="container-page" style={{maxWidth:520}}>
//     <div className="card">
//       <div className="page-head"><h1>Welcome back</h1><p>Sign in to your SkillDiscovery account.</p></div>
//       {error&&<div className="alert alert-danger">{error}</div>}
//       <form onSubmit={submit} className="grid">
//         <div className="field"><label>Email</label><input type="email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></div>
//         <div className="field"><label>Password</label><input type="password" required value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/></div>
//         <button className="btn btn-primary" disabled={loading}>{loading?"Signing in…":"Sign In"}</button>
//       </form>
//       <p style={{color:"var(--muted)",fontSize:14}}>New here? <Link to="/register">Create an account</Link></p>
// >>>>>>> c6f86c44d5302f3574bf087aaff748500c9fdaca
//     </div>
//   </div>;
// }


// ///////////////////////////////////////////////////////////////////////////////////////

import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await login(
        form.email.trim(),
        form.password
      );

      navigate(
        location.state?.from || "/dashboard",
        { replace: true }
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container-page"
      style={{ maxWidth: 520 }}
    >
      <div className="card">

        <div className="page-head">
          <h1>Welcome back</h1>
          <p>
            Sign in to your SkillDiscovery account.
          </p>
        </div>

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        <form onSubmit={submit} className="grid">

          <div className="field">
            <label>Email</label>

            <input
              type="email"
              required
              value={form.email}
              placeholder="Enter your email"
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
            />
          </div>

          <div className="field">
            <label>Password</label>

            <input
              type="password"
              required
              value={form.password}
              placeholder="Enter your password"
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
            />
          </div>

          {/* Old functionality - Forgot Password */}
          {/* <div>
            <Link to="/forgot-password">
              Forgot Password?
            </Link>
          </div> */}
<div style={{ marginBottom: "10px" }}>
  <Link
    to="/forgot-password"
    style={{
      color: "#7c3aed",
      fontWeight: "600",
      textDecoration: "none",
      cursor: "pointer",
    }}
  >
    Forgot Password?
  </Link>
</div>
          <button
            className="btn btn-primary"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Signing in..."
              : "Sign In"}
          </button>

        </form>

        <p
          style={{
            color: "var(--muted)",
            fontSize: 14,
          }}
        >
          New here?{" "}
          <Link to="/register">
            Create an account
          </Link>
        </p>

      </div>
    </div>
  );
}
