import api from "./axios";

export const getStudents = async () => {
  const response = await api.get("/admin/students");
  return response.data;
};

export const addStudent = async (studentData) => {
  const response = await api.post("/admin/student/register", studentData);
  return response.data;
};
export const getStudentDashboard = async () => {
  const response = await api.get("/students/student/dashboard");
  return response.data;
}; 