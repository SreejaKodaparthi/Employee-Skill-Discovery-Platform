// import { useEffect, useState } from "react";
// import API from "../../services/api";

// export default function UserManagement() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const res = await API.get("/users");
//       setUsers(res.data.users || []);
//     } catch (err) {
//       setError(
//         err.response?.data?.message ||
//           "Failed to load users."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateRole = async (userId, role) => {
//     try {
//       setError("");
//       setMessage("");

//       await API.put(`/users/${userId}/role`, {
//         role,
//       });

//       setUsers((prevUsers) =>
//         prevUsers.map((user) =>
//           user._id === userId
//             ? { ...user, role }
//             : user
//         )
//       );

//       setMessage("Role updated successfully.");
//     } catch (err) {
//       setError(
//         err.response?.data?.message ||
//           "Failed to update role."
//       );
//     }
//   };

//   if (loading) {
//     return (
//       <div className="container-page">
//         <div className="card">
//           Loading users...
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div
//       className="container-page"
//       style={{ maxWidth: 1000 }}
//     >
//       <div className="page-head">
//         <h1>User Management</h1>
//         <p>
//           View users and assign their platform roles.
//         </p>
//       </div>

//       {error && (
//         <div className="alert alert-danger">
//           {error}
//         </div>
//       )}

//       {message && (
//         <div className="alert alert-success">
//           {message}
//         </div>
//       )}

//       <div className="card">
//         {users.length === 0 ? (
//           <p>No users found.</p>
//         ) : (
//           <div style={{ overflowX: "auto" }}>
//             <table
//               style={{
//                 width: "100%",
//                 borderCollapse: "collapse",
//               }}
//             >
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Email</th>
//                   <th>Current Role</th>
//                   <th>Assign Role</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {users.map((user) => (
//                   <tr key={user._id}>
//                     <td>{user.name}</td>
//                     <td>{user.email}</td>

//                     <td>
//                       <span className="badge">
//                         {user.role?.toUpperCase()}
//                       </span>
//                     </td>

//                     <td>
//                       <select
//                         value={user.role}
//                         onChange={(e) =>
//                           updateRole(
//                             user._id,
//                             e.target.value
//                           )
//                         }
//                       >
//                         <option value="employee">
//                           Employee
//                         </option>

//                         <option value="manager">
//                           Manager
//                         </option>

//                         <option value="hr">
//                           HR
//                         </option>

