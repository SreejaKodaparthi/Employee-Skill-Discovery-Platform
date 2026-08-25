// <<<<<<< HEAD
// import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// =======
// import { useEffect,useState } from "react";
// >>>>>>> c6f86c44d5302f3574bf087aaff748500c9fdaca
// import API from "../../services/api";

// <<<<<<< HEAD
// function Skills() {
//   const [skills, setSkills] = useState([]);
//   const location = useLocation();
// const parsedSkills = location.state?.parsedSkills || [];
// const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
//   const [formData, setFormData] = useState({
//     skillName: "",
//     category: "",
//     proficiencyLevel: "beginner",
//     yearsOfExperience: "",
//     source: "",
//   });
//   const [editingId, setEditingId] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchSkills();
//   }, []);
// useEffect(() => {
//   if (parsedSkills.length > 0) {
//     setCurrentSkillIndex(0);

//     setFormData({
//       skillName: parsedSkills[0],
//       category: "technical",
//       proficiencyLevel: "beginner",
//       yearsOfExperience: "",
//       source: "resume",
//     });
//   }
// }, [parsedSkills]);
//   const fetchSkills = async () => {
//     try {
//       const res = await API.get("/skills");
//       setSkills(res.data.skills || res.data || []);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//  const handleChange = (e) => {
//   const value =
//     e.target.type === "number"
//       ? e.target.value === ""
//         ? ""
//         : parseFloat(e.target.value)
//       : e.target.value;

//   setFormData((prev) => ({
//     ...prev,
//     [e.target.name]: value,
//   }));
// };

//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   setLoading(true);
//  const exists = skills.some(
//   (skill) =>
//     skill.skillName.toLowerCase() ===
//     formData.skillName.toLowerCase()
// );

// if (exists) {

//   if (
//     parsedSkills.length > 0 &&
//     currentSkillIndex < parsedSkills.length - 1
//   ) {

//     const next = currentSkillIndex + 1;

//     setCurrentSkillIndex(next);

//     setFormData({
//       skillName: parsedSkills[next],
//       category: "technical",
//       proficiencyLevel: "beginner",
//       yearsOfExperience: "",
//       source: "resume",
//     });

//     setLoading(false);
//     return;
//   }

//   setCurrentSkillIndex(parsedSkills.length);

//   setFormData({
//     skillName: "",
//     category: "",
//     proficiencyLevel: "beginner",
//     yearsOfExperience: "",
//     source: "",
//   });

//   setLoading(false);
//   return;
// }

//   try {
//     if (editingId) {
//       await API.put(`/skills/${editingId}`, formData);
//        alert("✅ Skill Updated Successfully!");
//     } else {
//       await API.post("/skills", formData);
//       alert("✅ Skill Added Successfully!");

//       // Resume flow
//       if (
//         parsedSkills.length > 0 &&
//         currentSkillIndex < parsedSkills.length - 1
//       ) {
//         const next = currentSkillIndex + 1;

//         setCurrentSkillIndex(next);

//         setFormData({
//           skillName: parsedSkills[next],
//           category: "technical",
//           proficiencyLevel: "beginner",
//           yearsOfExperience: "",
//           source: "resume",
//         });

//         fetchSkills();
//         return;
//       }
//     }

//     // Reset form after last skill or normal add
//     if (parsedSkills.length > 0) {
//   setCurrentSkillIndex(parsedSkills.length);
// }

//     setFormData({
//       skillName: "",
//       category: "",
//       proficiencyLevel: "beginner",
//       yearsOfExperience: "",
//       source: "",
//     });

//     setEditingId(null);
//     fetchSkills();

//   } catch (err) {
//     alert(err.response?.data?.message || "Something went wrong");
//   } finally {
//     setLoading(false);
//   }
// };

//   const editSkill = (skill) => {
//     setEditingId(skill._id);
//     setFormData({
//       skillName: skill.skillName,
//       category: skill.category || "",
//       proficiencyLevel: skill.proficiencyLevel || "beginner",
//       yearsOfExperience: skill.yearsOfExperience || "",
//       source: skill.source || "",
//       // endorsementCount: skill.endorsementCount || 0,
//     });
//   };

//   const deleteSkill = async (id) => {
//     if (!window.confirm("🗑️ Delete this skill?")) return;

