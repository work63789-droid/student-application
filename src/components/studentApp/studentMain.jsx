import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  addStudent,
  deleteStudent,
  getStudents,
} from "../../services/studentService";
import StudentForm from "./StudentForm";
import { useAuth } from "../../context/AuthContext";
import "./student.css";

const emptyForm = { name: "", rollNo: "", email: "", course: "" };

// Component names must start with a capital letter
const StudentMain = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const { user } = useAuth(); // logged-in user (or null)

  // Is this student's card the logged-in user's own card?
  const isMyCard = (student) =>
    user && student.email?.toLowerCase() === user.email.toLowerCase();

  // READ
  const loadStudents = async () => {
    setStudents(await getStudents());
  };

  // Load the list once when the page opens
  useEffect(() => {
    (async () => {
      setStudents(await getStudents());
      setLoading(false);
    })();
  }, []);

  // CREATE
  const handleSubmit = async (e) => {
    e.preventDefault();
    await addStudent(form);
    setForm(emptyForm);
    loadStudents(); // refresh the list
  };

  // DELETE
  const handleDelete = async (id) => {
    if (!confirm("Delete this student?")) return;
    await deleteStudent(id);
    loadStudents();
  };

  return (
    <div className="student-page">
      <h1>Student Management</h1>

      <StudentForm
        form={form}
        setForm={setForm}
        onSubmit={handleSubmit}
        buttonText="Add Student"
      />

      {loading ? (
        <p>Loading...</p>
      ) : students.length === 0 ? (
        <p>No students yet. Add one above.</p>
      ) : (
        <div className="student-grid">
          {students.map((student) => (
            <div
              className={isMyCard(student) ? "student-card my-card" : "student-card"}
              key={student.id}
            >
              {isMyCard(student) && <span className="you-badge">You</span>}
              <h3>{student.name}</h3>
              <p>Roll No: {student.rollNo}</p>
              <p>Email: {student.email}</p>
              <p>Course: {student.course}</p>

              <div className="card-actions">
                {/* UPDATE happens on the edit page */}
                <Link className="btn edit" to={`/students/edit/${student.id}`}>
                  Edit
                </Link>
                <button
                  className="btn delete"
                  onClick={() => handleDelete(student.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentMain;
