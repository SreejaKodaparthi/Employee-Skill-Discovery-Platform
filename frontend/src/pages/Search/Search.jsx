// import { useState } from "react";
// import { Link } from "react-router-dom";
// import API from "../../services/api";
// import { useAuth } from "../../context/AuthContext";

// <<<<<<< HEAD
// function Search() {
//   const { user } = useAuth();

//   const [filter, setFilter] = useState({
//     skills: "",
//     department: "",
//     designation: "",
//     location: "",
//     education: "",
//     certification: "",
//     minExperience: "",
//     maxExperience: "",
//     minProficiency: "",
//     matchMode: "any",
//   });

//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searched, setSearched] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setFilter({
//       ...filter,
//       [e.target.name]: e.target.value,
//     });
//     setError("");
//   };

//   const handleSearch = async (e) => {
//     e.preventDefault();

//     const allowedRoles = ["manager", "hr"];

//     if (!allowedRoles.includes(user?.role)) {
//       setError(
//         "❌ Access denied. Only Managers, HR and L&D can search."
//       );
//       return;
//     }

//     setLoading(true);
//     setSearched(true);
//     setError("");

//     try {
//       const params = {};

//       Object.keys(filter).forEach((key) => {
//         if (filter[key] !== "") {
//           params[key] = filter[key];
//         }
//       });

//       const res = await API.get("/search/advanced", {
//         params,
//       });

//       setResults(res.data.results || []);
//     } catch (err) {
//       if (err.response?.status === 403) {
//         setError(
//           "❌ You don't have permission to search employees."
//         );
//       } else {
//         setError(
//           err.response?.data?.message ||
//             "Search failed"
//         );
//       }

//       setResults([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="search-page">
//       <h2>🔍 Advanced Employee Search</h2>

//       <p className="subtitle">
//         Search employees by skills, department,
//         certifications and experience
//       </p>

//       {user?.role &&
//         !["manager", "hr", "ld"].includes(user.role) && (
//           <div className="alert alert-warning">
//             ⚠️ Only Managers, HR and L&D can
//             perform employee searches.
//           </div>
//         )}

//       {error && (
//         <div className="alert alert-danger">
//           {error}
//         </div>
//       )}

//       <form
//         className="search-form"
//         onSubmit={handleSearch}
//       >
//         <input
//           type="text"
//           name="skills"
//           placeholder="Skills (React, Java, Python)"
//           value={filter.skills}
//           onChange={handleChange}
//         />

//         <input
//           type="text"
//           name="department"
//           placeholder="Department"
//           value={filter.department}
//           onChange={handleChange}
//         />

//         <input
//           type="text"
//           name="designation"
//           placeholder="Designation"
//           value={filter.designation}
//           onChange={handleChange}
//         />

//         <input
//           type="text"
//           name="location"
//           placeholder="Location"
//           value={filter.location}
//           onChange={handleChange}
//         />

//         <input
//           type="text"
//           name="education"
//           placeholder="Education"
//           value={filter.education}
//           onChange={handleChange}
//         />

//         <input
//           type="text"
//           name="certification"
//           placeholder="Certification"
//           value={filter.certification}
//           onChange={handleChange}
//         />

//         <input
//           type="number"
//           name="minExperience"
//           placeholder="Min Experience"
//           value={filter.minExperience}
//           onChange={handleChange}
//           min="0"
//         />

//         <input
//           type="number"
//           name="maxExperience"
//           placeholder="Max Experience"
//           value={filter.maxExperience}
//           onChange={handleChange}
//           min="0"
//         />

//         <select
//           name="minProficiency"
//           value={filter.minProficiency}
//           onChange={handleChange}
//         >
//           <option value="">
//             Minimum Proficiency
//           </option>
//           <option value="beginner">
//             Beginner
//           </option>
//           <option value="intermediate">
//             Intermediate
//           </option>
//           <option value="advanced">
//             Advanced
//           </option>
//           <option value="expert">
//             Expert
//           </option>
//         </select>

//         <select
//           name="matchMode"
//           value={filter.matchMode}
//           onChange={handleChange}
//         >
//           <option value="any">
//             Match Any Skill
//           </option>
//           <option value="all">
//             Match All Skills
//           </option>
//         </select>