//     try {
//       await API.delete(`/skills/${id}`);
//       fetchSkills();
//       alert("✅ Skill Deleted!");
//     } catch (err) {
//       alert(err.response?.data?.message || "Delete failed");
//     }
//   };

//   const cancelEdit = () => {
//     setEditingId(null);
//     setFormData({
//       skillName: "",
//       category: "",
//       proficiencyLevel: "beginner",
//       yearsOfExperience: "",
//       source: "",
//       // endorsementCount: 0,
//     });
//   };

//   return (
//     <div className="skills-page">
//       <h2>⚡ My Skills</h2>
//       <p className="subtitle">Showcase your expertise</p>
//       {parsedSkills.length > 0 &&
//  currentSkillIndex < parsedSkills.length && (

// <div className="resume-info">

// <h3>
// Resume Skill {currentSkillIndex + 1} of {parsedSkills.length}
// </h3>

// <p>
// This skill was extracted from your resume.
// Select the proficiency level and years of experience,
// then click Add.
// </p>

// </div>

// )}


//       <form className="skill-form" onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="skillName"
//           readOnly={parsedSkills.length > 0}
//           placeholder="Skill Name *"
//           value={formData.skillName}
//           onChange={handleChange}
//           required
//         />
        
// <select
//   name="category"
//   value={formData.category}
//   onChange={handleChange}
//   disabled={parsedSkills.length > 0}
//   required
// >
//   <option value="" disabled>
//     Select Category
//   </option>
//   <option value="technical">Technical Skill</option>
//   <option value="soft">Soft Skill</option>
// </select>
//         <select name="proficiencyLevel" value={formData.proficiencyLevel} onChange={handleChange}>
//           <option value="beginner">Beginner</option>
//           <option value="intermediate"> Intermediate</option>
//           <option value="advanced"> Advanced</option>
//           <option value="expert">Expert</option>
//         </select>
//         <input
//           type="number"
//           name="yearsOfExperience"
//           placeholder="Years"
//           value={formData.yearsOfExperience}
//           onChange={handleChange}
//           min="0"
//           step="0.5"
//         />
//         <select
//   name="source"
//   value={formData.source} disabled={parsedSkills.length > 0}
//   onChange={handleChange}
// >
//   <option value="">Select Source</option>
//   <option value="self">Self</option>
//   <option value="resume">Resume</option>
//   <option value="endorsed">Endorsed</option>
// </select>
//         {/* <input
//           type="number"
//           name="endorsementCount"
//           placeholder="Endorsements"
//           value={formData.endorsementCount}
//           onChange={handleChange}
//           min="0"
//         /> */}
//         <button type="submit" className="btn-submit" disabled={loading}>
//           {loading ? "Saving..." : editingId ? "✏️ Update" : "➕ Add"}
//         </button>
//         {editingId && (
//           <button type="button" className="btn-cancel" onClick={cancelEdit}>
//             ❌ Cancel
//           </button>
//         )}
//       </form>

//       <div className="table-container">
//         <table className="skills-table">
//           <thead>
//             <tr>
//               <th>Skill</th>
//               <th>Category</th>
//               <th>Level</th>
//               <th>Years</th>
//               <th>Source</th>
//               <th>Endorsements</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {skills.length === 0 ? (
//               <tr>
//                 <td colSpan="7" style={{ textAlign: "center", padding: "40px", color: "var(--text)" }}>
//                   No skills added yet. Start by adding one above! 🚀
//                 </td>
//               </tr>
//             ) : (
//               skills.map((skill) => (
//                 <tr key={skill._id}>
//                   <td><strong>{skill.skillName}</strong></td>
//                   <td>{skill.category || "-"}</td>
//                   <td>
//                     <span className={`proficiency-badge ${skill.proficiencyLevel}`}>
//                       {skill.proficiencyLevel}
//                     </span>
//                   </td>
//                   <td>{skill.yearsOfExperience || 0}</td>
//                   <td>{skill.source || "-"}</td>
//                   <td>{skill.endorsementCount || 0}</td>
//                   <td>
//                     <button className="btn-edit" onClick={() => editSkill(skill)}>
//                        Edit
//                     </button>
//                     <button className="btn-delete" onClick={() => deleteSkill(skill._id)}>
//                        Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default Skills;

