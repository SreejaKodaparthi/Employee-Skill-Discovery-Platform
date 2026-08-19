import { useEffect,useState } from "react";
import API from "../../services/api";

const empty={department:"",designation:"",location:"",careerInterests:"",education:"",experience:""};
export default function Profile(){
 const [form,setForm]=useState(empty),[exists,setExists]=useState(false),[loading,setLoading]=useState(true),[saving,setSaving]=useState(false),[msg,setMsg]=useState("");
 const load=async()=>{setLoading(true);try{const r=await API.get("/profile/me");const p=r.data.profile;setExists(true);setForm({department:p.department||"",designation:p.designation||"",location:p.location||"",careerInterests:(p.careerInterests||[]).join(", "),education:(p.education||[]).join(", "),experience:(p.experience||[]).join(", ")});}catch(e){if(e.response?.status!==404)setMsg(e.response?.data?.message||"Could not load profile.");}finally{setLoading(false);}};
 useEffect(()=>{load()},[]);
 const submit=async(e)=>{e.preventDefault();setSaving(true);setMsg("");const arr=s=>s.split(",").map(x=>x.trim()).filter(Boolean);const payload={department:form.department,designation:form.designation,location:form.location,careerInterests:arr(form.careerInterests),education:arr(form.education),experience:arr(form.experience)};try{const r=exists?await API.put("/profile/me",payload):await API.post("/profile",payload);setExists(true);setMsg(r.data.message||"Profile saved.");}catch(e){setMsg(e.response?.data?.message||"Save failed.");}finally{setSaving(false);}};
 if(loading)return <div className="page-loader">Loading profile…</div>;
 return <div className="container-page" style={{maxWidth:850}}><div className="page-head"><h1>My Profile</h1><p>These fields power employee discovery and advanced search.</p></div><div className="card">{msg&&<div className="alert alert-success">{msg}</div>}
 <form onSubmit={submit} className="form-grid">
 {["department","designation","location"].map(k=><div className="field" key={k}><label>{k[0].toUpperCase()+k.slice(1)}</label><input required value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})}/></div>)}
 {["careerInterests","education","experience"].map(k=><div className="field" key={k}><label>{k==="careerInterests"?"Career interests (comma separated)":k[0].toUpperCase()+k.slice(1)+" (comma separated)"}</label><textarea rows="3" required value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})}/></div>)}
 <div className="field full"><button className="btn btn-primary" disabled={saving}>{saving?"Saving…":exists?"Update Profile":"Create Profile"}</button></div>
 </form></div></div>;
}
