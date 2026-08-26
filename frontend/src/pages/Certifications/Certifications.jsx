import { useEffect,useState } from "react";
import API from "../../services/api";

const blank={certificationName:"",issuingOrganization:"",issueDate:"",expiryDate:"",doesNotExpire:false,credentialId:"",credentialUrl:"",skills:""};
export default function Certifications(){
 const [items,setItems]=useState([]),[form,setForm]=useState(blank),[editing,setEditing]=useState(null),[error,setError]=useState(""),[saving,setSaving]=useState(false);
 const load=async()=>{try{const r=await API.get("/certifications");setItems(r.data.certifications||[])}catch(e){setError(e.response?.data?.message||"Could not load certifications.")}};
 useEffect(()=>{load()},[]);
 const submit=async e=>{e.preventDefault();setSaving(true);setError("");const p={...form,skills:form.skills.split(",").map(s=>s.trim()).filter(Boolean),expiryDate:form.doesNotExpire?null:form.expiryDate||null};try{if(editing)await API.put(`/certifications/${editing}`,p);else await API.post("/certifications",p);setForm(blank);setEditing(null);load()}catch(e){setError(e.response?.data?.errors?.join(", ")||e.response?.data?.message||"Certification save failed.")}finally{setSaving(false)}};
 const edit=x=>setEditing(x._id)||setForm({certificationName:x.certificationName,issuingOrganization:x.issuingOrganization,issueDate:x.issueDate?.slice(0,10)||"",expiryDate:x.expiryDate?.slice(0,10)||"",doesNotExpire:Boolean(x.doesNotExpire),credentialId:x.credentialId||"",credentialUrl:x.credentialUrl||"",skills:(x.skills||[]).join(", ")});
 const del=async id=>{if(!confirm("Delete this certification?"))return;try{await API.delete(`/certifications/${id}`);load()}catch(e){setError(e.response?.data?.message||"Delete failed.")}};
 return <div className="container-page"><div className="page-head"><h1>Certifications</h1><p>Manage credentials used by talent search and certification analytics.</p></div>{error&&<div className="alert alert-danger">{error}</div>}
 <div className="card" style={{marginBottom:20}}><form onSubmit={submit} className="form-grid">
 {["certificationName","issuingOrganization","issueDate","expiryDate","credentialId","credentialUrl"].map(k=><div className="field" key={k}><label>{k==="issueDate"?"Issue date":k==="expiryDate"?"Expiry date":k.replace(/([A-Z])/g," $1").replace(/^./,s=>s.toUpperCase())}</label><input required={["certificationName","issuingOrganization","issueDate"].includes(k)} type={k.includes("Date")?"date":"text"} value={form[k]} disabled={k==="expiryDate"&&form.doesNotExpire} onChange={e=>setForm({...form,[k]:e.target.value})}/></div>)}
 <div className="field"><label>Does not expire</label><input type="checkbox" checked={form.doesNotExpire} onChange={e=>setForm({...form,doesNotExpire:e.target.checked,expiryDate:""})}/></div>
 <div className="field"><label>Skills (comma separated)</label><input value={form.skills} onChange={e=>setForm({...form,skills:e.target.value})}/></div>
 {/* <div className="field full"><div className="actions"><button className="btn btn-primary" disabled={saving}>{saving?"Saving…":editing?"Update Certification":"Add Certification"}</button>{editing&&<button type="button" className="btn btn-secondary" onClick={()=>{setEditing(null);setForm(blank)}}>Cancel</button>}</div></div> */}
 </form></div>
 <div className="card table-wrap"><table className="data-table"><thead><tr><th>Certification</th><th>Issuer</th><th>Issue</th><th>Expiry</th></tr></thead><tbody>{items.length?items.map(x=><tr key={x._id}><td><strong>{x.certificationName}</strong><div className="chips">{(x.skills||[]).map(s=><span className="chip" key={s}>{s}</span>)}</div></td><td>{x.issuingOrganization}</td><td>{x.issueDate?.slice(0,10)}</td><td>{x.doesNotExpire?"No expiry":x.expiryDate?.slice(0,10)||"—"}</td></tr>):<tr><td colSpan="4">No certifications added yet.</td></tr>}</tbody></table></div>
 </div>;
}