import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const blank={skills:"",matchMode:"any",department:"",designation:"",location:"",education:"",certification:"",minExperience:"",maxExperience:"",minProficiency:"",page:1,limit:10};
export default function Search(){
 const {user}=useAuth();const [filters,setFilters]=useState(blank),[results,setResults]=useState([]),[meta,setMeta]=useState({}),[loading,setLoading]=useState(false),[error,setError]=useState("");
 const search=async(page=1)=>{setLoading(true);setError("");try{const params={...filters,page};Object.keys(params).forEach(k=>{if(params[k]==="")delete params[k]});const r=await API.get("/search/advanced",{params});setResults(r.data.results||[]);setMeta(r.data)}catch(e){setResults([]);setError(e.response?.data?.message||"Search failed.")}finally{setLoading(false)}};
 return <div className="container-page"><div className="page-head"><h1>Advanced Employee Search</h1><p>Available to Managers, HR and L&D. Results include match and trust scores.</p></div>{error&&<div className="alert alert-danger">{error}</div>}
 <div className="card" style={{marginBottom:20}}><form onSubmit={e=>{e.preventDefault();search(1)}} className="form-grid">
 {["skills","department","designation","location","education","certification"].map(k=><div className="field" key={k}><label>{k[0].toUpperCase()+k.slice(1)}</label><input placeholder={k==="skills"?"React, Java, Python":""} value={filters[k]} onChange={e=>setFilters({...filters,[k]:e.target.value})}/></div>)}
 <div className="field"><label>Min experience</label><input type="number" min="0" value={filters.minExperience} onChange={e=>setFilters({...filters,minExperience:e.target.value})}/></div>
 <div className="field"><label>Max experience</label><input type="number" min="0" value={filters.maxExperience} onChange={e=>setFilters({...filters,maxExperience:e.target.value})}/></div>
 <div className="field"><label>Minimum proficiency</label><select value={filters.minProficiency} onChange={e=>setFilters({...filters,minProficiency:e.target.value})}><option value="">Any</option>{["beginner","intermediate","advanced","expert"].map(x=><option key={x}>{x}</option>)}</select></div>
 <div className="field"><label>Skill matching</label><select value={filters.matchMode} onChange={e=>setFilters({...filters,matchMode:e.target.value})}><option value="any">Any requested skill</option><option value="all">All requested skills</option></select></div>
 <div className="field full"><button className="btn btn-primary" disabled={loading}>{loading?"Searching…":"Search Employees"}</button></div>
 </form></div>
 {results.length===0&&!loading?<div className="card">No matching employees. Add at least one filter and search again.</div>:<div className="grid">{results.map(x=><div className="card" key={x.employee?._id}>
 <div style={{display:"flex",justifyContent:"space-between",gap:10}}><div><h3 style={{margin:"0 0 4px"}}>{x.employee?.name}</h3><p style={{margin:0,color:"var(--muted)",fontSize:13}}>{x.employee?.email} · {x.profile?.designation||"Employee"}</p></div><span className="badge">Match {x.matchPercentage??"—"}%</span></div>
 <div className="grid grid-3" style={{marginTop:18}}><div><small>Match score</small><strong style={{display:"block"}}>{x.matchScore}</strong></div><div><small>Trust score</small><strong style={{display:"block"}}>{x.trustScore}/100</strong></div><div><small>Location</small><strong style={{display:"block"}}>{x.profile?.location||"—"}</strong></div></div>
 <p style={{fontWeight:700,marginBottom:7}}>Matched skills</p><div className="chips">{(x.matchedSkills||[]).map(s=><span className="chip" key={s._id}>{s.skillName} · {s.proficiencyLevel}</span>)}</div>
 <p style={{fontWeight:700,marginBottom:7,marginTop:15}}>Certifications</p><div className="chips">{(x.certifications||[]).map(c=><span className="chip" key={c._id}>{c.certificationName}</span>)}</div>
 <div className="actions"><Link className="btn btn-secondary" to={`/skill-gap?employee=${x.employee?._id}`}>Skill Gap</Link></div>
 </div>)}</div>}
 {meta.totalPages>1&&<div className="actions" style={{justifyContent:"center"}}><button className="btn btn-secondary" disabled={meta.page<=1||loading} onClick={()=>search(meta.page-1)}>Previous</button><span style={{alignSelf:"center"}}>Page {meta.page} / {meta.totalPages}</span><button className="btn btn-secondary" disabled={meta.page>=meta.totalPages||loading} onClick={()=>search(meta.page+1)}>Next</button></div>}
 </div>;
}
