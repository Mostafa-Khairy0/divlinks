export type Platform =
  | "linkedin"
  | "github"
  | "youtube"
  | "facebook"
  | "x-twitter"
  | string;

export type Link = {
  url: string;
  platform: Platform;
};

export interface Profile {
  firstName?: string;
  lastName?: string;
  email?: string;
  image?: string;
  links?: Link[];
}
