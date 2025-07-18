import axiosInstance from "@/config/axiosConfig";
import { CompanyInfo, CompanyStats, Testimonial } from "@/types/api";

function getCompanyStats(): Promise<CompanyStats> {
    return axiosInstance.get('/accounts/company-stats/').then(res => res.data[0]);
}

function getCompanyInfo(): Promise<CompanyInfo> {
    return axiosInstance.get('/accounts/organization/default/').then(res => res.data);
}

function getTestimonials(): Promise<Testimonial[]> {
    return axiosInstance.get('/clients/testimonials/').then(res => res.data);
}

export { getCompanyStats, getCompanyInfo, getTestimonials };