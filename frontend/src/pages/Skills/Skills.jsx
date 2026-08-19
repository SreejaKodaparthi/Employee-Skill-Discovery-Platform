import { useEffect,useState } from "react";
import API from "../../services/api";

const blank={skillName:"",category:"technical",proficiencyLevel:"beginner",yearsOfExperience:0,source:"self"};
export default function Skills(){
 const [skills,setSkills]=useState([]),[catalog,setCatalog]=useState([]),[form,setForm]=useState(blank),[editing,setEditing]=useState(null),[loading,setLoading]=useState(false),[error,setError]=useState("");
 const load=async()=>{try{const [s,c]=await Promise.all([API.get("/skills"),API.get("/skill-catalog")]);setSkills(s.data.skills||[]);setCatalog(c.data.skills||[]);}catch(e){setError(e.response?.data?.message||"Could not load skills.");}};
 useEffect(()=>{load()},[]);
 const submit=async e=>{e.preventDefault();setLoading(true);setError("");try{if(editing)await API.put(`/skills/${editing}`,form);else await API.post("/skills",form);setForm(blank);setEditing(null);await load();}catch(e){setError(e.response?.data?.message||"Skill save failed.");}finally{setLoading(false);}};
 const edit=s=>{setEditing(s._id);setForm({skillName:s.skillName,category:s.category||"technical",proficiencyLevel:s.proficiencyLevel,yearsOfExperience:s.yearsOfExperience||0,source:s.source||"self"});};
 const del=async id=>{if(!confirm("Delete this skill?"))return;try{await API.delete(`/skills/${id}`);load()}catch(e){setError(e.response?.data?.message||"Delete failed.")}};
 return <div className="container-page"><div className="page-head"><h1>My Skills</h1><p>Skills are validated against the backend Skill Catalog.</p></div>{error&&<div className="alert alert-danger">{error}</div>}
 <div className="card" style={{marginBottom:20}}><form onSubmit={submit} className="form-grid">
 <div className="field full"><label>Skill name</label><input list="skill-options" required value={form.skillName} onChange={e=>setForm({...form,skillName:e.target.value})}/><datalist id="skill-options">{catalog.map(s=><option key={s._id} value={s.skillName}/>)}</datalist></div>
 <div className="field"><label>Category</label><select value={form.category} onChange={e=>setForm({...form,category:e.target.value})}><option value="technical">Technical</option><option value="soft">Soft</option></select></div>
 <div className="field"><label>Proficiency</label><select value={form.proficiencyLevel} onChange={e=>setForm({...form,proficiencyLevel:e.target.value})}>{["beginner","intermediate","advanced","expert"].map(x=><option key={x}>{x}</option>)}</select></div>
 <div className="field"><label>Years of experience</label><input type="number" min="0" step=".5" value={form.yearsOfExperience} onChange={e=>setForm({...form,yearsOfExperience:Number(e.target.value)})}/></div>
 <div className="field"><label>Source</label><select value={form.source} onChange={e=>setForm({...form,source:e.target.value})}>{["self","resume","endorsed"].map(x=><option key={x}>{x}</option>)}</select></div>
 <div className="field full"><div className="actions"><button className="btn btn-primary" disabled={loading}>{loading?"Saving…":editing?"Update Skill":"Add Skill"}</button>{editing&&<button type="button" className="btn btn-secondary" onClick={()=>{setEditing(null);setForm(blank)}}>Cancel</button>}</div></div>
 </form></div>
 <div className="card table-wrap"><table className="data-table"><thead><tr><th>Skill</th><th>Category</th><th>Level</th><th>Years</th><th>Source</th><th>Actions</th></tr></thead><tbody>{skills.length?skills.map(s=><tr key={s._id}><td><strong>{s.skillName}</strong></td><td>{s.category}</td><td><span className="badge">{s.proficiencyLevel}</span></td><td>{s.yearsOfExperience||0}</td><td>{s.source}</td><td><button className="btn btn-secondary" onClick={()=>edit(s)}>Edit</button>{" "}<button className="btn btn-danger" onClick={()=>del(s._id)}>Delete</button></td></tr>):<tr><td colSpan="6">No skills added yet.</td></tr>}</tbody></table></div>
 </div>;
}
