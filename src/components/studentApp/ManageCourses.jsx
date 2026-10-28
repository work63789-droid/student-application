import { useState } from "react";
import { useCourses } from "../../context/CourseContext";
import "./student.css";

const ManageCourses = () => {
  const { courses, addCourse, removeCourse } = useCourses();
  const [newCourse, setNewCourse] = useState("");
  const [error, setError] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    const course = newCourse.trim();

    if (!course) return;
    if (courses.includes(course)) {
      setError(`${course} already exists`);
      return;
    }

    addCourse(course);
    setNewCourse("");
    setError("");
  };

  return (
    <div className="student-page">
      <h1>Manage Courses</h1>

      <form className="student-form" onSubmit={handleAdd}>
        <input
          placeholder="New course e.g. IT"
          value={newCourse}
          onChange={(e) => setNewCourse(e.target.value)}
        />
        <button type="submit">Add Course</button>
      </form>

      {error && <p className="error">{error}</p>}

      {courses.length === 0 ? (
        <p>No courses. Add one above.</p>
      ) : (
        <ul className="course-list">
          {courses.map((course) => (
            <li key={course}>
              <span>{course}</span>
              <button
                className="btn delete"
                onClick={() => removeCourse(course)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ManageCourses;