//                         <option value="ld">
//                           L&D
//                         </option>
//                       </select>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import API from "../../services/api";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [updating, setUpdating] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data.users || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to load users."
      );
    } finally {
      setLoading(false);
    }
  };

  const changeRole = async (id, role) => {
    try {
      setUpdating(id);
      setError("");
      setMessage("");

      await API.put(`/users/${id}/role`, { role });

      setUsers((oldUsers) =>
        oldUsers.map((user) =>
          user._id === id
            ? { ...user, role }
            : user
        )
      );

      setMessage("Role updated successfully.");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to update role."
      );
    } finally {
      setUpdating("");
    }
  };

  const roleColor = (role) => {
    if (role === "hr") return "#15803d";
    if (role === "manager") return "#2563eb";
    if (role === "ld") return "#c2410c";
    return "#7c3aed";
  };

  const roleBackground = (role) => {
    if (role === "hr") return "#dcfce7";
    if (role === "manager") return "#dbeafe";
    if (role === "ld") return "#ffedd5";
    return "#ede9fe";
  };

  const initials = (name) => {
    if (!name) return "?";

    return name
      .split(" ")
      .map((x) => x[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "18px",
          color: "#64748b",
        }}
      >
        Loading users...
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "40px 25px 70px",
        boxSizing: "border-box",
      }}
    >

      {/* HEADER */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <div>
          <div
            style={{
              display: "inline-block",
              background: "#ede9fe",
              color: "#6d28d9",
              padding: "6px 12px",
              borderRadius: "20px",
              fontSize: "11px",
              fontWeight: "800",
              letterSpacing: "1px",
              marginBottom: "10px",
            }}
          >
            HR ADMIN
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: "36px",
              color: "#111827",
              fontWeight: "750",
            }}
          >
            User Management
          </h1>

          <p
            style={{
              margin: "8px 0 0",
              color: "#64748b",
              fontSize: "15px",
            }}
          >
            Manage users and assign their platform roles.
          </p>
        </div>

        {/* TOTAL USERS */}

        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "16px",
            padding: "15px 25px",
            textAlign: "center",
            boxShadow:
              "0 4px 15px rgba(15,23,42,0.05)",
          }}
        >
          <div
            style={{
              fontSize: "12px",
              color: "#64748b",
              marginBottom: "4px",
            }}
          >
            TOTAL USERS
          </div>

          <div
            style={{
              fontSize: "28px",
              fontWeight: "800",
              color: "#6d28d9",
            }}
          >
            {users.length}
          </div>
        </div>
      </div>

      {/* MESSAGES */}

      {message && (
        <div
          style={{
            background: "#ecfdf5",
            border: "1px solid #a7f3d0",
            color: "#047857",
            padding: "14px 18px",
            borderRadius: "12px",
            marginBottom: "20px",
            fontSize: "14px",
            fontWeight: "600",
          }}
        >
          ✓ &nbsp; {message}
        </div>
      )}

      {error && (
        <div
          style={{
            background: "#fef2f2",
            border: "1px solid #fecaca",
            color: "#b91c1c",
            padding: "14px 18px",
            borderRadius: "12px",
            marginBottom: "20px",
          }}
        >
          ⚠️ &nbsp; {error}
        </div>
      )}

      {/* USERS */}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >

        {users.map((user) => (

          <div
            key={user._id}
            style={{
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "18px",
              padding: "22px 25px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow:
                "0 5px 18px rgba(15,23,42,0.05)",
              boxSizing: "border-box",
            }}
          >

            {/* USER INFORMATION */}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "17px",
                minWidth: 0,
              }}
            >

              {/* AVATAR */}

              <div
                style={{
                  width: "55px",
                  height: "55px",
                  minWidth: "55px",
                  borderRadius: "16px",
                  background:
                    "linear-gradient(135deg,#7c3aed,#a855f7)",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "800",
                  fontSize: "16px",
                }}
              >
                {initials(user.name)}
              </div>

              {/* NAME + EMAIL */}

              <div>
                <div
                  style={{
                    fontSize: "17px",
                    fontWeight: "750",
                    color: "#111827",
                    marginBottom: "5px",
                  }}
                >
                  {user.name}
                </div>

                <div
                  style={{
                    fontSize: "13px",
                    color: "#64748b",
                    marginBottom: "9px",
                  }}
                >
                  {user.email}
                </div>

                {/* CURRENT ROLE */}

                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    background:
                      roleBackground(user.role),
                    color: roleColor(user.role),
                    padding: "5px 10px",
                    borderRadius: "20px",
                    fontSize: "10px",
                    fontWeight: "800",
                  }}
                >
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background:
                        roleColor(user.role),
                    }}
                  />

                  {user.role?.toUpperCase()}
                </span>
              </div>
            </div>

            {/* ROLE ASSIGNMENT */}

            <div
              style={{
                minWidth: "220px",
                marginLeft: "30px",
              }}
            >

              <div
                style={{
                  fontSize: "11px",
                  color: "#64748b",
                  fontWeight: "700",
                  marginBottom: "7px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Assign Role
              </div>

              <div
                style={{
                  position: "relative",
                  width: "100%",
                }}
              >

                <select
                  value={user.role}
                  disabled={updating === user._id}
                  onChange={(e) =>
                    changeRole(
                      user._id,
                      e.target.value
                    )
                  }
                  style={{
                    width: "100%",
                    height: "45px",
                    padding: "0 42px 0 15px",
                    borderRadius: "11px",
                    border: "1px solid #d1d5db",
                    background: "#f8fafc",
                    color: "#1f2937",
                    fontSize: "14px",
                    fontWeight: "650",
                    outline: "none",
                    cursor:
                      updating === user._id
                        ? "wait"
                        : "pointer",
                    appearance: "none",
                    WebkitAppearance: "none",
                    boxSizing: "border-box",
                  }}
                >
                  <option value="employee">
                    Employee
                  </option>

                  <option value="manager">
                    Manager
                  </option>

                  <option value="hr">
                    HR
                  </option>

                  {/* <option value="ld">
                    L&D
                  </option> */}
                </select>

                {/* CUSTOM ARROW */}

                <div
                  style={{
                    position: "absolute",
                    right: "15px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    pointerEvents: "none",
                    color: "#64748b",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  ▼
                </div>
              </div>

              {updating === user._id && (
                <div
                  style={{
                    marginTop: "5px",
                    fontSize: "11px",
                    color: "#7c3aed",
                  }}
                >
                  Saving role...
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ROLE GUIDE */}

      <div
        style={{
          marginTop: "30px",
          background: "#f8fafc",
          border: "1px solid #e2e8f0",
          borderRadius: "18px",
          padding: "25px",
        }}
      >

        <h2
          style={{
            margin: "0 0 5px",
            fontSize: "19px",
            color: "#111827",
          }}
        >
          Role permissions
        </h2>

        <p
          style={{
            margin: "0 0 20px",
            color: "#64748b",
            fontSize: "13px",
          }}
        >
          Assign roles according to each user's
          responsibilities.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(4, 1fr)",
            gap: "12px",
          }}
        >

          <RoleInfo
            title="Employee"
            text="Manage personal profile, skills and resume."
            color="#7c3aed"
            bg="#ede9fe"
          />

          <RoleInfo
            title="Manager"
            text="Search employees and view analytics."
            color="#2563eb"
            bg="#dbeafe"
          />

          {/* <RoleInfo
            title="L&D"
            text="Access learning and skill analytics."
            color="#c2410c"
            bg="#ffedd5"
          /> */}

          <RoleInfo
            title="HR"
            text="Manage users and assign roles."
            color="#15803d"
            bg="#dcfce7"
          />

        </div>
      </div>

    </div>
  );
}


/* ROLE INFO COMPONENT */

function RoleInfo({
  title,
  text,
  color,
  bg,
}) {
  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: "13px",
        padding: "15px",
      }}
    >
      <span
        style={{
          display: "inline-block",
          padding: "5px 8px",
          borderRadius: "7px",
          background: bg,
          color: color,
          fontSize: "9px",
          fontWeight: "800",
          marginBottom: "9px",
        }}
      >
        {title.toUpperCase()}
      </span>

      <p
        style={{
          margin: 0,
          color: "#64748b",
          fontSize: "11px",
          lineHeight: "1.5",
        }}
      >
        {text}
      </p>
    </div>
  );
}