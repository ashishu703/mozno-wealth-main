import apiClient from "../api/axios.instance";

export const submitContactForm = async (formData) => {
  const payload = {
    fullName: formData.name.trim(),
    email: formData.email.trim().toLowerCase(),
    phone: formData.phone?.trim() || "",
    company: formData.company?.trim() || null,
    service: formData.subject,
    message: formData.message.trim(),
  };

  const response = await apiClient.post("/contact", payload);
  return response;
};