//         <button
//           type="submit"
//           className="btn-search"
//           disabled={
//             loading ||
//             !["manager", "hr", "ld"].includes(
//               user?.role
//             )
//           }
//         >
//           {loading
//             ? "Searching..."
//             : "🔍 Search"}
//         </button>
//       </form>
//             {searched &&
//         results.length === 0 &&
//         !loading &&
//         !error && (
//           <div className="no-results">
//             <span className="icon">🔍</span>
//             <h3>No Employees Found</h3>
//             <p>
//               Try changing the search filters.
//             </p>
//           </div>
//         )}

//       {results.length > 0 && (
//         <div className="results-grid">
//           {results.map((item, index) => (
//             <div
//               className="employee-card"
//               key={index}
//             >
//               <h3>
//                 👤{" "}
//                 {item.employee?.name ||
//                   "Employee"}
//               </h3>

//               <p className="email">
//                 {item.employee?.email}
//               </p>

//               <div className="info-row">
//                 <span>🏢 Department</span>
//                 <span>
//                   {item.profile?.department ||
//                     "-"}
//                 </span>
//               </div>

//               <div className="info-row">
//                 <span>💼 Designation</span>
//                 <span>
//                   {item.profile?.designation ||
//                     "-"}
//                 </span>
//               </div>

//               <div className="info-row">
//                 <span>📍 Location</span>
//                 <span>
//                   {item.profile?.location ||
//                     "-"}
//                 </span>
//               </div>

//               <div className="info-row">
//                 <span>🎓 Education</span>
//                 <span>
//                   {item.profile?.education ||
//                     "-"}
//                 </span>
//               </div>

//               <div className="match-score">
//                 🏆 Match Score :
//                 <strong>
//                   {" "}
//                   {item.matchScore}
//                 </strong>
//               </div>
//               <div className="match-score">
//                 🛡️ Trust Score :
//                 <strong>{item.trustScore}/100</strong>
//                 </div>


//               {item.matchPercentage !== null && (
//                 <div className="match-score">
//                   🎯 Match Percentage :
//                   <strong>
//                     {" "}
//                     {item.matchPercentage}%
//                   </strong>
//                 </div>
//               )}

//               <div
//                 style={{
//                   marginTop: "15px",
//                 }}
//               >
//                 <strong>
//                   ✅ Matched Skills
//                 </strong>

//                 <div
//                   style={{
//                     marginTop: "8px",
//                   }}
//                 >
//                   {item.matchedSkills?.length >
//                   0 ? (
//                     item.matchedSkills.map(
//                       (skill) => (
//                         <span
//                           key={skill._id}
//                           className="skill-tag"
//                         >
//                           {skill.skillName}
//                           {" ("}
//                           {
//                             skill.proficiencyLevel
//                           }
//                           {")"}
//                         </span>
//                       )
//                     )
//                   ) : (
//                     <p>No matching skills</p>
//                   )}
//                 </div>
//               </div>

//               {item.certifications?.length >
//                 0 && (
//                 <div
//                   style={{
//                     marginTop: "15px",
//                   }}
//                 >
//                   <strong>
//                     📜 Certifications
//                   </strong>

//                   <div
//                     style={{
//                       marginTop: "8px",
//                     }}
//                   >
//                     {item.certifications.map(
//                       (cert, idx) => (
//                         <span
//                           key={idx}
//                           className="skill-tag"
//                         >
//                           {
//                             cert.certificationName
//                           }
//                         </span>
//                       )
//                     )}
//                   </div>
//                 </div>
//               )}

//               {item.scoreBreakdown && (
//                 <div
//                   style={{
//                     marginTop: "15px",
//                     fontSize: "13px",
//                     color: "#666",
//                   }}
//                 >
//                   <strong>
//                     Score Breakdown
//                   </strong>

//                   <p>
//                     Skill Score :{" "}
//                     {
//                       item.scoreBreakdown
//                         .skillScore
//                     }
//                   </p>

//                   <p>
//                     Skill-Matched Coverage Bonus :{" "}
//                     {
//                       item.scoreBreakdown
//                         .skillCoverageBonus
//                     }
//                   </p>

