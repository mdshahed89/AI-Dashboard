import axios from "axios";
const cloudName = "ddlwhkn3b";
const api = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
export const uploadFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "images_preset");
    formData.append("folder", "AIChatbot");

    const res = await axios.post(api, formData);
    // console.log("res",res);
    
    return res?.data?.secure_url || "";
  } catch (error) {
    console.log("Error uploading file:", error);
    return null
  }
};