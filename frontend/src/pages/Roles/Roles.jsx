import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";

const blank={roleName:"",department:"",description:"",requiredSkills:[]};
const skillBlank={skillName:"",minimumProficiency:"beginner",minimumExperience:0,requiredEmployeeCount:1,priority:"medium",mandatory:true};
export default function Roles(){
 const [roles,setRoles]=useState([]),[form,setForm]=useState(blank),[skill,setSkill]=useState(skillBlank),[editing,setEditing]=useState(null),[error,setError]=useState(""),[loading,setLoading]=useState(false);
 const load=async()=>{try{const r=await API.get("/roles");setRoles(r.data.roles||[])}catch(e){setError(e.response?.data?.message||"Could not load roles.")}};useEffect(()=>{load()},[]);
 const addSkill=()=>{if(!skill.skillName.trim())return;setForm({...form,requiredSkills:[...form.requiredSkills,{...skill,skillName:skill.skillName.trim()}]});setSkill(skillBlank)};
 const submit=async e=>{e.preventDefault();if(!form.requiredSkills.length)return setError("Add at least one required skill.");setLoading(true);setError("");try{if(editing)await API.put(`/roles/${editing}`,form);else await API.post("/roles",form);setForm(blank);setEditing(null);load()}catch(e){setError(e.response?.data?.message||"Could not save role.")}finally{setLoading(false)}};
 const edit=r=>{setEditing(r._id);setForm({roleName:r.roleName,department:r.department||"",description:r.description||"",requiredSkills:r.requiredSkills||[]})};
 const del=async id=>{if(!confirm("Remove this role requirement?"))return;try{await API.delete(`/roles/${id}`);load()}catch(e){setError(e.response?.data?.message||"Delete failed.")}};
 return <div className="container-page"><div className="page-head"><h1>Role Requirements</h1><p>Create target skill profiles used by skill-gap analysis.</p></div>{error&&<div className="alert alert-danger">{error}</div>}
 <div className="card" style={{marginBottom:20}}><form onSubmit={submit} className="form-grid"><div className="field"><label>Role name</label><input required value={form.roleName} onChange={e=>setForm({...form,roleName:e.target.value})}/></div><div className="field"><label>Department</label><input value={form.department} onChange={e=>setForm({...form,department:e.target.value})}/></div><div className="field full"><label>Description</label><textarea rows="2" value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/></div></form>
 <h3>Required skill</h3><div className="form-grid">
 <div className="field"><label>Skill</label><input value={skill.skillName} onChange={e=>setSkill({...skill,skillName:e.target.value})}/></div><div className="field"><label>Minimum proficiency</label><select value={skill.minimumProficiency} onChange={e=>setSkill({...skill,minimumProficiency:e.target.value})}>{["beginner","intermediate","advanced","expert"].map(x=><option key={x}>{x}</option>)}</select></div>
 <div className="field"><label>Minimum experience</label><input type="number" min="0" value={skill.minimumExperience} onChange={e=>setSkill({...skill,minimumExperience:Number(e.target.value)})}/></div><div className="field"><label>Priority</label><select value={skill.priority} onChange={e=>setSkill({...skill,priority:e.target.value})}>{["low","medium","high","critical"].map(x=><option key={x}>{x}</option>)}</select></div>
 <div className="field full"><button type="button" className="btn btn-secondary" onClick={addSkill}>+ Add required skill</button></div></div>
 <div className="chips" style={{marginTop:12}}>{form.requiredSkills.map((s,i)=><span className="chip" key={i}>{s.skillName} · {s.minimumProficiency} · {s.priority} <button type="button" onClick={()=>setForm({...form,requiredSkills:form.requiredSkills.filter((_,j)=>j!==i)})} style={{border:0,background:"none",color:"inherit"}}>×</button></span>)}</div>
 <div className="actions"><button className="btn btn-primary" disabled={loading} onClick={submit}>{loading?"Saving…":editing?"Update Role":"Create Role"}</button>{editing&&<button className="btn btn-secondary" onClick={()=>{setEditing(null);setForm(blank)}}>Cancel</button>}</div>
 </div>
 <div className="grid grid-2">{roles.map(r=><div className="card" key={r._id}><div style={{display:"flex",justifyContent:"space-between"}}><div><h3>{r.roleName}</h3><p style={{color:"var(--muted)"}}>{r.department||"—"}</p></div><span className="badge">{r.requiredSkills?.length||0} skills</span></div><p>{r.description||"No description."}</p><div className="chips">{(r.requiredSkills||[]).map(s=><span className="chip" key={s.skillName}>{s.skillName} · {s.minimumProficiency}</span>)}</div><div className="actions"><button className="btn btn-secondary" onClick={()=>edit(r)}>Edit</button><button className="btn btn-danger" onClick={()=>del(r._id)}>Remove</button><Link className="btn btn-primary" to={`/skill-gap?role=${r._id}`}>Skill Gap</Link></div></div>)}</div>
 </div>;
}
