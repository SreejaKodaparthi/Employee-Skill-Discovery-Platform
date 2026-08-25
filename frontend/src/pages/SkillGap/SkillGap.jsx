// <<<<<<< HEAD
// import { useEffect, useState } from "react";
// import API from "../../services/api";
// import "./SkillGap.css";

// function SkillGap() {
//   const [user, setUser] = useState(null);
//   const [roles, setRoles] = useState([]);
//   const [selectedRole, setSelectedRole] = useState("");
//   const [analysis, setAnalysis] = useState(null);

//   const [loadingRoles, setLoadingRoles] = useState(true);
//   const [loadingAnalysis, setLoadingAnalysis] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetchUser();
//     fetchRoles();
//   }, []);

//   const fetchUser = async () => {
//     try {
//       const res = await API.get("/auth/me");
//       setUser(res.data.user);
//     } catch (err) {
//       console.error(err);
//     }
//   };

// const fetchRoles = async () => {
//   try {
//     const res = await API.get("/roles");

//     console.log("Roles Response:", res.data);

//     setRoles(res.data.roles || res.data);
//   } catch (err) {
//     console.error(err);
//     setError("Failed to load roles");
//   } finally {
//     setLoadingRoles(false);
//   }
//   };

//   const analyzeSkillGap = async () => {
//     if (!selectedRole) {
//       alert("Please select a role");
//       return;
//     }

//     try {
//       setLoadingAnalysis(true);

//       const res = await API.get(
//         `/skill-gap/${user._id}/${selectedRole}`
//       );

//       setAnalysis(res.data);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to generate skill gap report");
//     } finally {
//       setLoadingAnalysis(false);
//     }
//   };

//   return (
//     <div className="skill-gap-container">

//       <h2>📊 Skill Gap Analysis</h2>

//       <div className="skill-gap-card">

//         <label>Select Target Role</label>

//         <select
//           value={selectedRole}
//           onChange={(e) => setSelectedRole(e.target.value)}
//         >
//           <option value="">Select Role</option>

//           {roles.map((role) => (
//             <option
//               key={role._id}
//               value={role._id}
//             >
//               {role.roleName}
//             </option>
//           ))}

//         </select>

//         <button
//           onClick={analyzeSkillGap}
//           disabled={loadingAnalysis}
//         >
//           {loadingAnalysis
//             ? "Analyzing..."
//             : "Analyze"}
//         </button>

//       </div>

//       {loadingRoles && (
//         <p>Loading roles...</p>
//       )}

//       {error && (
//         <p className="error">{error}</p>
//       )}

//       {analysis && (

//         <>

//          <div className="match-card">

//   <div className="match-header">

//     <div>
//       <h3>{analysis.role.roleName}</h3>
//       <p className="match-label">Overall Match</p>
//     </div>

//     <div className="match-right">

//       <h1>{analysis.matchPercentage}%</h1>

//       <span
//         className={`status-badge ${
//           analysis.matchPercentage >= 80
//             ? "excellent"
//             : analysis.matchPercentage >= 50
//             ? "good"
//             : analysis.matchPercentage >= 20
//             ? "average"
//             : "poor"
//         }`}
//       >
//         {analysis.matchPercentage >= 80
//           ? "Excellent Match"
//           : analysis.matchPercentage >= 50
//           ? "Good Match"
//           : analysis.matchPercentage >= 20
//           ? "Needs Improvement"
//           : "Significant Skill Gap"}
//       </span>

//     </div>

//   </div>

//   <div className="progress">
//     <div
//       className="progress-fill"
//       style={{
//         width: `${analysis.matchPercentage}%`
//       }}
//     />
//   </div>

//   <div className="stats">

//     <div className="stat-card">
//       <span>Required Skills</span>
//       <strong>{analysis.totalRequiredSkills}</strong>
//     </div>

//     <div className="stat-card">
//       <span>Matched</span>
//       <strong>{analysis.matchedSkills.length}</strong>
//     </div>

//     <div className="stat-card">
//       <span>Missing</span>
//       <strong>{analysis.missingSkills.length}</strong>
//     </div>

//   </div>

// </div>

//           <div className="grid">

//             <div className="box">

//               <h3>
//                 ✅ Matched Skills
//               </h3>

//               {analysis.matchedSkills.length === 0 ? (
//                 <p>No matched skills</p>
//               ) : (
//                 analysis.matchedSkills.map((skill, index) => (
//                   <span
//                     key={index}
//                     className="chip green"
//                   >
//                     {skill}
//                   </span>
//                 ))
//               )}

//             </div>

//             <div className="box">

//               <h3>
//                 ❌ Missing Skills
//               </h3>

//               {analysis.missingSkills.length === 0 ? (
//                 <p>No missing skills</p>
//               ) : (
//                 analysis.missingSkills.map((skill, index) => (
//                   <span
//                     key={index}
//                     className="chip red"
//                   >
//                     {skill}
//                   </span>
//                 ))
//               )}

//             </div>

//           </div>

//           <div className="box">

//             <h3>
//               ➕ Additional Skills
//             </h3>

//             {analysis.extraSkills.length === 0 ? (
//               <p>No extra skills</p>
//             ) : (
//               analysis.extraSkills.map((skill, index) => (
//                 <span
//                   key={index}
//                   className="chip blue"
//                 >
//                   {skill}
//                 </span>
//               ))
//             )}

//           </div>

//           {analysis.aiRecommendation && (

//             <>

//               <div className="box">

//                 <h3>
//                   🤖 AI Summary
//                 </h3>

//                 <p>
//                   {analysis.aiRecommendation.summary}
//                 </p>

//               </div>

//               <div className="box">

//                 <h3>
//                   📚 Learning Roadmap
//                 </h3>

//                 <ul>

//                   {analysis.aiRecommendation.learningRoadmap?.map(
//                     (step, index) => (
//                       <li key={index}>
//                         {step}
//                       </li>
//                     )
//                   )}

//                 </ul>

//               </div>

//             </>

//           )}

//         </>

//       )}

//     </div>
//   );
// }

// export default SkillGap;
// =======
// import { useEffect,useState } from "react";
// import { useSearchParams } from "react-router-dom";
// import API from "../../services/api";

