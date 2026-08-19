import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form,setForm]=useState({email:"",password:""});
  const [error,setError]=useState("");
  const [loading,setLoading]=useState(false);

  const submit=async(e)=>{
    e.preventDefault(); setLoading(true); setError("");
    try {
      await login(form.email.trim(),form.password);
      navigate(location.state?.from || "/dashboard",{replace:true});
    } catch(err) { setError(err.response?.data?.message || "Login failed."); }
    finally{setLoading(false);}
  };
  return <div className="container-page" style={{maxWidth:520}}>
    <div className="card">
      <div className="page-head"><h1>Welcome back</h1><p>Sign in to your SkillDiscovery account.</p></div>
      {error&&<div className="alert alert-danger">{error}</div>}
      <form onSubmit={submit} className="grid">
        <div className="field"><label>Email</label><input type="email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></div>
        <div className="field"><label>Password</label><input type="password" required value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/></div>
        <button className="btn btn-primary" disabled={loading}>{loading?"Signing in…":"Sign In"}</button>
      </form>
      <p style={{color:"var(--muted)",fontSize:14}}>New here? <Link to="/register">Create an account</Link></p>
    </div>
  </div>;
}
