import axios from 'axios';

export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  // You need to set up an unsigned upload preset in Cloudinary and put it in .env
  formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
  
  try {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData);
    return response.data.secure_url;
  } catch (error) {
    console.error('Cloudinary Upload Error:', error.response?.data || error);
    const apiError = error.response?.data?.error?.message || 'Image upload failed';
    throw new Error(apiError);
  }
};
