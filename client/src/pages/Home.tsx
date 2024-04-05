import { useState } from "react";
import type { Profile } from "../types/profile";
import Header from "../components/header/Header";
import FastPreview from "../components/fastPreview/FastPreview";
import LinksForm from "../components/linksForm/LinksForm";
import ProfileForm from "../components/profileForm/ProfileForm";
import style from "./home.module.css";

const Home = () => {
  const [isLinksActive, setLinkActive] = useState<boolean>(true);
  const [profile, setProfile] = useState<Profile>({});
  return (
    <div>
      <Header
        isLinksActive={isLinksActive}
        setLinkActive={setLinkActive}
        profile={profile}
      />
      <div className={style.form}>
        <FastPreview profile={profile} />
        {isLinksActive ? (
          <LinksForm profile={profile} setProfile={setProfile} />
        ) : (
          <ProfileForm profile={profile} setProfile={setProfile} />
        )}
      </div>
    </div>
  );
};

export default Home;