// =======
// const blank={skillName:"",category:"technical",proficiencyLevel:"beginner",yearsOfExperience:0,source:"self"};
// export default function Skills(){
//  const [skills,setSkills]=useState([]),[catalog,setCatalog]=useState([]),[form,setForm]=useState(blank),[editing,setEditing]=useState(null),[loading,setLoading]=useState(false),[error,setError]=useState("");
//  const load=async()=>{try{const [s,c]=await Promise.all([API.get("/skills"),API.get("/skill-catalog")]);setSkills(s.data.skills||[]);setCatalog(c.data.skills||[]);}catch(e){setError(e.response?.data?.message||"Could not load skills.");}};
//  useEffect(()=>{load()},[]);
//  const submit=async e=>{e.preventDefault();setLoading(true);setError("");try{if(editing)await API.put(`/skills/${editing}`,form);else await API.post("/skills",form);setForm(blank);setEditing(null);await load();}catch(e){setError(e.response?.data?.message||"Skill save failed.");}finally{setLoading(false);}};
//  const edit=s=>{setEditing(s._id);setForm({skillName:s.skillName,category:s.category||"technical",proficiencyLevel:s.proficiencyLevel,yearsOfExperience:s.yearsOfExperience||0,source:s.source||"self"});};
//  const del=async id=>{if(!confirm("Delete this skill?"))return;try{await API.delete(`/skills/${id}`);load()}catch(e){setError(e.response?.data?.message||"Delete failed.")}};
//  return <div className="container-page"><div className="page-head"><h1>My Skills</h1><p>Skills are validated against the backend Skill Catalog.</p></div>{error&&<div className="alert alert-danger">{error}</div>}
//  <div className="card" style={{marginBottom:20}}><form onSubmit={submit} className="form-grid">
//  <div className="field full"><label>Skill name</label><input list="skill-options" required value={form.skillName} onChange={e=>setForm({...form,skillName:e.target.value})}/><datalist id="skill-options">{catalog.map(s=><option key={s._id} value={s.skillName}/>)}</datalist></div>
//  <div className="field"><label>Category</label><select value={form.category} onChange={e=>setForm({...form,category:e.target.value})}><option value="technical">Technical</option><option value="soft">Soft</option></select></div>
//  <div className="field"><label>Proficiency</label><select value={form.proficiencyLevel} onChange={e=>setForm({...form,proficiencyLevel:e.target.value})}>{["beginner","intermediate","advanced","expert"].map(x=><option key={x}>{x}</option>)}</select></div>
//  <div className="field"><label>Years of experience</label><input type="number" min="0" step=".5" value={form.yearsOfExperience} onChange={e=>setForm({...form,yearsOfExperience:Number(e.target.value)})}/></div>
//  <div className="field"><label>Source</label><select value={form.source} onChange={e=>setForm({...form,source:e.target.value})}>{["self","resume","endorsed"].map(x=><option key={x}>{x}</option>)}</select></div>
//  <div className="field full"><div className="actions"><button className="btn btn-primary" disabled={loading}>{loading?"Saving…":editing?"Update Skill":"Add Skill"}</button>{editing&&<button type="button" className="btn btn-secondary" onClick={()=>{setEditing(null);setForm(blank)}}>Cancel</button>}</div></div>
//  </form></div>
//  <div className="card table-wrap"><table className="data-table"><thead><tr><th>Skill</th><th>Category</th><th>Level</th><th>Years</th><th>Source</th><th>Actions</th></tr></thead><tbody>{skills.length?skills.map(s=><tr key={s._id}><td><strong>{s.skillName}</strong></td><td>{s.category}</td><td><span className="badge">{s.proficiencyLevel}</span></td><td>{s.yearsOfExperience||0}</td><td>{s.source}</td><td><button className="btn btn-secondary" onClick={()=>edit(s)}>Edit</button>{" "}<button className="btn btn-danger" onClick={()=>del(s._id)}>Delete</button></td></tr>):<tr><td colSpan="6">No skills added yet.</td></tr>}</tbody></table></div>
//  </div>;
// }
// >>>>>>> c6f86c44d5302f3574bf087aaff748500c9fdaca

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import API from "../../services/api";
import "./Skills.css";

const blank = {
  skillName: "",
  category: "",
  proficiencyLevel: "beginner",
  yearsOfExperience: "",
  source: "",
};

