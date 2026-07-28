import { useEffect, useState } from "react";
import API from "../../services/api";
import "./SkillGap.css";

function SkillGap() {
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [analysis, setAnalysis] = useState(null);

  const [loadingRoles, setLoadingRoles] = useState(true);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUser();
    fetchRoles();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await API.get("/auth/me");
      setUser(res.data.user);
    } catch (err) {
      console.error(err);
    }
  };

const fetchRoles = async () => {
  try {
    const res = await API.get("/roles");

    console.log("Roles Response:", res.data);

    setRoles(res.data.roles || res.data);
  } catch (err) {
    console.error(err);
    setError("Failed to load roles");
  } finally {
    setLoadingRoles(false);
  }
  };

  const analyzeSkillGap = async () => {
    if (!selectedRole) {
      alert("Please select a role");
      return;
    }

    try {
      setLoadingAnalysis(true);

      const res = await API.get(
        `/skill-gap/${user._id}/${selectedRole}`
      );

      setAnalysis(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to generate skill gap report");
    } finally {
      setLoadingAnalysis(false);
    }
  };

  return (
    <div className="skill-gap-container">

      <h2>📊 Skill Gap Analysis</h2>

      <div className="skill-gap-card">

        <label>Select Target Role</label>

        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
        >
          <option value="">Select Role</option>

          {roles.map((role) => (
            <option
              key={role._id}
              value={role._id}
            >
              {role.roleName}
            </option>
          ))}

        </select>

        <button
          onClick={analyzeSkillGap}
          disabled={loadingAnalysis}
        >
          {loadingAnalysis
            ? "Analyzing..."
            : "Analyze"}
        </button>

      </div>

      {loadingRoles && (
        <p>Loading roles...</p>
      )}

      {error && (
        <p className="error">{error}</p>
      )}

      {analysis && (

        <>

         <div className="match-card">

  <div className="match-header">

    <div>
      <h3>{analysis.role.roleName}</h3>
      <p className="match-label">Overall Match</p>
    </div>

    <div className="match-right">

      <h1>{analysis.matchPercentage}%</h1>

      <span
        className={`status-badge ${
          analysis.matchPercentage >= 80
            ? "excellent"
            : analysis.matchPercentage >= 50
            ? "good"
            : analysis.matchPercentage >= 20
            ? "average"
            : "poor"
        }`}
      >
        {analysis.matchPercentage >= 80
          ? "Excellent Match"
          : analysis.matchPercentage >= 50
          ? "Good Match"
          : analysis.matchPercentage >= 20
          ? "Needs Improvement"
          : "Significant Skill Gap"}
      </span>

    </div>

  </div>

  <div className="progress">
    <div
      className="progress-fill"
      style={{
        width: `${analysis.matchPercentage}%`
      }}
    />
  </div>

  <div className="stats">

    <div className="stat-card">
      <span>Required Skills</span>
      <strong>{analysis.totalRequiredSkills}</strong>
    </div>

    <div className="stat-card">
      <span>Matched</span>
      <strong>{analysis.matchedSkills.length}</strong>
    </div>

    <div className="stat-card">
      <span>Missing</span>
      <strong>{analysis.missingSkills.length}</strong>
    </div>

  </div>

</div>

          <div className="grid">

            <div className="box">

              <h3>
                ✅ Matched Skills
              </h3>

              {analysis.matchedSkills.length === 0 ? (
                <p>No matched skills</p>
              ) : (
                analysis.matchedSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="chip green"
                  >
                    {skill}
                  </span>
                ))
              )}

            </div>

            <div className="box">

              <h3>
                ❌ Missing Skills
              </h3>

              {analysis.missingSkills.length === 0 ? (
                <p>No missing skills</p>
              ) : (
                analysis.missingSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="chip red"
                  >
                    {skill}
                  </span>
                ))
              )}

            </div>

          </div>

          <div className="box">

            <h3>
              ➕ Additional Skills
            </h3>

            {analysis.extraSkills.length === 0 ? (
              <p>No extra skills</p>
            ) : (
              analysis.extraSkills.map((skill, index) => (
                <span
                  key={index}
                  className="chip blue"
                >
                  {skill}
                </span>
              ))
            )}

          </div>

          {analysis.aiRecommendation && (

            <>

              <div className="box">

                <h3>
                  🤖 AI Summary
                </h3>

                <p>
                  {analysis.aiRecommendation.summary}
                </p>

              </div>

              <div className="box">

                <h3>
                  📚 Learning Roadmap
                </h3>

                <ul>

                  {analysis.aiRecommendation.learningRoadmap?.map(
                    (step, index) => (
                      <li key={index}>
                        {step}
                      </li>
                    )
                  )}

                </ul>

              </div>

            </>

          )}

        </>

      )}

    </div>
  );
}

export default SkillGap;