// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";

// export default function Register() {
//   const { register } = useAuth(); const navigate=useNavigate();
//   const [form,setForm]=useState({name:"",email:"",password:"",role:"employee"});
//   const [error,setError]=useState(""); const [loading,setLoading]=useState(false);
//   const submit=async(e)=>{e.preventDefault();setLoading(true);setError("");
//     try{await register(form);navigate("/login");}
//     catch(err){setError(err.response?.data?.message||"Registration failed.");}
//     finally{setLoading(false);}
//   };
// <<<<<<< HEAD

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const res = await API.post("/auth/register", formData);
//       alert(res.data.message || "Registration successful!");
//       navigate("/login");
//     } catch (err) {
//       setError(err.response?.data?.message || "Registration Failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="register-container">
//       <div className="register-card">
//         <h2>🚀 Get Started</h2>
//         <p className="subtitle">Create your account to begin</p>

//         {error && (
//           <div className="alert alert-danger" style={{ borderRadius: "12px", fontSize: "14px" }}>
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="name"
//             placeholder="👤 Full Name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
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
//             placeholder="🔒 Password (min 6 characters)"
//             value={formData.password}
//             onChange={handleChange}
//             required
//             minLength="6"
//           />
//           {/* <select name="role" value={formData.role} onChange={handleChange}>
//             <option value="employee">👔 Employee</option>
//             <option value="manager">📊 Manager</option>
//             <option value="hr">🏢 HR</option>
//             <option value="ld">📚 L&D</option>
//           </select> */}
//           <button type="submit" className="btn-success" disabled={loading}>
//             {loading ? "Creating Account..." : "Create Account"}
//           </button>
//         </form>

//         <div className="link-text">
//           Already have an account? <Link to="/login">Sign in</Link>
//         </div>
//       </div>
// =======
//   return <div className="container-page" style={{maxWidth:650}}>
//     <div className="card"><div className="page-head"><h1>Create account</h1><p>Choose the role that matches your platform access.</p></div>
//       {error&&<div className="alert alert-danger">{error}</div>}
//       <form onSubmit={submit} className="form-grid">
//         <div className="field"><label>Full name</label><input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></div>
//         <div className="field"><label>Email</label><input type="email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></div>
//         <div className="field"><label>Password</label><input type="password" minLength="6" required value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/></div>
//         <div className="field"><label>Role</label><select value={form.role} onChange={e=>setForm({...form,role:e.target.value})}><option value="employee">Employee</option><option value="manager">Manager</option><option value="hr">HR</option><option value="ld">L&D</option></select></div>
//         <div className="field full"><button className="btn btn-primary" disabled={loading}>{loading?"Creating…":"Create Account"}</button></div>
//       </form>
//       <p style={{fontSize:14,color:"var(--muted)"}}>Already registered? <Link to="/login">Sign in</Link></p>
// >>>>>>> c6f86c44d5302f3574bf087aaff748500c9fdaca
//     </div>
//   </div>;
// }

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
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
      await register({
        ...form,
        role: "employee",
      });

      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container-page"
      style={{ maxWidth: 650 }}
    >
      <div className="card">

        <div className="page-head">
          <h1>Create account</h1>

          <p>
            Create your SkillDiscovery account
            to get started.
          </p>
        </div>

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        <form
          onSubmit={submit}
          className="form-grid"
        >

          <div className="field">
            <label>Full Name</label>

            <input
              type="text"
              required
              placeholder="Enter your full name"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
            />
          </div>

          <div className="field">
            <label>Email</label>

            <input
              type="email"
              required
              placeholder="Enter your email"
              value={form.email}
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
              minLength="6"
              required
              placeholder="Minimum 6 characters"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
            />
          </div>

          {/* Role is intentionally NOT selectable.
              New users are registered as employees.
              HR can assign/change roles later. */}

          <div className="field full">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading
                ? "Creating..."
                : "Create Account"}
            </button>
          </div>

        </form>

        <p
          style={{  
            fontSize: 14,
            color: "var(--muted)",
          }}
        >
          Already registered?{" "}
          <Link to="/login">
            Sign in
          </Link>
        </p>

      </div>
    </div>
  );
}