import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Home() {
  const { isAuthenticated } = useAuth();
  return <>
    <section className="hero">
      <div className="hero-inner">
        <div>
          <span className="badge">AI-powered talent discovery</span>
          <h1>Discover the right <span>skills</span> for every opportunity.</h1>
          <p>Manage employee skills, parse resumes, search talent, compare people with role requirements, and surface learning recommendations from one platform.</p>
          <div className="actions">
            <Link className="btn btn-primary" to={isAuthenticated ? "/dashboard" : "/register"}>{isAuthenticated ? "Open Dashboard" : "Get Started"}</Link>
            {!isAuthenticated && <Link className="btn btn-secondary" to="/login">Sign In</Link>}
          </div>
        </div>
        <div className="hero-art">
          <div className="hero-stat"><span>Skill inventory</span><strong>Live</strong></div>
          <div className="hero-stat"><span>Resume extraction</span><strong>PDF / DOCX</strong></div>
          <div className="hero-stat"><span>Talent matching</span><strong>Ranked</strong></div>
          <div className="hero-stat"><span>Skill-gap analysis</span><strong>AI assisted</strong></div>
        </div>
      </div>
    </section>
    <section className="section">
      <h2>Everything connected to your backend</h2>
      <div className="grid grid-3">
        {[
          ["⚡","Skills","Create, update and delete skills using the Skill Catalog."],
          ["📄","Resume","Upload PDF/DOCX, parse it, then save extracted data."],
          ["🔎","Talent Search","Advanced filters, match percentage and trust score."],
          ["🏅","Certifications","Track credentials, expiry and verification status."],
          ["📊","Analytics","Organisation-level skill, department and resume metrics."],
          ["🎯","Skill Gap","Compare an employee against a role and retrieve AI recommendations."]
        ].map(([icon,title,text]) => <div className="card feature" key={title}><div className="icon">{icon}</div><h3>{title}</h3><p>{text}</p></div>)}
      </div>
    </section>
  </>;
}
