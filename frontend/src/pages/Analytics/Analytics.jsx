import { useEffect,useState } from "react";
import API from "../../services/api";

export default function Analytics(){
 const [data,setData]=useState(null),[loading,setLoading]=useState(true),[error,setError]=useState("");
 useEffect(()=>{Promise.all([API.get("/analytics/summary"),API.get("/analytics/top-skills?limit=10"),API.get("/analytics/departments"),API.get("/analytics/certifications?limit=10"),API.get("/analytics/resume-stats")]).then(([a,b,c,d,e])=>setData({summary:a.data.summary,skills:b.data.data||[],departments:c.data.data||[],certs:d.data, resume:e.data})).catch(e=>setError(e.response?.data?.message||"Analytics could not be loaded.")).finally(()=>setLoading(false))},[]);
 if(loading)return <div className="page-loader">Loading analytics…</div>;
 return <div className="container-page"><div className="page-head"><h1>Organisation Analytics</h1><p>Live data from the analytics endpoints in your backend.</p></div>{error&&<div className="alert alert-danger">{error}</div>}{data&&<>
 <div className="grid grid-4">{Object.entries(data.summary).slice(0,8).map(([k,v])=><div className="card metric" key={k}><div className="label">{k.replace(/([A-Z])/g," $1")}</div><div className="value">{v}</div></div>)}</div>
 <div className="grid grid-2" style={{marginTop:20}}><div className="card table-wrap"><h2>Top skills</h2><table className="data-table"><thead><tr><th>Skill</th><th>Employees</th><th>Avg exp.</th></tr></thead><tbody>{data.skills.map(x=><tr key={x.skillName}><td>{x.skillName}</td><td>{x.employeeCount}</td><td>{x.averageExperience}</td></tr>)}</tbody></table></div>
 <div className="card table-wrap"><h2>Departments</h2><table className="data-table"><thead><tr><th>Department</th><th>Employees</th><th>Unique skills</th></tr></thead><tbody>{data.departments.map(x=><tr key={x.department}><td>{x.department}</td><td>{x.employeeCount}</td><td>{x.uniqueSkills}</td></tr>)}</tbody></table></div></div>
 <div className="grid grid-2" style={{marginTop:20}}><div className="card"><h2>Certification overview</h2><div className="grid grid-2">{Object.entries(data.certs.summary||{}).map(([k,v])=><div className="metric" key={k}><div className="label">{k.replace(/([A-Z])/g," $1")}</div><div className="value" style={{fontSize:24}}>{v}</div></div>)}</div></div><div className="card"><h2>Resume coverage</h2>{Object.entries(data.resume).filter(([k])=>typeof data.resume[k]!=="object").map(([k,v])=><div className="hero-stat" key={k}><span>{k.replace(/([A-Z])/g," $1")}</span><strong>{String(v)}</strong></div>)}</div></div>
 </>}</div>;
}
