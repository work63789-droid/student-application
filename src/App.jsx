import { NavLink, Route, Routes } from "react-router-dom";
import "./App.css";
import { GetTodo } from "./components/example/GetTodo";
import Counter from "./components/example/Counter";
import StudentMain from "./components/studentApp/studentMain";
import EditStudent from "./components/studentApp/EditStudent";
import ManageCourses from "./components/studentApp/ManageCourses";
import Login from "./components/studentApp/Login";
import { useAuth } from "./context/AuthContext";
import { logout } from "./services/authService";

function App() {
  const { user, loading } = useAuth();

  return (
    <>
      {/* NavLink adds an "active" class to the link of the current page */}
      <nav className="navbar">
        <div className="nav-links">
          <NavLink to="/counter">Counter</NavLink>
          <NavLink to="/getTodo">Get Todo</NavLink>
          <NavLink to="/students">Students</NavLink>
          <NavLink to="/courses">Manage Courses</NavLink>
        </div>

        {/* Login / Logout */}
        {!loading && (
          <div className="auth-bar">
            {user ? (
              <>
                <span>{user.email}</span>
                <button onClick={logout}>Logout</button>
              </>
            ) : (
              <NavLink to="/login">Login</NavLink>
            )}
          </div>
        )}
      </nav>
      {/* <GetTodo /> */}

      <Routes>
        <Route path="/counter" element={<Counter />} />
        <Route path="/getTodo" element={<GetTodo />} />
        <Route path="/students" element={<StudentMain />} />
        <Route path="/students/edit/:id" element={<EditStudent />} />
        <Route path="/courses" element={<ManageCourses />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/getTodo" element={true ? <NoPage/> : <GetTodo />} />  Protected Route*/}
      </Routes>
    </>
  );
}

export default App;