// export default function SkillGap(){
//  const [params]=useSearchParams();const [employeeId,setEmployeeId]=useState(params.get("employee")||"");const [roleId,setRoleId]=useState(params.get("role")||"");const [roles,setRoles]=useState([]),[report,setReport]=useState(null),[recommendation,setRecommendation]=useState(null),[loading,setLoading]=useState(false),[error,setError]=useState("");
//  useEffect(()=>{API.get("/roles").then(r=>setRoles(r.data.roles||[])).catch(e=>setError(e.response?.data?.message||"Could not load roles."))},[]);
//  const generate=async e=>{e.preventDefault();if(!employeeId||!roleId)return setError("Enter an employee User ID and select a role.");setLoading(true);setError("");setReport(null);setRecommendation(null);try{const r=await API.get(`/skill-gap/${employeeId}/${roleId}`);setReport(r.data);try{const rec=await API.get(`/recommendations/${employeeId}/${roleId}`);setRecommendation(rec.data.recommendation)}catch(e){if(e.response?.status!==404)throw e}}catch(e){setError(e.response?.data?.message||"Skill-gap analysis failed.")}finally{setLoading(false)}};
//  return <div className="container-page" style={{maxWidth:1000}}><div className="page-head"><h1>Skill Gap & Learning Recommendation</h1><p>Compare an employee's current skills with a role requirement.</p></div>{error&&<div className="alert alert-danger">{error}</div>}
//  <div className="card"><form onSubmit={generate} className="form-grid"><div className="field"><label>Employee User ID</label><input required placeholder="MongoDB User _id" value={employeeId} onChange={e=>setEmployeeId(e.target.value)}/></div><div className="field"><label>Role requirement</label><select required value={roleId} onChange={e=>setRoleId(e.target.value)}><option value="">Select role</option>{roles.map(r=><option key={r._id} value={r._id}>{r.roleName} — {r.department||"General"}</option>)}</select></div><div className="field full"><button className="btn btn-primary" disabled={loading}>{loading?"Generating…":"Generate Skill Gap Report"}</button></div></form></div>
//  {report&&<div className="grid grid-2" style={{marginTop:18}}><div className="card"><h2>{report.role?.roleName}</h2><div className="metric"><div className="label">Match percentage</div><div className="value">{report.matchPercentage}%</div></div><p><strong>{report.employee?.name}</strong> · {report.employee?.email}</p><h4>Matched</h4><div className="chips">{report.matchedSkills?.map(s=><span className="chip" key={s}>{s}</span>)}</div><h4 style={{marginTop:18}}>Missing</h4><div className="chips">{report.missingSkills?.map(s=><span className="chip" key={s}>{s}</span>)}</div><h4 style={{marginTop:18}}>Extra</h4><div className="chips">{report.extraSkills?.map(s=><span className="chip" key={s}>{s}</span>)}</div></div>
//  <div className="card"><h2>AI Learning Recommendation</h2>{recommendation?<Recommendation data={recommendation}/>:report.aiRecommendation&&Object.keys(report.aiRecommendation).length?<Recommendation data={report.aiRecommendation}/>:<p style={{color:"var(--muted)"}}>No AI recommendation was returned. The skill-gap report itself is still available.</p>}</div></div>}
//  </div>;
// }
// function Recommendation({data}){return <div>{Object.entries(data).map(([key,value])=><div key={key} style={{marginBottom:18}}><h4>{key.replace(/([A-Z])/g," $1")}</h4>{Array.isArray(value)?<div className="chips">{value.map((v,i)=><span className="chip" key={i}>{typeof v==="object"?JSON.stringify(v):String(v)}</span>)}</div>:typeof value==="object"&&value!==null?<pre style={{whiteSpace:"pre-wrap",background:"#fafbfe",padding:12,borderRadius:10,fontSize:12}}>{JSON.stringify(value,null,2)}</pre>:<p>{String(value)}</p>}</div>)}</div>}
// >>>>>>> c6f86c44d5302f3574bf087aaff748500c9fdaca

  // import { useEffect, useState } from "react";
  // import { useSearchParams } from "react-router-dom";
  // import API from "../../services/api";
  // import "./SkillGap.css";

  // function SkillGap() {
  //   const [params] = useSearchParams();

  //   const [user, setUser] = useState(null);
  //   const [roles, setRoles] = useState([]);

  //   const [selectedRole, setSelectedRole] = useState(
  //     params.get("role") || ""
  //   );

  //   const [employeeId, setEmployeeId] = useState(
  //     params.get("employee") || ""
  //   );

  //   const [analysis, setAnalysis] = useState(null);
  //   const [recommendation, setRecommendation] = useState(null);

  //   const [loadingRoles, setLoadingRoles] = useState(true);
  //   const [loadingAnalysis, setLoadingAnalysis] = useState(false);
  //   const [error, setError] = useState("");

  //   useEffect(() => {
  //     fetchUser();
  //     fetchRoles();
  //   }, []);

  //   const fetchUser = async () => {
  //     try {
  //       const res = await API.get("/auth/me");

  //       setUser(res.data.user);

  //       // If employee ID wasn't passed from Search,
  //       // use the currently logged-in user.
  //       if (!params.get("employee")) {
  //         setEmployeeId(res.data.user._id);
  //       }
  //     } catch (err) {
  //       console.error("Failed to fetch user:", err);

  //       setError(
  //         err.response?.data?.message ||
  //           "Failed to load user information."
  //       );
  //     }
  //   };

  //   const fetchRoles = async () => {
  //     try {
  //       const res = await API.get("/roles");

  //       setRoles(res.data.roles || res.data || []);
  //     } catch (err) {
  //       console.error(err);

  //       setError(
  //         err.response?.data?.message ||
  //           "Failed to load roles."
  //       );
  //     } finally {
  //       setLoadingRoles(false);
  //     }
  //   };

  //   const analyzeSkillGap = async (e) => {
  //     e?.preventDefault();

  //     if (!employeeId) {
  //       setError("Employee information could not be found.");
  //       return;
  //     }

  //     if (!selectedRole) {
  //       setError("Please select a target role.");
  //       return;
  //     }

  //     try {
  //       setLoadingAnalysis(true);
  //       setError("");
  //       setAnalysis(null);
  //       setRecommendation(null);

  //       // Generate skill-gap report
  //       const res = await API.get(
  //         `/skill-gap/${employeeId}/${selectedRole}`
  //       );

  //       setAnalysis(res.data);

  //       // Get AI learning recommendation
  //       try {
  //         const recommendationRes = await API.get(
  //           `/recommendations/${employeeId}/${selectedRole}`
  //         );

  //         setRecommendation(
  //           recommendationRes.data.recommendation
  //         );
  //       } catch (recErr) {
  //         // Recommendation is optional.
  //         // Don't fail the skill-gap report if AI recommendation fails.
  //         if (recErr.response?.status !== 404) {
  //           console.error(
  //             "Recommendation error:",
  //             recErr
  //           );
  //         }
  //       }
  //     } catch (err) {
  //       console.error(err);

  //       setError(
  //         err.response?.data?.message ||
  //           "Failed to generate skill gap report."
  //       );
  //     } finally {
  //       setLoadingAnalysis(false);
  //     }
  //   };

  //   const getStatus = (percentage) => {
  //     if (percentage >= 80) {
  //       return {
  //         className: "excellent",
  //         text: "Excellent Match",
  //       };
  //     }

  //     if (percentage >= 50) {
  //       return {
  //         className: "good",
  //         text: "Good Match",
  //       };
  //     }

  //     if (percentage >= 20) {
  //       return {
  //         className: "average",
  //         text: "Needs Improvement",
  //       };
  //     }

  //     return {
  //       className: "poor",
  //       text: "Significant Skill Gap",
  //     };
  //   };

  //   return (
  //     <div
  //       className="container-page"
  //       style={{ maxWidth: 1000 }}
  //     >
  //       {/* Header */}
  //       <div className="page-head">
  //         <h1>Skill Gap & Learning Recommendation</h1>

  //         <p>
  //           Compare an employee's current skills with
  //           the skills required for a target role.
  //         </p>
  //       </div>

  //       {/* Error */}
  //       {error && (
  //         <div className="alert alert-danger">
  //           {error}
  //         </div>
  //       )}

  //       {/* Role selection */}
  //       <div className="card">
  //         <form
  //           onSubmit={analyzeSkillGap}
  //           className="form-grid"
  //         >
  //           {/* Employee */}
  //           <div className="field">
  //             <label>Employee</label>

  //             <input
  //               value={
  //                 user
  //                   ? `${user.name} (${user.email})`
  //                   : "Loading..."
  //               }
  //               disabled
  //             />
  //           </div>

  //           {/* Role */}
  //           <div className="field">
  //             <label>Target Role</label>

  //             <select
  //               required
  //               value={selectedRole}
  //               onChange={(e) =>
  //                 setSelectedRole(e.target.value)
  //               }
  //             >
  //               <option value="">
  //                 Select Target Role
  //               </option>

  //               {roles.map((role) => (
  //                 <option
  //                   key={role._id}
  //                   value={role._id}
  //                 >
  //                   {role.roleName}
  //                   {role.department
  //                     ? ` — ${role.department}`
  //                     : ""}
  //                 </option>
  //               ))}
  //             </select>
  //           </div>

  //           <div className="field full">
  //             <button
  //               type="submit"
  //               className="btn btn-primary"
  //               disabled={
  //                 loadingAnalysis ||
  //                 loadingRoles ||
  //                 !employeeId
  //               }
  //             >
  //               {loadingAnalysis
  //                 ? "Generating..."
  //                 : "Generate Skill Gap Report"}
  //             </button>
  //           </div>
  //         </form>
  //       </div>

  //       {loadingRoles && (
  //         <p style={{ color: "var(--muted)" }}>
  //           Loading roles...
  //         </p>
  //       )}

  //       {/* Analysis */}
  //       {analysis && (
  //         <>
  //           {/* Match card */}
  //           <div
  //             className="card"
  //             style={{ marginTop: 18 }}
  //           >
  //             <div
  //               style={{
  //                 display: "flex",
  //                 justifyContent: "space-between",
  //                 alignItems: "center",
  //                 gap: 20,
  //                 flexWrap: "wrap",
  //               }}
  //             >
  //               <div>
  //                 <h2>
  //                   {analysis.role?.roleName ||
  //                     "Target Role"}
  //                 </h2>

  //                 <p
  //                   style={{
  //                     color: "var(--muted)",
  //                   }}
  //                 >
  //                   Overall Match
  //                 </p>
  //               </div>

  //               <div style={{ textAlign: "right" }}>
  //                 <div
  //                   style={{
  //                     fontSize: 42,
  //                     fontWeight: 700,
  //                   }}
  //                 >
  //                   {analysis.matchPercentage}%
  //                 </div>

  //                 {(() => {
  //                   const status = getStatus(
  //                     analysis.matchPercentage
  //                   );

  //                   return (
  //                     <span
  //                       className={`status-badge ${status.className}`}
  //                     >
  //                       {status.text}
  //                     </span>
  //                   );
  //                 })()}
  //               </div>
  //             </div>

  //             {/* Progress */}
  //             <div
  //               className="progress"
  //               style={{ marginTop: 20 }}
  //             >
  //               <div
  //                 className="progress-fill"
  //                 style={{
  //                   width: `${Math.min(
  //                     analysis.matchPercentage,
  //                     100
  //                   )}%`,
  //                 }}
  //               />
  //             </div>

  //             {/* Stats */}
  //             <div
  //               className="grid grid-3"
  //               style={{ marginTop: 20 }}
  //             >
  //               <div className="card metric">
  //                 <div className="label">
  //                   Required Skills
  //                 </div>

  //                 <div className="value">
  //                   {analysis.totalRequiredSkills ||
  //                     0}
  //                 </div>
  //               </div>

  //               <div className="card metric">
  //                 <div className="label">
  //                   Matched
  //                 </div>

  //                 <div className="value">
  //                   {analysis.matchedSkills?.length ||
  //                     0}
  //                 </div>
  //               </div>

  //               <div className="card metric">
  //                 <div className="label">
  //                   Missing
  //                 </div>

  //                 <div className="value">
  //                   {analysis.missingSkills?.length ||
  //                     0}
  //                 </div>
  //               </div>
  //             </div>
  //           </div>

  //           {/* Skills */}
  //           <div
  //             className="grid grid-2"
  //             style={{ marginTop: 18 }}
  //           >
  //             {/* Matched */}
  //             <div className="card">
  //               <h3>✅ Matched Skills</h3>

  //               {analysis.matchedSkills?.length ? (
  //                 <div className="chips">
  //                   {analysis.matchedSkills.map(
  //                     (skill, index) => (
  //                       <span
  //                         className="chip green"
  //                         key={index}
  //                       >
  //                         {skill}
  //                       </span>
  //                     )
  //                   )}
  //                 </div>
  //               ) : (
  //                 <p style={{ color: "var(--muted)" }}>
  //                   No matched skills.
  //                 </p>
  //               )}
  //             </div>

  //             {/* Missing */}
  //             <div className="card">
  //               <h3>❌ Missing Skills</h3>

  //               {analysis.missingSkills?.length ? (
  //                 <div className="chips">
  //                   {analysis.missingSkills.map(
  //                     (skill, index) => (
  //                       <span
  //                         className="chip red"
  //                         key={index}
  //                       >
  //                         {skill}
  //                       </span>
  //                     )
  //                   )}
  //                 </div>
  //               ) : (
  //                 <p style={{ color: "var(--muted)" }}>
  //                   No missing skills 🎉
  //                 </p>
  //               )}
  //             </div>
  //           </div>

  //           {/* Extra */}
  //           <div
  //             className="card"
  //             style={{ marginTop: 18 }}
  //           >
  //             <h3>➕ Additional Skills</h3>

  //             {analysis.extraSkills?.length ? (
  //               <div className="chips">
  //                 {analysis.extraSkills.map(
  //                   (skill, index) => (
  //                     <span
  //                       className="chip blue"
  //                       key={index}
  //                     >
  //                       {skill}
  //                     </span>
  //                   )
  //                 )}
  //               </div>
  //             ) : (
  //               <p style={{ color: "var(--muted)" }}>
  //                 No additional skills.
  //               </p>
  //             )}
  //           </div>

  //           {/* AI Recommendation */}
  //           <div
  //             className="card"
  //             style={{ marginTop: 18 }}
  //           >
  //             <h2>🤖 AI Learning Recommendation</h2>

  //             {recommendation ? (
  //               <Recommendation
  //                 data={recommendation}
  //               />
  //             ) : analysis.aiRecommendation &&
  //               Object.keys(
  //                 analysis.aiRecommendation
  //               ).length ? (
  //               <Recommendation
  //                 data={analysis.aiRecommendation}
  //               />
  //             ) : (
  //               <p style={{ color: "var(--muted)" }}>
  //                 No AI recommendation was returned.
  //                 The skill-gap report is still
  //                 available.
  //               </p>
  //             )}
  //           </div>
  //         </>
  //       )}
  //     </div>
  //   );
  // }

  // function Recommendation({ data }) {
  //   return (
  //     <div>
  //       {Object.entries(data).map(
  //         ([key, value]) => (
  //           <div
  //             key={key}
  //             style={{ marginBottom: 18 }}
  //           >
  //             <h4>
  //               {key
  //                 .replace(
  //                   /([A-Z])/g,
  //                   " $1"
  //                 )
  //                 .replace(/^./, (str) =>
  //                   str.toUpperCase()
  //                 )}
  //             </h4>

  //             {Array.isArray(value) ? (
  //               <div className="chips">
  //                 {value.map((item, index) => (
  //                   <span
  //                     className="chip"
  //                     key={index}
  //                   >
  //                     {typeof item === "object"
  //                       ? JSON.stringify(item)
  //                       : String(item)}
  //                   </span>
  //                 ))}
  //               </div>
  //             ) : typeof value === "object" &&
  //               value !== null ? (
  //               <pre
  //                 style={{
  //                   whiteSpace: "pre-wrap",
  //                   background: "#fafbfe",
  //                   padding: 12,
  //                   borderRadius: 10,
  //                   fontSize: 12,
  //                 }}
  //               >
  //                 {JSON.stringify(
  //                   value,
  //                   null,
  //                   2
  //                 )}
  //               </pre>
  //             ) : (
  //               <p>{String(value)}</p>
  //             )}
  //           </div>
  //         )
  //       )}
  //     </div>
  //   );
  // }

  // export default SkillGap;  
