import api from "./axios";

export const getParents = async () => {
  const response = await api.get("/admin/parents");
  return response.data;
};

export const addParent = async (parentData) => {
  const response = await api.post("/admin/add-parent", parentData);
  return response.data;
};

export const assignStudent = async (data) => {
  const response = await api.post("/admin/link-parent-student", data);
  return response.data;
};
export const getParentDashboard = async () => {
    const response = await api.get("/parent/parent/dashboard");
    return response.data;
};

export const getParentAttendance = async () => {
    const response = await api.get("/parent/parent/attendance");
    return response.data;
};

export const getParentGrades = async () => {
    const response = await api.get("/parent/parent/grades");
    return response.data;
};

export const getMyChildren = async () => {
    const response = await api.get("/parent/parent/my-children");
    return response.data;
};