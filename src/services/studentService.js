import {
  collection, addDoc, getDocs, getDoc,
  doc, updateDoc, deleteDoc, serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

const studentsRef = collection(db, "students");

// CREATE
export const addStudent = (student) =>
  addDoc(studentsRef, { ...student, createdAt: serverTimestamp() });

// READ all
export const getStudents = async () => {
  const snapshot = await getDocs(studentsRef);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
};

// READ one
export const getStudent = async (id) => {
  const snap = await getDoc(doc(db, "students", id));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
};

// UPDATE
export const updateStudent = (id, data) =>
  updateDoc(doc(db, "students", id), data);

// DELETE
export const deleteStudent = (id) => deleteDoc(doc(db, "students", id));