//   import { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";
// import API from "../../services/api";
// import "./SkillGap.css";

// function SkillGap() {
//   const [params] = useSearchParams();

//   const [user, setUser] = useState(null);
//   const [roles, setRoles] = useState([]);

//   const [selectedRole, setSelectedRole] = useState(
//     params.get("role") || ""
//   );

//   const [employeeId, setEmployeeId] = useState("");

//   const [analysis, setAnalysis] = useState(null);
//   const [recommendation, setRecommendation] = useState(null);

//   const [loadingUser, setLoadingUser] = useState(true);
//   const [loadingRoles, setLoadingRoles] = useState(true);
//   const [loadingAnalysis, setLoadingAnalysis] = useState(false);

//   const [error, setError] = useState("");

//   // --------------------------------------------------
//   // Load logged-in user and roles
//   // --------------------------------------------------
//   useEffect(() => {
//     fetchUser();
//     fetchRoles();
//   }, []);

//   // --------------------------------------------------
//   // Get currently logged-in user
//   // --------------------------------------------------
//   const fetchUser = async () => {
//     try {
//       setLoadingUser(true);
//       setError("");

//       const res = await API.get("/auth/me");

//       const loggedInUser = res.data.user;

//       console.log("Logged in user:", loggedInUser);

//       setUser(loggedInUser);

