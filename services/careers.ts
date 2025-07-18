import { Job, JobApplicationRequest } from "@/types/api";
import axiosInstance from "@/config/axiosConfig";
import { JobApplication } from "@/types/api";

export const getJobs = async (): Promise<Job[]> => {
    const response = await axiosInstance.get<Job[]>('/jobs/jobs');
    return response.data;
}

export const getJob = async (id: string): Promise<Job> => {
    const response = await axiosInstance.get<Job>(`/jobs/jobs/${id}/`);
    return response.data;
}

export const applyJob = async (id: string, data: JobApplicationRequest): Promise<JobApplication> => {
    // Check if resume is a File object (for multipart form data)
    if (data.resume instanceof File) {
        const formData = new FormData();

        // Append all form fields to FormData

        formData.append('full_name', data.full_name);
        formData.append('email', data.email);
        formData.append('linkedin', data.linkedIn);
        formData.append('resume', data.resume);

        // Only append cover_letter if it exists
        if (data.cover_letter) {
            formData.append('cover_letter', data.cover_letter);
        }

        // Send multipart form data
        const response = await axiosInstance.post<JobApplication>(
            `/jobs/jobs/${id}/apply/`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }
        );
        return response.data;
    } else {
        // Fallback for when resume is not a file (e.g., string URL)
        const response = await axiosInstance.post<JobApplication>(`/jobs/jobs/${id}/apply/`, data);
        return response.data;
    }
}
