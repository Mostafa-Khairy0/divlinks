import { useEffect, useState } from "react";
import style from "./profile.module.css";
import { useParams } from "react-router-dom";
import { getProfile } from "../api/profileshandler";
import { Profile } from "../types/profile";

const server = "https://divlinks.onrender.com";
const capitalize = (word: string): string => {
  let capitale = "";
  capitale += word[0].toUpperCase();
  capitale += word.slice(1);
  return capitale;
};

const ProfilePage = () => {
  const { profileId } = useParams();
  const [profile, setProfile] = useState<Profile>();
  useEffect(() => {
    getProfile(profileId ?? "").then((profile) => setProfile(profile));
  }, [profileId]);

  console.log({ profileId, profile });

  return (
    <div className={style.container}>
      <div className={style.preview}>
        <img
          src={`${server}/${profile?.image}`}
          className={style.image}
          alt="user"
        />
        <div className={`${style.name}`}>
          {`${profile?.firstName} ${profile?.lastName}`}
        </div>
        <div className={style.email}>{profile?.email}</div>
        <div className={style.links}>
          {profile?.links?.map((link, index) => {
            return (
              <div
                key={index}
                className={style.link}
                style={{
                  backgroundColor: `var(--${link?.platform})`,
                }}
              >
                <div className={style.box}>
                  <i className={`fa-brands fa-${link.platform}`}></i>
                  <p>{capitalize(link.platform)}</p>
                </div>
                <a href={link.url} target="_blank">
                  <i className="fa-solid fa-arrow-right"></i>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
