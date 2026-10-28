import { createContext, useContext, useState } from "react";

// 1. Create the context
const CourseContext = createContext();

const defaultCourses = ["CSE", "AIML", "DS", "ECE", "Mechanical", "Civil"];

// 2. Provider: wrap the app with this so all children get the courses
export const CourseProvider = ({ children }) => {
  // Courses live in state, so changing them re-renders every component using them
  // (a page refresh resets back to the defaults)
  const [courses, setCourses] = useState(defaultCourses);

  const addCourse = (course) => {
    setCourses([...courses, course]); // new array, never push()
  };

  const removeCourse = (course) => {
    setCourses(courses.filter((c) => c !== course));
  };

  return (
    <CourseContext.Provider value={{ courses, addCourse, removeCourse }}>
      {children}
    </CourseContext.Provider>
  );
};

// 3. Custom hook: components call useCourses() instead of useContext(CourseContext)
// eslint-disable-next-line react-refresh/only-export-components
export const useCourses = () => useContext(CourseContext);