//                   <p>
//                     Skill-Matched Certification Bonus :{" "}
//                     {
//                       item.scoreBreakdown
//                         .certificationBonus
//                     }
//                   </p>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// =======
// const blank={skills:"",matchMode:"any",department:"",designation:"",location:"",education:"",certification:"",minExperience:"",maxExperience:"",minProficiency:"",page:1,limit:10};
// export default function Search(){
//  const {user}=useAuth();const [filters,setFilters]=useState(blank),[results,setResults]=useState([]),[meta,setMeta]=useState({}),[loading,setLoading]=useState(false),[error,setError]=useState("");
//  const search=async(page=1)=>{setLoading(true);setError("");try{const params={...filters,page};Object.keys(params).forEach(k=>{if(params[k]==="")delete params[k]});const r=await API.get("/search/advanced",{params});setResults(r.data.results||[]);setMeta(r.data)}catch(e){setResults([]);setError(e.response?.data?.message||"Search failed.")}finally{setLoading(false)}};
//  return <div className="container-page"><div className="page-head"><h1>Advanced Employee Search</h1><p>Available to Managers, HR and L&D. Results include match and trust scores.</p></div>{error&&<div className="alert alert-danger">{error}</div>}
//  <div className="card" style={{marginBottom:20}}><form onSubmit={e=>{e.preventDefault();search(1)}} className="form-grid">
//  {["skills","department","designation","location","education","certification"].map(k=><div className="field" key={k}><label>{k[0].toUpperCase()+k.slice(1)}</label><input placeholder={k==="skills"?"React, Java, Python":""} value={filters[k]} onChange={e=>setFilters({...filters,[k]:e.target.value})}/></div>)}
//  <div className="field"><label>Min experience</label><input type="number" min="0" value={filters.minExperience} onChange={e=>setFilters({...filters,minExperience:e.target.value})}/></div>
//  <div className="field"><label>Max experience</label><input type="number" min="0" value={filters.maxExperience} onChange={e=>setFilters({...filters,maxExperience:e.target.value})}/></div>
//  <div className="field"><label>Minimum proficiency</label><select value={filters.minProficiency} onChange={e=>setFilters({...filters,minProficiency:e.target.value})}><option value="">Any</option>{["beginner","intermediate","advanced","expert"].map(x=><option key={x}>{x}</option>)}</select></div>
//  <div className="field"><label>Skill matching</label><select value={filters.matchMode} onChange={e=>setFilters({...filters,matchMode:e.target.value})}><option value="any">Any requested skill</option><option value="all">All requested skills</option></select></div>
//  <div className="field full"><button className="btn btn-primary" disabled={loading}>{loading?"Searching…":"Search Employees"}</button></div>
//  </form></div>
//  {results.length===0&&!loading?<div className="card">No matching employees. Add at least one filter and search again.</div>:<div className="grid">{results.map(x=><div className="card" key={x.employee?._id}>
//  <div style={{display:"flex",justifyContent:"space-between",gap:10}}><div><h3 style={{margin:"0 0 4px"}}>{x.employee?.name}</h3><p style={{margin:0,color:"var(--muted)",fontSize:13}}>{x.employee?.email} · {x.profile?.designation||"Employee"}</p></div><span className="badge">Match {x.matchPercentage??"—"}%</span></div>
//  <div className="grid grid-3" style={{marginTop:18}}><div><small>Match score</small><strong style={{display:"block"}}>{x.matchScore}</strong></div><div><small>Trust score</small><strong style={{display:"block"}}>{x.trustScore}/100</strong></div><div><small>Location</small><strong style={{display:"block"}}>{x.profile?.location||"—"}</strong></div></div>
//  <p style={{fontWeight:700,marginBottom:7}}>Matched skills</p><div className="chips">{(x.matchedSkills||[]).map(s=><span className="chip" key={s._id}>{s.skillName} · {s.proficiencyLevel}</span>)}</div>
//  <p style={{fontWeight:700,marginBottom:7,marginTop:15}}>Certifications</p><div className="chips">{(x.certifications||[]).map(c=><span className="chip" key={c._id}>{c.certificationName}</span>)}</div>
//  <div className="actions"><Link className="btn btn-secondary" to={`/skill-gap?employee=${x.employee?._id}`}>Skill Gap</Link></div>
//  </div>)}</div>}
//  {meta.totalPages>1&&<div className="actions" style={{justifyContent:"center"}}><button className="btn btn-secondary" disabled={meta.page<=1||loading} onClick={()=>search(meta.page-1)}>Previous</button><span style={{alignSelf:"center"}}>Page {meta.page} / {meta.totalPages}</span><button className="btn btn-secondary" disabled={meta.page>=meta.totalPages||loading} onClick={()=>search(meta.page+1)}>Next</button></div>}
//  </div>;
// >>>>>>> c6f86c44d5302f3574bf087aaff748500c9fdaca
// }
import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const initialFilters = {
  skills: "",
  matchMode: "any",
  department: "",
  designation: "",
  location: "",
  education: "",
  certification: "",
  minExperience: "",
  maxExperience: "",
  minProficiency: "",
};

