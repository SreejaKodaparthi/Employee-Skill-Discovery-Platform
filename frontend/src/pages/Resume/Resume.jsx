import { useState } from "react";
import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function Resume(){
 const {user}=useAuth();const [file,setFile]=useState(null),[data,setData]=useState(null),[fileName,setFileName]=useState(""),[loading,setLoading]=useState(false),[saving,setSaving]=useState(false),[msg,setMsg]=useState(""),[error,setError]=useState("");
 const parse=async e=>{e.preventDefault();if(!file)return setError("Choose a PDF or DOCX file.");if(file.size>5*1024*1024)return setError("Maximum file size is 5 MB.");setLoading(true);setError("");setMsg("");const fd=new FormData();fd.append("resume",file);try{const r=await API.post("/resume/parse-resume",fd);setData(r.data.parsedData);setFileName(r.data.fileName||file.name);setMsg("Resume parsed successfully. Review the extracted data before saving.")}catch(e){setError(e.response?.data?.message||"Resume parsing failed.")}finally{setLoading(false)}};
 const save=async()=>{if(!data)return;setSaving(true);setError("");try{const r=await API.post("/resume/save-parsed-resume",{userId:user.id,parsedData:data,resumeFileName:fileName});setMsg(`${r.data.message} Added ${r.data.addedSkillsCount||0} new resume skills.`)}catch(e){setError(e.response?.data?.message||"Could not save parsed resume.")}finally{setSaving(false)}};
 return <div className="container-page" style={{maxWidth:900}}><div className="page-head"><h1>Resume Parser</h1><p>Backend accepts PDF/DOCX up to 5 MB and runs the Python parser.</p></div>
 <div className="card"><form onSubmit={parse}><div className="field"><label>Resume file</label><input type="file" accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={e=>{setFile(e.target.files?.[0]||null);setData(null);setError("");}}/></div><div className="actions"><button className="btn btn-primary" disabled={loading}>{loading?"Parsing…":"Parse Resume"}</button>{file&&<span style={{alignSelf:"center",fontSize:13,color:"var(--muted)"}}>{file.name}</span>}</div></form></div>
 {error&&<div className="alert alert-danger">{error}</div>}{msg&&<div className="alert alert-success">{msg}</div>}
 {data&&<div className="card" style={{marginTop:18}}><h2>Extracted data</h2><div className="grid grid-2">
 {[["Name",data.name],["Email",data.email],["Phone",data.phone],["Experience",data.experience]].map(([l,v])=><div key={l}><small style={{color:"var(--muted)"}}>{l}</small><p><strong>{v||"Not found"}</strong></p></div>)}
 <div className="field full"><label>Skills ({data.skills?.length||0})</label><div className="chips">{(data.skills||[]).map(s=><span className="chip" key={typeof s==="string"?s:s.name}>{typeof s==="string"?s:s.name}</span>)}</div></div>
 <div className="field full"><label>Education</label><div className="chips">{(data.education||[]).map((s,i)=><span className="chip" key={i}>{typeof s==="string"?s:JSON.stringify(s)}</span>)}</div></div>
 <div className="field full"><label>Certifications</label><div className="chips">{(data.certifications||[]).map((s,i)=><span className="chip" key={i}>{typeof s==="string"?s:JSON.stringify(s)}</span>)}</div></div>
 <div className="field full"><label>Experience details</label><div className="chips">{(data.experience||[]).map((s,i)=><span className="chip" key={i}>{typeof s==="string"?s:JSON.stringify(s)}</span>)}</div></div>
 </div><div className="actions"><button className="btn btn-primary" disabled={saving} onClick={save}>{saving?"Saving…":"Save Parsed Resume"}</button><Link className="btn btn-secondary" to="/skills">Open Skills</Link></div></div>}
 </div>;
}
