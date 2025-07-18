import axiosInstance from "@/config/axiosConfig";
import { Project } from "@/types/api";

function getProjects(): Promise<Project[]> {
    return axiosInstance.get('/projects/projects/').then(res => res.data);
}

export { getProjects };