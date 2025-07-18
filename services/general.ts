import axiosInstance from "@/config/axiosConfig";
import { Message } from "@/types/api";


function createMessage(message: Message) {
    return axiosInstance.post('/accounts/messages/', message);
}

function subscribeToNewsletter(email: string) {
    return axiosInstance.post('/blog/newsletter/', { email });
}

export { createMessage, subscribeToNewsletter };