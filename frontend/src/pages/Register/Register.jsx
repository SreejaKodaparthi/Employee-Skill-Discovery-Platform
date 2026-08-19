import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Register() {
  const { register } = useAuth(); const navigate=useNavigate();
  const [form,setForm]=useState({name:"",email:"",password:"",role:"employee"});
  const [error,setError]=useState(""); const [loading,setLoading]=useState(false);
  const submit=async(e)=>{e.preventDefault();setLoading(true);setError("");
    try{await register(form);navigate("/login");}
    catch(err){setError(err.response?.data?.message||"Registration failed.");}
    finally{setLoading(false);}
  };
  return <div className="container-page" style={{maxWidth:650}}>
    <div className="card"><div className="page-head"><h1>Create account</h1><p>Choose the role that matches your platform access.</p></div>
      {error&&<div className="alert alert-danger">{error}</div>}
      <form onSubmit={submit} className="form-grid">
        <div className="field"><label>Full name</label><input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></div>
        <div className="field"><label>Email</label><input type="email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></div>
        <div className="field"><label>Password</label><input type="password" minLength="6" required value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/></div>
        <div className="field"><label>Role</label><select value={form.role} onChange={e=>setForm({...form,role:e.target.value})}><option value="employee">Employee</option><option value="manager">Manager</option><option value="hr">HR</option><option value="ld">L&D</option></select></div>
        <div className="field full"><button className="btn btn-primary" disabled={loading}>{loading?"Creating…":"Create Account"}</button></div>
      </form>
      <p style={{fontSize:14,color:"var(--muted)"}}>Already registered? <Link to="/login">Sign in</Link></p>
    </div>
  </div>;
}