function Skills() {
  const location = useLocation();

  const parsedSkills = location.state?.parsedSkills || [];

  const [skills, setSkills] = useState([]);
  const [catalog, setCatalog] = useState([]);

  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);

  const [form, setForm] = useState(blank);

  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // -----------------------------
  // LOAD SKILLS + CATALOG
  // -----------------------------
  const load = async () => {
    try {
      setError("");

      const [skillsRes, catalogRes] = await Promise.all([
        API.get("/skills"),
        API.get("/skill-catalog"),
      ]);

      setSkills(
        skillsRes.data.skills || skillsRes.data || []
      );

      setCatalog(
        catalogRes.data.skills || catalogRes.data || []
      );
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Could not load skills."
      );
    }
  };

  useEffect(() => {
    load();
  }, []);

  // -----------------------------
  // RESUME FLOW
  // -----------------------------
  useEffect(() => {
    if (parsedSkills.length > 0) {
      setCurrentSkillIndex(0);

      setForm({
        skillName: parsedSkills[0],
        category: "",
        proficiencyLevel: "beginner",
        yearsOfExperience: "",
        source: "resume",
      });
    }
  }, [location.state]);

  // -----------------------------
  // HANDLE INPUT
  // -----------------------------
  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "number" && value !== ""
          ? Number(value)
          : value,
    }));
  };

  // -----------------------------
  // SUBMIT
  // -----------------------------
  const submit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      // --------------------------------
      // CHECK DUPLICATE
      // --------------------------------
      const exists = skills.some(
        (skill) =>
          skill.skillName?.toLowerCase() ===
            form.skillName?.trim().toLowerCase() &&
          skill._id !== editing
      );

      if (exists) {
        // If this is a resume flow,
        // skip duplicate and move to next skill.
        if (
          parsedSkills.length > 0 &&
          !editing
        ) {
          moveToNextResumeSkill();
          return;
        }

        setError(
          "This skill already exists in your profile."
        );

        return;
      }

      // --------------------------------
      // UPDATE
      // --------------------------------
      if (editing) {
        await API.put(
          `/skills/${editing}`,
          form
        );

        alert("✅ Skill Updated Successfully!");

        setEditing(null);
        setForm(blank);

        await load();

        return;
      }

      // --------------------------------
      // ADD
      // --------------------------------
      await API.post("/skills", form);

      // --------------------------------
      // RESUME FLOW
      // --------------------------------
      if (
        parsedSkills.length > 0 &&
        currentSkillIndex <
          parsedSkills.length - 1
      ) {
        moveToNextResumeSkill();

        await load();

        return;
      }

      // --------------------------------
      // NORMAL / LAST RESUME SKILL
      // --------------------------------
      if (parsedSkills.length > 0) {
        alert(
          "✅ All resume skills have been processed!"
        );
      } else {
        alert("✅ Skill Added Successfully!");
      }

      setCurrentSkillIndex(parsedSkills.length);

      setForm(blank);

      await load();
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Skill save failed."
      );
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // MOVE TO NEXT RESUME SKILL
  // -----------------------------
  const moveToNextResumeSkill = () => {
    const nextIndex =
      currentSkillIndex + 1;

    if (
      nextIndex >= parsedSkills.length
    ) {
      setCurrentSkillIndex(
        parsedSkills.length
      );

      setForm(blank);

      return;
    }

    setCurrentSkillIndex(nextIndex);

    setForm({
      skillName: parsedSkills[nextIndex],
      category: "",
      proficiencyLevel: "beginner",
      yearsOfExperience: "",
      source: "resume",
    });
  };

  // -----------------------------
  // EDIT
  // -----------------------------
  const edit = (skill) => {
    setEditing(skill._id);

    setForm({
      skillName: skill.skillName || "",
      category: skill.category || "",
      proficiencyLevel:
        skill.proficiencyLevel || "beginner",
      yearsOfExperience:
        skill.yearsOfExperience ?? "",
      source: skill.source || "self",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // -----------------------------
  // DELETE
  // -----------------------------
  const remove = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this skill?"
      )
    ) {
      return;
    }

    try {
      await API.delete(`/skills/${id}`);

      await load();

      alert("✅ Skill Deleted!");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Delete failed."
      );
    }
  };

  // -----------------------------
  // CANCEL EDIT
  // -----------------------------
  const cancelEdit = () => {
    setEditing(null);

    setForm(blank);
  };

  const isResumeFlow =
    parsedSkills.length > 0 &&
    currentSkillIndex <
      parsedSkills.length;

  return (
    <div className="container-page">

      {/* HEADER */}
      <div className="page-head">
        <h1>My Skills</h1>

        <p>
          Manage your skills, proficiency and
          experience.
        </p>
      </div>

      {/* ERROR */}
      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {/* RESUME INFO */}
      {isResumeFlow && (
        <div
          className="card"
          style={{ marginBottom: 20 }}
        >
          <h3>
            📄 Resume Skill{" "}
            {currentSkillIndex + 1} of{" "}
            {parsedSkills.length}
          </h3>

          <p
            style={{
              color: "var(--muted)",
            }}
          >
            This skill was extracted from your
            resume. Select the category,
            proficiency level and years of
            experience, then click Add.
          </p>
        </div>
      )}

      {/* FORM */}
      <div
        className="card"
        style={{ marginBottom: 20 }}
      >
        <form
          onSubmit={submit}
          className="form-grid"
        >

          {/* SKILL NAME */}
          <div className="field full">
            <label>Skill Name</label>

            <input
              list="skill-options"
              name="skillName"
              value={form.skillName}
              onChange={handleChange}
              readOnly={isResumeFlow}
              placeholder="Enter or select a skill"
              required
            />

            <datalist id="skill-options">
              {catalog.map((skill) => (
                <option
                  key={skill._id}
                  value={skill.skillName}
                />
              ))}
            </datalist>
          </div>

          {/* CATEGORY */}
          <div className="field">
            <label>Category</label>

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Category
              </option>

              <option value="technical">
                Technical Skill
              </option>

              <option value="soft">
                Soft Skill
              </option>
            </select>
          </div>

          {/* PROFICIENCY */}
          <div className="field">
            <label>Proficiency</label>

            <select
              name="proficiencyLevel"
              value={form.proficiencyLevel}
              onChange={handleChange}
              required
            >
              <option value="beginner">
                Beginner
              </option>

              <option value="intermediate">
                Intermediate
              </option>

              <option value="advanced">
                Advanced
              </option>

              <option value="expert">
                Expert
              </option>
            </select>
          </div>

          {/* EXPERIENCE */}
          <div className="field">
            <label>
              Years of Experience
            </label>

            <input
              type="number"
              name="yearsOfExperience"
              min="0"
              step="0.5"
              value={
                form.yearsOfExperience
              }
              onChange={handleChange}
              placeholder="0"
              required
            />
          </div>

          {/* SOURCE */}
          <div className="field">
            <label>Source</label>

            <select
              name="source"
              value={form.source}
              onChange={handleChange}
              disabled={isResumeFlow}
              required
            >
              <option value="" disabled>
                Select Source
              </option>

              <option value="self">
                Self
              </option>

              <option value="resume">
                Resume
              </option>

              {/* <option value="endorsed">
                Endorsed
              </option> */}
            </select>
          </div>

          {/* BUTTONS */}
          <div className="field full">
            <div className="actions">

              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading
                  ? "Saving..."
                  : editing
                  ? "Update Skill"
                  : "Add Skill"}
              </button>

              {editing && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={cancelEdit}
                >
                  Cancel
                </button>
              )}

            </div>
          </div>

        </form>
      </div>

      {/* SKILLS TABLE */}
      <div className="card table-wrap">

        <table className="data-table">

          <thead>
            <tr>
              <th>Skill</th>
              <th>Category</th>
              <th>Level</th>
              <th>Years</th>
              <th>Source</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {skills.length > 0 ? (
              skills.map((skill) => (
                <tr key={skill._id}>

                  <td>
                    <strong>
                      {skill.skillName}
                    </strong>
                  </td>

                  <td>
                    {skill.category || "-"}
                  </td>

                  <td>
                    <span className="badge">
                      {skill.proficiencyLevel}
                    </span>
                  </td>

                  <td>
                    {skill.yearsOfExperience ||
                      0}
                  </td>

                  <td>
                    {skill.source || "-"}
                  </td>

                  <td>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() =>
                        edit(skill)
                      }
                    >
                      Edit
                    </button>

                    {" "}

                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() =>
                        remove(skill._id)
                      }
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  style={{
                    textAlign: "center",
                    padding: "30px",
                  }}
                >
                  No skills added yet.
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Skills;