import axios from "axios";
import type { Profile } from "../types/profile";

export const profilesHandler = axios.create({
  baseURL: "https://divlinks.onrender.com",
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

export const getProfile = async (
  profileId: string
): Promise<Profile> | never => {
  try {
    const res = await profilesHandler.get(`/profiles/${profileId}`);
    return res.data.profile;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