export default function Search() {
  const { user } = useAuth();

  const [filters, setFilters] = useState(initialFilters);
  const [results, setResults] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");

  const allowedRoles = ["manager", "hr", "ld"];

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const search = async (page = 1) => {
    if (!allowedRoles.includes(user?.role)) {
      setError(
        "❌ Access denied. Only Managers, HR and L&D can search employees."
      );
      return;
    }

    setLoading(true);
    setSearched(true);
    setError("");

    try {
      const params = {
        ...filters,
        page,
        limit: 10,
      };

      Object.keys(params).forEach((key) => {
        if (params[key] === "") {
          delete params[key];
        }
      });

      const res = await API.get("/search/advanced", {
        params,
      });

      setResults(res.data.results || []);
      setMeta(res.data);
    } catch (err) {
      console.error("Search error:", err);

      if (err.response?.status === 403) {
        setError(
          "❌ You don't have permission to search employees."
        );
      } else {
        setError(
          err.response?.data?.message || "Search failed."
        );
      }

      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    search(1);
  };

  return (
    <div className="container-page">

      {/* Header */}
      <div className="page-head">
        <h1>Advanced Employee Search</h1>

        <p>
          Available to Managers, HR and L&D. Results include
          match and trust scores.
        </p>
      </div>

      {/* Access warning */}
      {user?.role &&
        !allowedRoles.includes(user.role) && (
          <div className="alert alert-warning">
            ⚠️ Only Managers, HR and L&D can perform
            employee searches.
          </div>
        )}

      {/* Error */}
      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {/* Search form */}
      <div
        className="card"
        style={{ marginBottom: 20 }}
      >
        <form
          onSubmit={handleSearch}
          className="form-grid"
        >

          <div className="field">
            <label>Skills</label>

            <input
              name="skills"
              placeholder="React, Java, Python"
              value={filters.skills}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <label>Department</label>

            <input
              name="department"
              value={filters.department}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <label>Designation</label>

            <input
              name="designation"
              value={filters.designation}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <label>Location</label>

            <input
              name="location"
              value={filters.location}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <label>Education</label>

            <input
              name="education"
              value={filters.education}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <label>Certification</label>

            <input
              name="certification"
              value={filters.certification}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <label>Min Experience</label>

            <input
              type="number"
              name="minExperience"
              min="0"
              value={filters.minExperience}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <label>Max Experience</label>

            <input
              type="number"
              name="maxExperience"
              min="0"
              value={filters.maxExperience}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <label>Minimum Proficiency</label>

            <select
              name="minProficiency"
              value={filters.minProficiency}
              onChange={handleChange}
            >
              <option value="">Any</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">
                Intermediate
              </option>
              <option value="advanced">Advanced</option>
              <option value="expert">Expert</option>
            </select>
          </div>

          <div className="field">
            <label>Skill Matching</label>

            <select
              name="matchMode"
              value={filters.matchMode}
              onChange={handleChange}
            >
              <option value="any">
                Any requested skill
              </option>

              <option value="all">
                All requested skills
              </option>
            </select>
          </div>

          <div className="field full">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={
                loading ||
                !allowedRoles.includes(user?.role)
              }
            >
              {loading
                ? "Searching..."
                : "🔍 Search Employees"}
            </button>
          </div>

        </form>
      </div>

      {/* No results */}
      {searched &&
        results.length === 0 &&
        !loading &&
        !error && (
          <div className="card">
            <h3>No Employees Found</h3>

            <p>
              Try changing the search filters.
            </p>
          </div>
        )}

      {/* Results */}
      {results.length > 0 && (
        <div className="grid">

          {results.map((item, index) => (
            <div
              className="card"
              key={item.employee?._id || index}
            >

              {/* Employee header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 10,
                }}
              >
                <div>
                  <h3
                    style={{
                      margin: "0 0 4px",
                    }}
                  >
                    👤 {item.employee?.name || "Employee"}
                  </h3>

                  <p
                    style={{
                      margin: 0,
                      color: "var(--muted)",
                      fontSize: 13,
                    }}
                  >
                    {item.employee?.email}
                    {" · "}
                    {item.profile?.designation ||
                      "Employee"}
                  </p>
                </div>

                <span className="badge">
                  Match{" "}
                  {item.matchPercentage ?? "—"}%
                </span>
              </div>

              {/* Basic information */}
              <div
                className="grid grid-3"
                style={{ marginTop: 18 }}
              >

                <div>
                  <small>Match Score</small>

                  <strong
                    style={{ display: "block" }}
                  >
                    {item.matchScore ?? "—"}
                  </strong>
                </div>

                <div>
                  <small>Trust Score</small>

                  <strong
                    style={{ display: "block" }}
                  >
                    {item.trustScore ?? 0}/100
                  </strong>
                </div>

                <div>
                  <small>Location</small>

                  <strong
                    style={{ display: "block" }}
                  >
                    {item.profile?.location || "—"}
                  </strong>
                </div>

              </div>

              {/* Department */}
              <div style={{ marginTop: 15 }}>
                <strong>🏢 Department</strong>

                <p>
                  {item.profile?.department || "-"}
                </p>
              </div>

              {/* Education */}
              <div>
                <strong>🎓 Education</strong>

                <p>
                  {item.profile?.education || "-"}
                </p>
              </div>

              {/* Matched skills */}
              <div style={{ marginTop: 15 }}>
                <p
                  style={{
                    fontWeight: 700,
                    marginBottom: 7,
                  }}
                >
                  ✅ Matched Skills
                </p>

                <div className="chips">
                  {item.matchedSkills?.length > 0 ? (
                    item.matchedSkills.map((skill) => (
                      <span
                        className="chip"
                        key={skill._id}
                      >
                        {skill.skillName}
                        {" · "}
                        {skill.proficiencyLevel}
                      </span>
                    ))
                  ) : (
                    <p>No matching skills</p>
                  )}
                </div>
              </div>

              {/* Certifications */}
              <div style={{ marginTop: 15 }}>
                <p
                  style={{
                    fontWeight: 700,
                    marginBottom: 7,
                  }}
                >
                  📜 Certifications
                </p>

                <div className="chips">
                  {item.certifications?.length > 0 ? (
                    item.certifications.map(
                      (cert, idx) => (
                        <span
                          className="chip"
                          key={cert._id || idx}
                        >
                          {cert.certificationName}
                        </span>
                      )
                    )
                  ) : (
                    <span className="chip">
                      No certifications
                    </span>
                  )}
                </div>
              </div>

              {/* Score breakdown */}
              {item.scoreBreakdown && (
                <div
                  style={{
                    marginTop: 15,
                    fontSize: 13,
                    color: "var(--muted)",
                  }}
                >
                  <strong>Score Breakdown</strong>

                  <p>
                    Skill Score:{" "}
                    {
                      item.scoreBreakdown
                        .skillScore
                    }
                  </p>

                  <p>
                    Skill Coverage Bonus:{" "}
                    {
                      item.scoreBreakdown
                        .skillCoverageBonus
                    }
                  </p>

                  <p>
                    Certification Bonus:{" "}
                    {
                      item.scoreBreakdown
                        .certificationBonus
                    }
                  </p>
                </div>
              )}

              {/* Actions */}
              <div
                className="actions"
                style={{ marginTop: 18 }}
              >
                <Link
                  className="btn btn-secondary"
                  to={`/skill-gap?employee=${item.employee?._id}`}
                >
                  Skill Gap
                </Link>
              </div>

            </div>
          ))}

        </div>
      )}

      {/* Pagination */}
      {meta.totalPages > 1 && (
        <div
          className="actions"
          style={{
            justifyContent: "center",
            marginTop: 20,
          }}
        >

          <button
            className="btn btn-secondary"
            disabled={
              meta.page <= 1 || loading
            }
            onClick={() =>
              search(meta.page - 1)
            }
          >
            Previous
          </button>

          <span
            style={{
              alignSelf: "center",
            }}
          >
            Page {meta.page} / {meta.totalPages}
          </span>

          <button
            className="btn btn-secondary"
            disabled={
              meta.page >= meta.totalPages ||
              loading
            }
            onClick={() =>
              search(meta.page + 1)
            }
          >
            Next
          </button>

        </div>
      )}

    </div>
  );
}