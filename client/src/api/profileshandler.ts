import axios from "axios";
import type { Profile } from "../types/profile";

export const profilesHandler = axios.create({
  //   baseURL: "https://divlinks.onrender.com",
  baseURL: "http://localhost:3000",
});

export const setProfile = async (
  profile: Profile
): Promise<{ id: string }> | never => {
  try {
    const formData = new FormData();
    formData.append("image", profile.image ?? "");
    formData.append("firstName", profile.firstName ?? "");
    formData.append("lastName", profile.lastName ?? "");
    formData.append("email", profile.email ?? "");
    formData.append("links", JSON.stringify(profile.links));

    const res = await profilesHandler.post("/profiles", formData);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// export const setBill = async (bill: Bill): Promise<void> | never => {
//   try {
//     await jsonServer.post(`/`, bill);
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };
