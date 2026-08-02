import api from "./axios";

export const getDashboard = async () => {
    const response = await api.get("/admin/dashboard");
    return response.data;
};
export const getSubjects = async () => {
    const response = await api.get("/admin/subjects");
    return response.data;
};

export const addSubject = async (data) => {
    const response = await api.post("/admin/add-subject", data);
    return response.data;
};