//       // IMPORTANT:
//       // Always use the logged-in user's ID.
//       setEmployeeId(loggedInUser._id);
//     } catch (err) {
//       console.error("Failed to fetch user:", err);

//       setError(
//         err.response?.data?.message ||
//           "Failed to load user information."
//       );
//     } finally {
//       setLoadingUser(false);
//     }
//   };

//   // --------------------------------------------------
//   // Get available roles
//   // --------------------------------------------------
//   const fetchRoles = async () => {
//     try {
//       setLoadingRoles(true);

//       const res = await API.get("/roles");

//       console.log("Roles:", res.data);

//       setRoles(res.data.roles || res.data || []);
//     } catch (err) {
//       console.error("Failed to load roles:", err);

//       setError(
//         err.response?.data?.message ||
//           "Failed to load roles."
//       );
//     } finally {
//       setLoadingRoles(false);
//     }
//   };

//   // --------------------------------------------------
//   // Generate Skill Gap Report
//   // --------------------------------------------------
//   const analyzeSkillGap = async (e) => {
//     e?.preventDefault();

//     setError("");

//     if (!employeeId) {
//       setError(
//         "Your user information could not be found. Please log in again."
//       );
//       return;
//     }

//     if (!selectedRole) {
//       setError("Please select a target role.");
//       return;
//     }

//     try {
//       setLoadingAnalysis(true);

//       setAnalysis(null);
//       setRecommendation(null);

//       console.log(
//         "Generating skill gap:",
//         employeeId,
//         selectedRole
//       );

      

//       // --------------------------------------------------
//       // Generate skill-gap report
//       // --------------------------------------------------

//       console.log("ROLE:", user?.role);
// console.log("EMPLOYEE ID:", employeeId);
// console.log("SELECTED ROLE:", selectedRole);
//       const res = await API.get(
//         `/skill-gap/${employeeId}/${selectedRole}`
//       );

//       console.log("Skill gap response:", res.data);

//       setAnalysis(res.data);

//       // --------------------------------------------------
//       // Get AI recommendation
//       // --------------------------------------------------
//       try {
//         const recommendationRes = await API.get(
//           `/recommendations/${employeeId}/${selectedRole}`
//         );

//         console.log(
//           "Recommendation response:",
//           recommendationRes.data
//         );

//         setRecommendation(
//           recommendationRes.data.recommendation
//         );
//       } catch (recErr) {
//         console.error(
//           "Recommendation error:",
//           recErr
//         );

//         // Recommendation is optional.
//         // Skill-gap report should still work.
//         if (recErr.response?.status !== 404) {
//           console.error(
//             "AI recommendation could not be loaded."
//           );
//         }
//       }
//     } catch (err) {
//       console.error(
//         "Skill gap error:",
//         err
//       );

//       setError(
//         err.response?.data?.message ||
//           "Failed to generate skill gap report."
//       );
//     } finally {
//       setLoadingAnalysis(false);
//     }
//   };

