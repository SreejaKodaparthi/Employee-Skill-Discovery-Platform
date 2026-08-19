import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import API from "../../services/api";

export default function Dashboard(){
  const {user}=useAuth(); const [summary,setSummary]=useState(null); const [error,setError]=useState("");
  const management=["manager","hr","ld"].includes(user?.role);
  useEffect(()=>{if(management) API.get("/analytics/summary").then(r=>setSummary(r.data.summary)).catch(()=>{});},[management]);
  const cards=[
    ["👤","My Profile","Update department, education and career interests.","/profile"],
    ["⚡","My Skills","Manage skills, proficiency and experience.","/skills"],
    ["🏅","Certifications","Maintain your professional credentials.","/certifications"],
    ["📄","Resume Parser","Extract resume data and save it to your profile.","/resume"],
  ];
  if(management) cards.push(["🔎","Talent Search","Find employees with advanced filters.","/search"],["📊","Analytics","View organisation skill and resume metrics.","/analytics"],["🎯","Role Requirements","Define target skills for roles.","/roles"]);
  return <div className="container-page">
    <div className="page-head"><span className="badge">{user?.role?.toUpperCase()}</span><h1>Welcome, {user?.name}</h1><p>Your connected employee skill workspace.</p></div>
    {management&&summary&&<div className="grid grid-4" style={{marginBottom:20}}>{[
      ["Employees",summary.totalEmployees],["Skills",summary.totalSkills],["Unique skills",summary.uniqueSkills],["Certifications",summary.totalCertifications]
    ].map(([l,v])=><div className="card metric" key={l}><div className="label">{l}</div><div className="value">{v}</div></div>)}</div>}
    {error&&<div className="alert alert-danger">{error}</div>}
    <div className="grid grid-3">{cards.map(([icon,title,text,to])=><Link to={to} className="card" style={{textDecoration:"none"}} key={title}><div style={{fontSize:30}}>{icon}</div><h3>{title}</h3><p style={{color:"var(--muted)",fontSize:14}}>{text}</p></Link>)}</div>
  </div>;
}
