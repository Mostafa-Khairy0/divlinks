import { Link, Profile } from "../../types/profile";
import style from "./style.module.css";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import LinkInput from "./LinkInput";
const LinksForm = ({
  profile,
  setProfile,
}: {
  profile: Profile;
  setProfile: Dispatch<SetStateAction<Profile>>;
}) => {
  const [links, setLinks] = useState<Link[]>(profile?.links ?? []);

  useEffect(() => {
    setProfile((profile) => ({ ...profile, links }));
  }, [links, setProfile]);

  return (
    <div className={style.container}>
      <div className={style.title}>Customize your links</div>
      <div className={style.description}>
        Add and remove links below and then share all your profiles with the
        world!
      </div>
      <div
        className={style.btn}
        style={{
          opacity: links.length >= 5 ? 0.5 : 1,
          cursor: links.length >= 5 ? "no-drop" : "pointer",
        }}
        onClick={() =>
          links.length < 5 &&
          setLinks((links) => [...links, { platform: "github", url: "" }])
        }
      >
        <i className="fa-solid fa-plus"></i>
        <p>Add New Link</p>
      </div>
      <div className={style.links}>
        {links.map((link, index) => (
          <LinkInput
            key={index}
            index={index}
            setLinks={setLinks}
            link={link}
          />
        ))}
      </div>
    </div>
  );
};

export default LinksForm;