//   // --------------------------------------------------
//   // Match status
//   // --------------------------------------------------
//   const getStatus = (percentage) => {
//     if (percentage >= 80) {
//       return {
//         className: "excellent",
//         text: "Excellent Match",
//       };
//     }

//     if (percentage >= 50) {
//       return {
//         className: "good",
//         text: "Good Match",
//       };
//     }

//     if (percentage >= 20) {
//       return {
//         className: "average",
//         text: "Needs Improvement",
//       };
//     }

//     return {
//       className: "poor",
//       text: "Significant Skill Gap",
//     };
//   };

//   // --------------------------------------------------
//   // Loading screen
//   // --------------------------------------------------
//   if (loadingUser) {
//     return (
//       <div
//         className="container-page"
//         style={{
//           maxWidth: 1000,
//           textAlign: "center",
//           paddingTop: 80,
//         }}
//       >
//         <p style={{ color: "var(--muted)" }}>
//           Loading your profile...
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div
//       className="container-page"
//       style={{ maxWidth: 1000 }}
//     >
//       {/* ==================================================
//           HEADER
//       ================================================== */}

//       <div className="page-head">
//         <h1>
//           Skill Gap & Learning Recommendation
//         </h1>

//         <p>
//           Compare your current skills with the
//           skills required for a target role.
//         </p>
//       </div>

//       {/* ==================================================
//           ERROR
//       ================================================== */}

//       {error && (
//         <div className="alert alert-danger">
//           {error}
//         </div>
//       )}

//       {/* ==================================================
//           SELECTION CARD
//       ================================================== */}

//       <div className="card">
//         <form
//           onSubmit={analyzeSkillGap}
//           className="form-grid"
//         >
//           {/* ------------------------------------------------
//               Logged-in User
//           ------------------------------------------------ */}

//           <div className="field">
//             <label>Your Profile</label>

//             <input
//               value={
//                 user
//                   ? `${user.name} (${user.email})`
//                   : "Loading..."
//               }
//               disabled
//             />

//             <small
//               style={{
//                 color: "var(--muted)",
//                 display: "block",
//                 marginTop: 6,
//               }}
//             >
//               Skill gap analysis will use your
//               current skills.
//             </small>
//           </div>

//           {/* ------------------------------------------------
//               Target Role
//           ------------------------------------------------ */}

//           <div className="field">
//             <label>Target Role</label>

//             <select
//               required
//               value={selectedRole}
//               onChange={(e) => {
//                 setSelectedRole(e.target.value);

//                 // Clear previous analysis when
//                 // target role changes.
//                 setAnalysis(null);
//                 setRecommendation(null);
//                 setError("");
//               }}
//               disabled={loadingRoles}
//             >
//               <option value="">
//                 {loadingRoles
//                   ? "Loading roles..."
//                   : "Select Target Role"}
//               </option>

//               {roles.map((role) => (
//                 <option
//                   key={role._id}
//                   value={role._id}
//                 >
//                   {role.roleName}
//                   {role.department
//                     ? ` — ${role.department}`
//                     : ""}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* ------------------------------------------------
//               Generate Button
//           ------------------------------------------------ */}

//           <div className="field full">
//             <button
//               type="submit"
//               className="btn btn-primary"
//               disabled={
//                 loadingAnalysis ||
//                 loadingRoles ||
//                 !employeeId ||
//                 !selectedRole
//               }
//             >
//               {loadingAnalysis
//                 ? "Generating..."
//                 : "Generate Skill Gap Report"}
//             </button>
//           </div>
//         </form>
//       </div>

//       {/* ==================================================
//           LOADING ROLES
//       ================================================== */}

//       {loadingRoles && (
//         <p
//           style={{
//             color: "var(--muted)",
//             marginTop: 15,
//           }}
//         >
//           Loading target roles...
//         </p>
//       )}

//       {/* ==================================================
//           NO ROLES
//       ================================================== */}

//       {!loadingRoles && roles.length === 0 && (
//         <div
//           className="alert alert-danger"
//           style={{ marginTop: 18 }}
//         >
//           No target roles are available.
//           Please ask HR to create a role requirement.
//         </div>
//       )}

//       {/* ==================================================
//           ANALYSIS
//       ================================================== */}

//       {analysis && (
//         <>
//           {/* ==================================================
//               MATCH CARD
//           ================================================== */}

//           <div
//             className="card"
//             style={{ marginTop: 18 }}
//           >
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 gap: 20,
//                 flexWrap: "wrap",
//               }}
//             >
//               <div>
//                 <h2>
//                   {analysis.role?.roleName ||
//                     "Target Role"}
//                 </h2>

//                 <p
//                   style={{
//                     color: "var(--muted)",
//                   }}
//                 >
//                   Overall Match
//                 </p>
//               </div>

//               <div
//                 style={{
//                   textAlign: "right",
//                 }}
//               >
//                 <div
//                   style={{
//                     fontSize: 42,
//                     fontWeight: 700,
//                   }}
//                 >
//                   {analysis.matchPercentage || 0}%
//                 </div>

//                 {(() => {
//                   const status = getStatus(
//                     analysis.matchPercentage || 0
//                   );

//                   return (
//                     <span
//                       className={`status-badge ${status.className}`}
//                     >
//                       {status.text}
//                     </span>
//                   );
//                 })()}
//               </div>
//             </div>

//             {/* Progress Bar */}

//             <div
//               className="progress"
//               style={{ marginTop: 20 }}
//             >
//               <div
//                 className="progress-fill"
//                 style={{
//                   width: `${Math.min(
//                     analysis.matchPercentage || 0,
//                     100
//                   )}%`,
//                 }}
//               />
//             </div>

//             {/* ==================================================
//                 STATISTICS
//             ================================================== */}

//             <div
//               className="grid grid-3"
//               style={{ marginTop: 20 }}
//             >
//               <div className="card metric">
//                 <div className="label">
//                   Required Skills
//                 </div>

//                 <div className="value">
//                   {analysis.totalRequiredSkills ||
//                     0}
//                 </div>
//               </div>

//               <div className="card metric">
//                 <div className="label">
//                   Matched
//                 </div>

//                 <div className="value">
//                   {analysis.matchedSkills
//                     ?.length || 0}
//                 </div>
//               </div>

//               <div className="card metric">
//                 <div className="label">
//                   Missing
//                 </div>

//                 <div className="value">
//                   {analysis.missingSkills
//                     ?.length || 0}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* ==================================================
//               MATCHED + MISSING SKILLS
//           ================================================== */}

//           <div
//             className="grid grid-2"
//             style={{ marginTop: 18 }}
//           >
//             {/* Matched */}

//             <div className="card">
//               <h3>
//                 ✅ Matched Skills
//               </h3>

