import axios from "axios";
import type { Profile } from "../types/profile";

export const profilesHandler = axios.create({
  baseURL: "https://divlinks.onrender.com",
});

export const setProfile = async (profile: Profile): Promise<string> | never => {
  try {
    const res = await jsonServer.get("/");
    return res.data.bills;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const setBill = async (bill: Bill): Promise<void> | never => {
  try {
    await jsonServer.post(`/`, bill);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
