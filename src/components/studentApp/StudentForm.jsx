import { useCourses } from "../../context/CourseContext";

// Reusable form: used for both Add and Edit
const StudentForm = ({ form, setForm, onSubmit, buttonText }) => {
  const { courses } = useCourses(); // courses come from context

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <form className="student-form" onSubmit={onSubmit}>
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        name="rollNo"
        placeholder="Roll No"
        value={form.rollNo}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <select
        name="course"
        value={form.course}
        onChange={handleChange}
        required
      >
        <option value="">Select Course</option>
        {courses.map((course) => (
          <option key={course} value={course}>
            {course}
          </option>
        ))}
      </select>
      <button type="submit">{buttonText}</button>
    </form>
  );
};

export default StudentForm;