//               {analysis.matchedSkills?.length ? (
//                 <div className="chips">
//                   {analysis.matchedSkills.map(
//                     (skill, index) => (
//                       <span
//                         className="chip green"
//                         key={index}
//                       >
//                         {skill}
//                       </span>
//                     )
//                   )}
//                 </div>
//               ) : (
//                 <p
//                   style={{
//                     color: "var(--muted)",
//                   }}
//                 >
//                   No matched skills.
//                 </p>
//               )}
//             </div>

//             {/* Missing */}

//             <div className="card">
//               <h3>
//                 ❌ Missing Skills
//               </h3>

//               {analysis.missingSkills?.length ? (
//                 <div className="chips">
//                   {analysis.missingSkills.map(
//                     (skill, index) => (
//                       <span
//                         className="chip red"
//                         key={index}
//                       >
//                         {skill}
//                       </span>
//                     )
//                   )}
//                 </div>
//               ) : (
//                 <p
//                   style={{
//                     color: "var(--muted)",
//                   }}
//                 >
//                   No missing skills 🎉
//                 </p>
//               )}
//             </div>
//           </div>

//           {/* ==================================================
//               EXTRA SKILLS
//           ================================================== */}

//           <div
//             className="card"
//             style={{ marginTop: 18 }}
//           >
//             <h3>
//               ➕ Additional Skills
//             </h3>

//             {analysis.extraSkills?.length ? (
//               <div className="chips">
//                 {analysis.extraSkills.map(
//                   (skill, index) => (
//                     <span
//                       className="chip blue"
//                       key={index}
//                     >
//                       {skill}
//                     </span>
//                   )
//                 )}
//               </div>
//             ) : (
//               <p
//                 style={{
//                   color: "var(--muted)",
//                 }}
//               >
//                 No additional skills.
//               </p>
//             )}
//           </div>

//           {/* ==================================================
//               AI RECOMMENDATION
//           ================================================== */}

//           <div
//             className="card"
//             style={{ marginTop: 18 }}
//           >
//             <h2>
//               🤖 AI Learning Recommendation
//             </h2>

//             {recommendation ? (
//               <Recommendation
//                 data={recommendation}
//               />
//             ) : analysis.aiRecommendation &&
//               Object.keys(
//                 analysis.aiRecommendation
//               ).length ? (
//               <Recommendation
//                 data={analysis.aiRecommendation}
//               />
//             ) : (
//               <p
//                 style={{
//                   color: "var(--muted)",
//                 }}
//               >
//                 No AI recommendation was returned.
//                 The skill-gap report is still
//                 available.
//               </p>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// // ==================================================
// // AI Recommendation Component
// // ==================================================

// function Recommendation({ data }) {
//   if (!data || typeof data !== "object") {
//     return (
//       <p style={{ color: "var(--muted)" }}>
//         No recommendation available.
//       </p>
//     );
//   }

//   return (
//     <div>
//       {Object.entries(data).map(
//         ([key, value]) => (
//           <div
//             key={key}
//             style={{
//               marginBottom: 18,
//             }}
//           >
//             <h4>
//               {key
//                 .replace(
//                   /([A-Z])/g,
//                   " $1"
//                 )
//                 .replace(/^./, (str) =>
//                   str.toUpperCase()
//                 )}
//             </h4>

//             {Array.isArray(value) ? (
//               <div className="chips">
//                 {value.map(
//                   (item, index) => (
//                     <span
//                       className="chip"
//                       key={index}
//                     >
//                       {typeof item ===
//                       "object"
//                         ? JSON.stringify(
//                             item
//                           )
//                         : String(item)}
//                     </span>
//                   )
//                 )}
//               </div>
//             ) : typeof value === "object" &&
//               value !== null ? (
//               <pre
//                 style={{
//                   whiteSpace: "pre-wrap",
//                   background: "#fafbfe",
//                   padding: 12,
//                   borderRadius: 10,
//                   fontSize: 12,
//                 }}
//               >
//                 {JSON.stringify(
//                   value,
//                   null,
//                   2
//                 )}
//               </pre>
//             ) : (
//               <p>{String(value)}</p>
//             )}
//           </div>
//         )
//       )}
//     </div>
//   );
// }

// export default SkillGap;

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import API from "../../services/api";
import "./SkillGap.css";

