import axios from "axios";
import type { Profile } from "../types/profile";

export const profilesHandler = axios.create({
  baseURL: "https://divlinks.onrender.com",
});

export const setProfile = async (profile: Profile): Promise<string> | never => {
  try {
    const formData = new FormData();
    formData.append("image", profile.image ?? "");
    formData.append("image", profile.firstName ?? "");
    formData.append("image", profile.lastName ?? "");
    formData.append("image", profile.email ?? "");
    formData.append("image", JSON.stringify(profile.links));

    const res = await profilesHandler.post("/profiles", formData);
    console.log({ res });
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
