import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getStudent, updateStudent } from "../../services/studentService";
import StudentForm from "./StudentForm";
import "./student.css";

const EditStudent = () => {
  const { id } = useParams(); // id from the URL: /students/edit/:id
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    rollNo: "",
    email: "",
    course: "",
  });
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Load this student and fill the form
  useEffect(() => {
    (async () => {
      const student = await getStudent(id);
      if (student) {
        setForm({
          name: student.name,
          rollNo: student.rollNo,
          email: student.email || "", // old records may not have email
          course: student.course,
        });
      } else {
        setNotFound(true);
      }
      setLoading(false);
    })();
  }, [id]);

  // UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateStudent(id, form);
    navigate("/students"); // go back to the list
  };

  if (loading) return <p className="student-page">Loading...</p>;

  if (notFound) {
    return (
      <div className="student-page">
        <p>Student not found.</p>
        <Link to="/students">Back to list</Link>
      </div>
    );
  }

  return (
    <div className="student-page">
      <h1>Edit Student</h1>
      <StudentForm
        form={form}
        setForm={setForm}
        onSubmit={handleSubmit}
        buttonText="Save Changes"
      />
      <Link to="/students">Cancel</Link>
    </div>
  );
};

export default EditStudent;