function SkillGap() {
  const [params] = useSearchParams();

  const [user, setUser] = useState(null);
  const [employeeId, setEmployeeId] = useState("");

  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(
    params.get("role") || ""
  );

  const [analysis, setAnalysis] = useState(null);
  const [recommendation, setRecommendation] = useState(null);

  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingRoles, setLoadingRoles] = useState(true);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);

  const [error, setError] = useState("");

  // =========================================================
  // LOAD USER + ROLES
  // =========================================================

  useEffect(() => {
    fetchUser();
    fetchRoles();
  }, []);

  // =========================================================
  // GET LOGGED-IN USER
  // =========================================================

  const fetchUser = async () => {
    try {
      setLoadingUser(true);
      setError("");

      const res = await API.get("/auth/me");

      const loggedInUser = res.data.user;

      console.log(
        "Skill Gap - Logged in user:",
        loggedInUser
      );

      setUser(loggedInUser);

      const id =
        loggedInUser._id ||
        loggedInUser.id;

      if (!id) {
        throw new Error(
          "User ID was not found."
        );
      }

      // IMPORTANT:
      // Every user analyzes their OWN skills.
      setEmployeeId(id);

      console.log(
        "Skill Gap - Employee ID:",
        id
      );

    } catch (err) {
      console.error(
        "Failed to load user:",
        err
      );

      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to load user information."
      );

    } finally {
      setLoadingUser(false);
    }
  };

  // =========================================================
  // GET ROLES
  // =========================================================

  const fetchRoles = async () => {
    try {
      setLoadingRoles(true);

      const res = await API.get("/roles");

      console.log(
        "Skill Gap - Roles:",
        res.data
      );

      setRoles(
        res.data.roles ||
          res.data.data ||
          res.data ||
          []
      );

    } catch (err) {
      console.error(
        "Failed to load roles:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Failed to load roles."
      );

    } finally {
      setLoadingRoles(false);
    }
  };

  // =========================================================
  // GENERATE SKILL GAP
  // =========================================================

  const analyzeSkillGap = async (e) => {
    e.preventDefault();

    setError("");

    if (!employeeId) {
      setError(
        "Your user information could not be found. Please log in again."
      );
      return;
    }

    if (!selectedRole) {
      setError(
        "Please select a target role."
      );
      return;
    }

    try {
      setLoadingAnalysis(true);

      setAnalysis(null);
      setRecommendation(null);

      console.log(
        "Generating skill gap:",
        employeeId,
        selectedRole
      );

      console.log(
        "ROLE:",
        user?.role
      );

      console.log(
        "EMPLOYEE ID:",
        employeeId
      );

      console.log(
        "SELECTED ROLE:",
        selectedRole
      );

      // =====================================================
      // ONLY ONE API CALL
      //
      // The backend skill-gap controller already generates
      // and returns the AI recommendation.
      // =====================================================

      const res = await API.get(
        `/skill-gap/${employeeId}/${selectedRole}`
      );

      console.log(
        "Skill gap response:",
        res.data
      );

      setAnalysis(res.data);

      // AI recommendation comes directly
      // from the skill-gap API response.
      const aiRecommendation =
        res.data.aiRecommendation;

      console.log(
        "AI Recommendation:",
        aiRecommendation
      );

      if (
        aiRecommendation &&
        typeof aiRecommendation === "object" &&
        Object.keys(aiRecommendation).length > 0
      ) {
        setRecommendation(
          aiRecommendation
        );
      } else {
        setRecommendation(null);
      }

    } catch (err) {
      console.error(
        "Skill gap error:",
        err
      );

      console.error(
        "Backend response:",
        err.response?.data
      );

      setError(
        err.response?.data?.message ||
          "Failed to generate skill gap report."
      );

    } finally {
      setLoadingAnalysis(false);
    }
  };

  // =========================================================
  // MATCH STATUS
  // =========================================================

  const getStatus = (percentage) => {
    if (percentage >= 80) {
      return {
        className: "excellent",
        text: "Excellent Match",
      };
    }

    if (percentage >= 50) {
      return {
        className: "good",
        text: "Good Match",
      };
    }

    if (percentage >= 20) {
      return {
        className: "average",
        text: "Needs Improvement",
      };
    }

    return {
      className: "poor",
      text: "Significant Skill Gap",
    };
  };

  // =========================================================
  // LOADING USER
  // =========================================================

  if (loadingUser) {
    return (
      <div
        className="container-page"
        style={{
          maxWidth: 1000,
          textAlign: "center",
          paddingTop: 80,
        }}
      >
        <p
          style={{
            color: "var(--muted)",
          }}
        >
          Loading your profile...
        </p>
      </div>
    );
  }

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <div
      className="container-page"
      style={{
        maxWidth: 1000,
      }}
    >

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="page-head">
        <h1>
          Skill Gap & Learning Recommendation
        </h1>

        <p>
          Compare your current skills with
          the skills required for a target role.
        </p>
      </div>


      {/* =====================================================
          ERROR
      ===================================================== */}

      {error && (
        <div
          className="alert alert-danger"
          style={{
            marginBottom: 18,
          }}
        >
          {error}
        </div>
      )}


      {/* =====================================================
          SELECTION CARD
      ===================================================== */}

      <div className="card">

        <form
          onSubmit={analyzeSkillGap}
          className="form-grid"
        >

          {/* USER */}

          <div className="field">

            <label>
              Your Profile
            </label>

            <input
              type="text"
              value={
                user
                  ? `${user.name} (${user.email})`
                  : "Loading..."
              }
              disabled
            />

            <small
              style={{
                color: "var(--muted)",
                display: "block",
                marginTop: 6,
              }}
            >
              Skill gap analysis will use
              your current skills.
            </small>

          </div>


          {/* TARGET ROLE */}

          <div className="field">

            <label>
              Target Role
            </label>

            <select
              required
              value={selectedRole}
              onChange={(e) => {
                setSelectedRole(
                  e.target.value
                );

                setAnalysis(null);
                setRecommendation(null);
                setError("");
              }}
              disabled={loadingRoles}
            >

              <option value="">
                {loadingRoles
                  ? "Loading roles..."
                  : "Select Target Role"}
              </option>

              {roles.map((role) => (
                <option
                  key={role._id}
                  value={role._id}
                >
                  {role.roleName}
                  {role.department
                    ? ` — ${role.department}`
                    : ""}
                </option>
              ))}

            </select>

          </div>


          {/* BUTTON */}

          <div className="field full">

            <button
              type="submit"
              className="btn btn-primary"
              disabled={
                loadingAnalysis ||
                loadingRoles ||
                !employeeId ||
                !selectedRole
              }
            >
              {loadingAnalysis
                ? "Generating..."
                : "Generate Skill Gap Report"}
            </button>

          </div>

        </form>

      </div>


      {/* =====================================================
          LOADING ROLES
      ===================================================== */}

      {loadingRoles && (
        <p
          style={{
            color: "var(--muted)",
            marginTop: 15,
          }}
        >
          Loading target roles...
        </p>
      )}


      {/* =====================================================
          NO ROLES
      ===================================================== */}

      {!loadingRoles &&
        roles.length === 0 && (
          <div
            className="alert alert-danger"
            style={{
              marginTop: 18,
            }}
          >
            No target roles are available.
            Please ask HR to create a role
            requirement.
          </div>
        )}


      {/* =====================================================
          ANALYSIS RESULTS
      ===================================================== */}

      {analysis && (
        <>

          {/* =================================================
              MATCH CARD
          ================================================= */}

          <div
            className="card"
            style={{
              marginTop: 18,
            }}
          >

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 20,
                flexWrap: "wrap",
              }}
            >

              <div>

                <h2>
                  {analysis.role?.roleName ||
                    "Target Role"}
                </h2>

                <p
                  style={{
                    color: "var(--muted)",
                  }}
                >
                  Overall Match
                </p>

              </div>


              <div
                style={{
                  textAlign: "right",
                }}
              >

                <div
                  style={{
                    fontSize: 42,
                    fontWeight: 700,
                  }}
                >
                  {analysis.matchPercentage || 0}%
                </div>

                {(() => {
                  const status =
                    getStatus(
                      analysis.matchPercentage || 0
                    );

                  return (
                    <span
                      className={`status-badge ${status.className}`}
                    >
                      {status.text}
                    </span>
                  );
                })()}

              </div>

            </div>


            {/* PROGRESS BAR */}

            <div
              className="progress"
              style={{
                marginTop: 20,
              }}
            >

              <div
                className="progress-fill"
                style={{
                  width: `${Math.min(
                    analysis.matchPercentage || 0,
                    100
                  )}%`,
                }}
              />

            </div>


            {/* STATISTICS */}

            <div
              className="grid grid-3"
              style={{
                marginTop: 20,
              }}
            >

              <div className="card metric">

                <div className="label">
                  Required Skills
                </div>

                <div className="value">
                  {analysis.totalRequiredSkills || 0}
                </div>

              </div>


              <div className="card metric">

                <div className="label">
                  Matched
                </div>

                <div className="value">
                  {analysis.matchedSkills?.length || 0}
                </div>

              </div>


              <div className="card metric">

                <div className="label">
                  Missing
                </div>

                <div className="value">
                  {analysis.missingSkills?.length || 0}
                </div>

              </div>

            </div>

          </div>


          {/* =================================================
              MATCHED + MISSING
          ================================================= */}

          <div
            className="grid grid-2"
            style={{
              marginTop: 18,
            }}
          >

            {/* MATCHED */}

            <div className="card">

              <h3>
                ✅ Matched Skills
              </h3>

              {analysis.matchedSkills?.length ? (

                <div className="chips">

                  {analysis.matchedSkills.map(
                    (skill, index) => (
                      <span
                        className="chip green"
                        key={index}
                      >
                        {skill}
                      </span>
                    )
                  )}

                </div>

              ) : (

                <p
                  style={{
                    color: "var(--muted)",
                  }}
                >
                  No matched skills.
                </p>

              )}

            </div>


            {/* MISSING */}

            <div className="card">

              <h3>
                ❌ Missing Skills
              </h3>

              {analysis.missingSkills?.length ? (

                <div className="chips">

                  {analysis.missingSkills.map(
                    (skill, index) => (
                      <span
                        className="chip red"
                        key={index}
                      >
                        {skill}
                      </span>
                    )
                  )}

                </div>

              ) : (

                <p
                  style={{
                    color: "var(--muted)",
                  }}
                >
                  No missing skills 🎉
                </p>

              )}

            </div>

          </div>


          {/* =================================================
              EXTRA SKILLS
          ================================================= */}

          <div
            className="card"
            style={{
              marginTop: 18,
            }}
          >

            <h3>
              ➕ Additional Skills
            </h3>

            {analysis.extraSkills?.length ? (

              <div className="chips">

                {analysis.extraSkills.map(
                  (skill, index) => (
                    <span
                      className="chip blue"
                      key={index}
                    >
                      {skill}
                    </span>
                  )
                )}

              </div>

            ) : (

              <p
                style={{
                  color: "var(--muted)",
                }}
              >
                No additional skills.
              </p>

            )}

          </div>


          {/* =================================================
              AI LEARNING RECOMMENDATION
          ================================================= */}

          <div
            className="card"
            style={{
              marginTop: 18,
            }}
          >

            <h2>
              🤖 AI Learning Recommendation
            </h2>

            {recommendation ? (

              <Recommendation
                data={recommendation}
              />

            ) : (

              <div
                style={{
                  padding: 15,
                  background: "#fafbfe",
                  borderRadius: 10,
                }}
              >
                <p
                  style={{
                    margin: 0,
                    color: "var(--muted)",
                  }}
                >
                  No AI learning recommendation
                  was returned.
                </p>

                <small
                  style={{
                    color: "var(--muted)",
                  }}
                >
                  The skill-gap analysis itself
                  was generated successfully.
                </small>
              </div>

            )}

          </div>

        </>
      )}

    </div>
  );
}


