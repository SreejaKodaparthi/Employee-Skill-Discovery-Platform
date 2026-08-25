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

export default function Resume() {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  // -----------------------------
  // Parse Resume
  // -----------------------------
  const parse = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Please choose a PDF or DOCX file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Maximum file size is 5 MB.");
      return;
    }

    setLoading(true);
    setError("");
    setMsg("");
    setData(null);

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await API.post(
        "/resume/parse-resume",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setData(res.data.parsedData);

      setMsg(
        "Resume parsed successfully. Review the extracted information."
      );
    } catch (err) {
      console.error("Resume parsing error:", err);

      setError(
        err.response?.data?.message ||
          "Resume parsing failed."
      );
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // Add extracted skills
  // -----------------------------
  const openSkills = () => {
    if (!data?.skills?.length) {
      return;
    }

    const parsedSkills = data.skills.map(
      (skill) =>
        typeof skill === "string"
          ? skill
          : skill.name
    );

    navigate("/skills", {
      state: {
        parsedSkills,
      },
    });
  };

  // -----------------------------
  // File Selection
  // -----------------------------
  const handleFileChange = (e) => {
    const selectedFile =
      e.target.files?.[0] || null;

    setFile(selectedFile);
    setData(null);
    setError("");
    setMsg("");
  };

  return (
    <div
      className="container-page resume-page"
      style={{ maxWidth: 1000 }}
    >

      {/* ================= HEADER ================= */}

      <div className="page-head resume-header">
        <div>

          <span className="resume-label">
            AI POWERED
          </span>

          <h1>Resume Parser</h1>

          <p>
            Upload your resume and automatically
            extract your profile information and
            skills.
          </p>

        </div>
      </div>


      {/* ================= UPLOAD CARD ================= */}

      <div className="card upload-card">

        <div className="upload-icon">
          📄
        </div>

        <div className="upload-content">

          <h2>
            Upload your resume
          </h2>

          <p>
            Supported formats: PDF and DOCX
            <br />
            Maximum file size: 5 MB
          </p>

          <form onSubmit={parse}>

            <div className="resume-file-input">

              <input
                type="file"
                accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleFileChange}
              />

            </div>


            {/* Selected File */}

            {file && (
              <div className="selected-file">

                <span>
                  📎
                </span>

                <div>

                  <strong>
                    {file.name}
                  </strong>

                  <small>
                    {(file.size / 1024 / 1024).toFixed(
                      2
                    )}{" "}
                    MB
                  </small>

                </div>

              </div>
            )}


            {/* Parse Button */}

            <button
              type="submit"
              className="btn btn-primary parse-button"
              disabled={loading}
            >

              {loading ? (
                <>
                  <span className="button-spinner"></span>
                  Parsing Resume...
                </>
              ) : (
                <>
                  🔍 Parse Resume
                </>
              )}

            </button>

          </form>

        </div>

      </div>


      {/* ================= ERROR ================= */}

      {error && (
        <div className="alert alert-danger resume-alert">

          <span>
            ⚠️
          </span>

          {error}

        </div>
      )}


      {/* ================= SUCCESS ================= */}

      {msg && (
        <div className="alert alert-success resume-alert">

          <span>
            ✓
          </span>

          {msg}

        </div>
      )}


      {/* ================= EXTRACTED DATA ================= */}

      {data && (
        <div className="card extracted-card">

          {/* Header */}

          <div className="extracted-header">

            <div>

              <span className="resume-label">
                PARSED RESULT
              </span>

              <h2>
                Extracted Information
              </h2>

              <p>
                Review the information extracted
                from your resume.
              </p>

            </div>

          </div>


          {/* ================= PERSONAL INFORMATION ================= */}

          <div className="section-title">

            <span>
              👤
            </span>

            Personal Information

          </div>


          <div className="info-grid">

            {/* Name */}

            <div className="info-box">

              <span className="info-label">
                FULL NAME
              </span>

              <strong>
                {data.name || "Not found"}
              </strong>

            </div>


            {/* Email */}

            <div className="info-box">

              <span className="info-label">
                EMAIL
              </span>

              <strong>
                {data.email || "Not found"}
              </strong>

            </div>


            {/* Phone */}

            <div className="info-box">

              <span className="info-label">
                PHONE
              </span>

              <strong>
                {data.phone || "Not found"}
              </strong>

            </div>


            {/* Experience */}

            <div className="info-box">

              <span className="info-label">
                EXPERIENCE
              </span>

              <strong>

                {Array.isArray(
                  data.experience
                )
                  ? data.experience.length
                    ? `${data.experience.length} entries`
                    : "Not found"
                  : data.experience ||
                    "Not found"}

              </strong>

            </div>

          </div>


          {/* ================= SKILLS ================= */}

          <div className="section-title">

            <span>
              ⚡
            </span>

            Skills

            <span className="count-badge">
              {data.skills?.length || 0}
            </span>

          </div>


          <div className="skills-container">

            {data.skills?.length ? (

              data.skills.map(
                (skill, index) => (

                  <span
                    className="skill-chip"
                    key={
                      typeof skill === "string"
                        ? skill
                        : skill.name || index
                    }
                  >

                    {typeof skill === "string"
                      ? skill
                      : skill.name}

                  </span>

                )
              )

            ) : (

              <span className="empty-text">
                No skills found
              </span>

            )}

          </div>


          {/* ================= EXPERIENCE ================= */}

          <div className="section-title">

            <span>
              💼
            </span>

            Experience Details

          </div>


          <div className="experience-container">

            {Array.isArray(
              data.experience
            ) &&
            data.experience.length > 0 ? (

              data.experience.map(
                (item, index) => (

                  <div
                    className="experience-item"
                    key={index}
                  >

                    {typeof item === "string"
                      ? item
                      : JSON.stringify(item)}

                  </div>

                )
              )

            ) : (

              <div className="empty-text">
                No detailed experience
                information found.
              </div>

            )}

          </div>


          {/* ================= ACTIONS ================= */}

          <div className="resume-actions">

            {data.skills?.length > 0 && (

              <button
                type="button"
                className="btn btn-primary"
                onClick={openSkills}
              >
                ⚡ Add Skills to Profile
              </button>

            )}


            <Link
              className="btn btn-secondary"
              to="/skills"
            >
              Open Skills
            </Link>

          </div>

        </div>
      )}


      {/* ================= HOW IT WORKS ================= */}

      <div className="resume-info">

        <div className="resume-info-title">

          <span>
            💡
          </span>

          How it works

        </div>


        <div className="resume-steps">

          {/* Step 1 */}

          <div>

            <span className="step-number">
              1
            </span>

            <div>

              <strong>
                Upload Resume
              </strong>

              <p>
                Upload your PDF or DOCX resume.
              </p>

            </div>

          </div>


          {/* Step 2 */}

          <div>

            <span className="step-number">
              2
            </span>

            <div>

              <strong>
                Extract Information
              </strong>

              <p>
                The parser identifies your
                profile information and skills.
              </p>

            </div>

          </div>


          {/* Step 3 */}

          <div>

            <span className="step-number">
              3
            </span>

            <div>

              <strong>
                Review Results
              </strong>

              <p>
                Review the information extracted
                from your resume.
              </p>

            </div>

          </div>

        </div>

      </div>


      {/* ================= STYLES ================= */}

      <style>{`

        .resume-page {
          padding-bottom: 50px;
        }

        .resume-header {
          margin-bottom: 25px;
        }

        .resume-label {
          display: inline-block;
          padding: 6px 10px;
          border-radius: 7px;
          background: #f0eaff;
          color: #6d3df5;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1px;
          margin-bottom: 8px;
        }

        .resume-header h1 {
          margin: 0 0 6px;
          font-size: 36px;
        }

        .resume-header p {
          margin: 0;
          color: var(--muted);
          font-size: 16px;
        }

        .upload-card {
          display: flex;
          align-items: center;
          gap: 28px;
          padding: 30px;
          border: 1px solid #e7e4f5;
          box-shadow:
            0 8px 30px rgba(60,40,120,0.05);
        }

        .upload-icon {
          width: 80px;
          height: 80px;
          flex-shrink: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 20px;

          background: #f0eaff;

          font-size: 38px;
        }

        .upload-content {
          flex: 1;
        }

        .upload-content h2 {
          margin: 0 0 5px;
          font-size: 21px;
        }

        .upload-content p {
          color: var(--muted);
          line-height: 1.5;
          margin: 0 0 20px;
          font-size: 14px;
        }

        .resume-file-input input {
          width: 100%;
          padding: 13px;

          border: 1px dashed #bdb1e8;
          border-radius: 10px;

          background: #faf9ff;

          cursor: pointer;

          box-sizing: border-box;
        }

        .selected-file {
          margin-top: 12px;

          padding: 12px 14px;

          border-radius: 10px;

          background: #f7f5ff;

          display: flex;
          align-items: center;

          gap: 10px;
        }

        .selected-file strong {
          display: block;
          font-size: 13px;
        }

        .selected-file small {
          display: block;
          color: var(--muted);
          margin-top: 2px;
        }

        .parse-button {
          margin-top: 15px;
        }

        .button-spinner {
          display: inline-block;

          width: 14px;
          height: 14px;

          border: 2px solid rgba(255,255,255,.4);
          border-top-color: white;

          border-radius: 50%;

          animation:
            resume-spin .7s linear infinite;

          margin-right: 8px;

          vertical-align: -2px;
        }

        @keyframes resume-spin {

          to {
            transform: rotate(360deg);
          }

        }

        .resume-alert {
          margin-top: 18px;

          display: flex;
          align-items: center;

          gap: 9px;
        }

        .extracted-card {
          margin-top: 20px;
          padding: 30px;
        }

        .extracted-header {
          margin-bottom: 28px;
        }

        .extracted-header h2 {
          margin: 0 0 5px;
          font-size: 25px;
        }

        .extracted-header p {
          color: var(--muted);
          margin: 0;
        }

        .section-title {
          display: flex;
          align-items: center;

          gap: 9px;

          font-size: 17px;
          font-weight: 750;

          margin: 28px 0 14px;

          padding-bottom: 10px;

          border-bottom:
            1px solid #ececf2;
        }

        .count-badge {
          font-size: 11px;

          padding: 4px 8px;

          background: #f0eaff;
          color: #6d3df5;

          border-radius: 20px;
        }

        .info-grid {
          display: grid;

          grid-template-columns:
            repeat(2, 1fr);

          gap: 14px;
        }

        .info-box {
          padding: 17px;

          background: #fafbfe;

          border:
            1px solid #e8e9ef;

          border-radius: 11px;
        }

        .info-label {
          display: block;

          color: #858a9b;

          font-size: 10px;

          font-weight: 800;

          letter-spacing: .6px;

          margin-bottom: 7px;
        }

        .info-box strong {
          font-size: 14px;

          color: #202438;

          word-break: break-word;
        }

        .skills-container {
          display: flex;

          flex-wrap: wrap;

          gap: 9px;

          min-height: 30px;
        }

        .skill-chip {
          padding: 8px 12px;

          background: #f0eaff;

          color: #6037cf;

          border-radius: 8px;

          font-size: 13px;

          font-weight: 650;
        }

        .empty-text {
          color: var(--muted);

          font-size: 13px;
        }

        .experience-container {
          display: flex;

          flex-direction: column;

          gap: 9px;
        }

        .experience-item {
          padding: 13px 15px;

          background: #fafbfe;

          border:
            1px solid #e8e9ef;

          border-radius: 9px;

          color: #454a5c;

          font-size: 13px;

          line-height: 1.5;
        }

        .resume-actions {
          display: flex;

          flex-wrap: wrap;

          gap: 10px;

          margin-top: 30px;

          padding-top: 22px;

          border-top:
            1px solid #ececf2;
        }

        .resume-info {
          margin-top: 20px;

          padding: 22px;

          border-radius: 14px;

          background: #faf9ff;

          border:
            1px solid #e8e2ff;
        }

        .resume-info-title {
          display: flex;

          align-items: center;

          gap: 8px;

          font-weight: 750;

          margin-bottom: 18px;
        }

        .resume-steps {
          display: grid;

          grid-template-columns:
            repeat(3, 1fr);

          gap: 15px;
        }

        .resume-steps > div {
          display: flex;

          gap: 10px;

          padding: 14px;

          background: white;

          border:
            1px solid #e9e7f2;

          border-radius: 10px;
        }

        .step-number {
          width: 28px;
          height: 28px;

          flex-shrink: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          background: #6d3df5;

          color: white;

          border-radius: 50%;

          font-size: 12px;

          font-weight: 800;
        }

        .resume-steps strong {
          font-size: 13px;
        }

        .resume-steps p {
          color: var(--muted);

          font-size: 11px;

          line-height: 1.4;

          margin: 5px 0 0;
        }

        @media (max-width: 700px) {

          .upload-card {
            flex-direction: column;

            align-items: flex-start;
          }

          .info-grid {
            grid-template-columns: 1fr;
          }

          .resume-steps {
            grid-template-columns: 1fr;
          }

          .extracted-card {
            padding: 20px;
          }

        }

      `}</style>

    </div>
  );
}