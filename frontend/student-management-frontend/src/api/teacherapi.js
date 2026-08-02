import api from "./axios";

export const getTeachers = async () => {
  const response = await api.get("/admin/teachers");
  return response.data;
};

export const addTeacher = async (teacherData) => {
  const response = await api.post("/admin/teacher/register", teacherData);
  return response.data;
};


export const getTeacherDashboard = async () => {
  const response = await api.get("/teacher/teacher/dashboard");
  return response.data;
};

export const markAttendance = async (attendanceData) => {
  const response = await api.post(
    "/teacher/teacher/mark-attendance",
    attendanceData
  );

  return response.data;
};


export const uploadGrade = async (gradeData) => {
  const response = await api.post(
    "/teacher/teacher/upload_grade",
    gradeData
  );

  return response.data;
};

export const getTeacherStudents = async () => {
  const response = await api.get(
    "/teacher/teacher/students"
  );

  return response.data;
};

export const getTeacherSubjects = async () => {
  const response = await api.get(
    "/teacher/teacher/my-subjects"
  );

  return response.data;
};

