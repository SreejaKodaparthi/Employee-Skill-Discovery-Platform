// import { useState } from "react";
// import API from "../../services/api";
// import { useAuth } from "../../context/AuthContext";
// import { Link } from "react-router-dom";

// <<<<<<< HEAD
// const Resume = () => {
//   const { token } = useAuth();
//   const navigate = useNavigate();

//   const [file, setFile] = useState(null);
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const uploadResume = async (e) => {
//     e.preventDefault();

//     if (!file) {
//       alert("Please choose a resume.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("resume", file);

//     try {
//       setLoading(true);
//       setError("");
//       setData(null);

//       const res = await API.post(
//         "/resume/parse-resume",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setData(res.data.parsedData);
//     } catch (err) {
//       console.error(err);

//       setError(
//         err.response?.data?.message ||
//           "Resume parsing failed."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="resume-page">
//       <div className="upload-card">
//         <h2>📄 Resume Parser</h2>

//         <p>
//           Upload your PDF or DOCX resume to
//           automatically extract candidate
//           information.
//         </p>

//         {error && (
//           <div
//             className="alert alert-danger"
//             style={{
//               borderRadius: "12px",
//               marginBottom: "15px",
//             }}
//           >
//             {error}
//           </div>
//         )}

//         <form onSubmit={uploadResume}>
//           <input
//             type="file"
//             accept=".pdf,.doc,.docx"
//             onChange={(e) => {
//               setFile(e.target.files[0]);
//               setData(null);
//               setError("");
//             }}
//           />

//           {file && (
//             <p
//               style={{
//                 color: "var(--text)",
//                 fontSize: "14px",
//                 marginTop: "10px",
//               }}
//             >
//               📎 Selected File:{" "}
//               <strong>{file.name}</strong>
//             </p>
//           )}

//           <button
//             type="submit"
//             disabled={loading}
//           >
//             {loading
//               ? "⏳ Parsing..."
//               : "🚀 Parse Resume"}
//           </button>
//         </form>

//         <div
//           style={{
//             marginTop: "20px",
//             fontSize: "13px",
//             color: "var(--text)",
//           }}
//         >
//           <strong>
//             Supported Formats:
//           </strong>{" "}
//           PDF, DOC, DOCX
//         </div>
//       </div>

//       {data && (
//         <div className="result-card">
//           <h2>📋 Resume Details</h2>

//           <div className="row">
//             <span>👤 Name</span>
//             <p>{data.name || "Not found"}</p>
//           </div>

//           <div className="row">
//             <span>📧 Email</span>
//             <p>{data.email || "Not found"}</p>
//           </div>

//           <div className="row">
//             <span>📱 Phone</span>
//             <p>{data.phone || "Not found"}</p>
//           </div>

//           <div className="row">
//             <span>💼 Experience</span>
//             <p>
//               {data.experience ||
//                 "Not found"}
//             </p>
//           </div>

//           <div className="row">
//             <span>🛠 Skills</span>

//             <p>
//               {data.skills?.length
//                 ? data.skills.join(", ")
//                 : "No skills detected"}
//             </p>
//           </div>

//           <div
//             className="row"
//             style={{
//               borderBottom: "none",
//             }}
//           >
//             <span>
//               📊 Total Skills
//             </span>

//             <p>
//               <strong>
//                 {data.skills?.length || 0}
//               </strong>{" "}
//               skills extracted
//             </p>
//           </div>

//           {data.skills?.length > 0 && (
//             <div
//               style={{
//                 marginTop: "20px",
//                 display: "flex",
//                 justifyContent:
//                   "center",
//                 gap: "12px",
//                 flexWrap: "wrap",
//               }}
//             >
//              <button
//   onClick={() =>
//     navigate("/skills", {
//       state: {
//         parsedSkills: data.skills,
//       },
//     })
//   }
//   style={{
//     background:
//       "linear-gradient(135deg,#7c3aed,#a78bfa)",
//     color: "#fff",
//     border: "none",
//     padding: "10px 28px",
//     borderRadius: "10px",
//     cursor: "pointer",
//     fontWeight: "600",
//   }}
// >
//   ➕ Add Skills to Profile
// </button>

//               <button
//                  onClick={() =>
//     navigate("/skills", {
//       state: {
//           parsedSkills: res.data.parsedData.skills
//       },
//     })
//   }
//                 style={{
//                   background:
//                     "transparent",
//                   color: "#7c3aed",
//                   border:
//                     "2px solid #7c3aed",
//                   padding:
//                     "10px 28px",
//                   borderRadius: "10px",
//                   cursor: "pointer",
//                   fontWeight: "600",
//                 }}
//               >
//                 View Skills
//               </button>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Resume;
// =======
// export default function Resume(){
//  const {user}=useAuth();const [file,setFile]=useState(null),[data,setData]=useState(null),[fileName,setFileName]=useState(""),[loading,setLoading]=useState(false),[saving,setSaving]=useState(false),[msg,setMsg]=useState(""),[error,setError]=useState("");
//  const parse=async e=>{e.preventDefault();if(!file)return setError("Choose a PDF or DOCX file.");if(file.size>5*1024*1024)return setError("Maximum file size is 5 MB.");setLoading(true);setError("");setMsg("");const fd=new FormData();fd.append("resume",file);try{const r=await API.post("/resume/parse-resume",fd);setData(r.data.parsedData);setFileName(r.data.fileName||file.name);setMsg("Resume parsed successfully. Review the extracted data before saving.")}catch(e){setError(e.response?.data?.message||"Resume parsing failed.")}finally{setLoading(false)}};
//  const save=async()=>{if(!data)return;setSaving(true);setError("");try{const r=await API.post("/resume/save-parsed-resume",{userId:user.id,parsedData:data,resumeFileName:fileName});setMsg(`${r.data.message} Added ${r.data.addedSkillsCount||0} new resume skills.`)}catch(e){setError(e.response?.data?.message||"Could not save parsed resume.")}finally{setSaving(false)}};
//  return <div className="container-page" style={{maxWidth:900}}><div className="page-head"><h1>Resume Parser</h1><p>Backend accepts PDF/DOCX up to 5 MB and runs the Python parser.</p></div>
//  <div className="card"><form onSubmit={parse}><div className="field"><label>Resume file</label><input type="file" accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={e=>{setFile(e.target.files?.[0]||null);setData(null);setError("");}}/></div><div className="actions"><button className="btn btn-primary" disabled={loading}>{loading?"Parsing…":"Parse Resume"}</button>{file&&<span style={{alignSelf:"center",fontSize:13,color:"var(--muted)"}}>{file.name}</span>}</div></form></div>
//  {error&&<div className="alert alert-danger">{error}</div>}{msg&&<div className="alert alert-success">{msg}</div>}
//  {data&&<div className="card" style={{marginTop:18}}><h2>Extracted data</h2><div className="grid grid-2">
//  {[["Name",data.name],["Email",data.email],["Phone",data.phone],["Experience",data.experience]].map(([l,v])=><div key={l}><small style={{color:"var(--muted)"}}>{l}</small><p><strong>{v||"Not found"}</strong></p></div>)}
//  <div className="field full"><label>Skills ({data.skills?.length||0})</label><div className="chips">{(data.skills||[]).map(s=><span className="chip" key={typeof s==="string"?s:s.name}>{typeof s==="string"?s:s.name}</span>)}</div></div>
//  <div className="field full"><label>Education</label><div className="chips">{(data.education||[]).map((s,i)=><span className="chip" key={i}>{typeof s==="string"?s:JSON.stringify(s)}</span>)}</div></div>
//  <div className="field full"><label>Certifications</label><div className="chips">{(data.certifications||[]).map((s,i)=><span className="chip" key={i}>{typeof s==="string"?s:JSON.stringify(s)}</span>)}</div></div>
//  <div className="field full"><label>Experience details</label><div className="chips">{(data.experience||[]).map((s,i)=><span className="chip" key={i}>{typeof s==="string"?s:JSON.stringify(s)}</span>)}</div></div>
//  </div><div className="actions"><button className="btn btn-primary" disabled={saving} onClick={save}>{saving?"Saving…":"Save Parsed Resume"}</button><Link className="btn btn-secondary" to="/skills">Open Skills</Link></div></div>}
//  </div>;
// }
// >>>>>>> c6f86c44d5302f3574bf087aaff748500c9fdaca
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";


export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await login(
        form.email.trim(),
        form.password
      );

      navigate(
        location.state?.from || "/dashboard",
        { replace: true }
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container-page"
      style={{ maxWidth: 520 }}
    >
      <div className="card">

        <div className="page-head">
          <h1>Welcome back</h1>
          <p>
            Sign in to your SkillDiscovery account.
          </p>
        </div>

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        <form onSubmit={submit} className="grid">

          <div className="field">
            <label>Email</label>

            <input
              type="email"
              required
              value={form.email}
              placeholder="Enter your email"
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
            />
          </div>

          <div className="field">
            <label>Password</label>

            <input
              type="password"
              required
              value={form.password}
              placeholder="Enter your password"
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
            />
          </div>

          {/* Old functionality - Forgot Password */}
          <div>
            <Link to="/forgot-password">
              Forgot Password?
            </Link>
          </div>

          <button
            className="btn btn-primary"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Signing in..."
              : "Sign In"}
          </button>

        </form>

        <p
          style={{
            color: "var(--muted)",
            fontSize: 14,
          }}
        >
          New here?{" "}
          <Link to="/register">
            Create an account
          </Link>
        </p>

      </div>
    </div>
  );
}