// ============================================================
// AI RECOMMENDATION COMPONENT
// ============================================================

function Recommendation({ data }) {

  if (
    !data ||
    typeof data !== "object"
  ) {
    return (
      <p
        style={{
          color: "var(--muted)",
        }}
      >
        No recommendation available.
      </p>
    );
  }


  // SUMMARY

  const summary = data.summary;


  // PRIORITY SKILLS

  const prioritySkills =
    Array.isArray(data.prioritySkills)
      ? data.prioritySkills
      : [];


  // LEARNING PLAN

  const learningPlan =
    Array.isArray(data.learningPlan)
      ? data.learningPlan
      : [];


  // NEXT STEPS

  const nextSteps =
    Array.isArray(data.nextSteps)
      ? data.nextSteps
      : [];


  return (
    <div>

      {/* SUMMARY */}

      {summary && (
        <div
          style={{
            marginBottom: 24,
          }}
        >

          <h3>
            📌 Summary
          </h3>

          <p>
            {summary}
          </p>

        </div>
      )}


      {/* PRIORITY SKILLS */}

      {prioritySkills.length > 0 && (
        <div
          style={{
            marginBottom: 24,
          }}
        >

          <h3>
            🎯 Priority Skills
          </h3>

          <div className="chips">

            {prioritySkills.map(
              (skill, index) => (
                <span
                  className="chip"
                  key={index}
                >
                  {String(skill)}
                </span>
              )
            )}

          </div>

        </div>
      )}


      {/* LEARNING PLAN */}

      {learningPlan.length > 0 && (
        <div
          style={{
            marginBottom: 24,
          }}
        >

          <h3>
            📚 Learning Plan
          </h3>

          <div
            style={{
              display: "grid",
              gap: 14,
            }}
          >

            {learningPlan.map(
              (item, index) => {

                // Handle object format
                if (
                  typeof item === "object" &&
                  item !== null
                ) {
                  return (
                    <div
                      key={index}
                      style={{
                        padding: 16,
                        border: "1px solid #e7e7ef",
                        borderRadius: 12,
                        background: "#fff",
                      }}
                    >

                      {item.skill && (
                        <h4
                          style={{
                            marginTop: 0,
                          }}
                        >
                          {item.skill}
                        </h4>
                      )}

                      {item.recommendation && (
                        <p>
                          {item.recommendation}
                        </p>
                      )}

                      {Array.isArray(
                        item.resources
                      ) &&
                        item.resources.length > 0 && (
                          <div>

                            <strong>
                              Suggested Resources
                            </strong>

                            <ul>
                              {item.resources.map(
                                (
                                  resource,
                                  resourceIndex
                                ) => (
                                  <li
                                    key={
                                      resourceIndex
                                    }
                                  >
                                    {String(
                                      resource
                                    )}
                                  </li>
                                )
                              )}
                            </ul>

                          </div>
                        )}

                    </div>
                  );
                }

                // Handle simple string format
                return (
                  <div
                    key={index}
                    style={{
                      padding: 14,
                      border: "1px solid #e7e7ef",
                      borderRadius: 12,
                    }}
                  >
                    {String(item)}
                  </div>
                );
              }
            )}

          </div>

        </div>
      )}


      {/* NEXT STEPS */}

      {nextSteps.length > 0 && (
        <div>

          <h3>
            🚀 Next Steps
          </h3>

          <ol>

            {nextSteps.map(
              (step, index) => (
                <li
                  key={index}
                  style={{
                    marginBottom: 8,
                  }}
                >
                  {String(step)}
                </li>
              )
            )}

          </ol>

        </div>
      )}


      {/* FALLBACK FOR UNKNOWN JSON */}

      {!summary &&
        prioritySkills.length === 0 &&
        learningPlan.length === 0 &&
        nextSteps.length === 0 && (

          <pre
            style={{
              whiteSpace: "pre-wrap",
              background: "#fafbfe",
              padding: 15,
              borderRadius: 10,
              fontSize: 13,
            }}
          >
            {JSON.stringify(
              data,
              null,
              2
            )}
          </pre>

        )}

    </div>
  );
}

export default SkillGap;