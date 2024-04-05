import { Dispatch, SetStateAction, useState, useEffect } from "react";
import style from "./style.module.css";
import { Profile } from "../../types/profile";
import { setProfile } from "../../api/profileshandler";
const Header = ({
  isLinksActive,
  setLinkActive,
  profile,
}: {
  isLinksActive: boolean;
  setLinkActive: Dispatch<SetStateAction<boolean>>;
  profile: Profile;
}) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={style.header}>
      <img
        src={`/${windowWidth < 375 ? "small-" : ""}logo.svg`}
        alt="devlinks"
        className={style.logo}
      />
      <div className={style.btns}>
        <div
          className={`${style.btn} ${isLinksActive && style.active}`}
          onClick={() => setLinkActive(true)}
        >
          <i className="fa-solid fa-link"></i>
          <div className={style.text}>Links</div>
        </div>
        <div
          className={`${style.btn} ${!isLinksActive && style.active}`}
          onClick={() => setLinkActive(false)}
        >
          <i className="fa-regular fa-circle-user"></i>
          <div className={style.text}>Profile Details</div>
        </div>
      </div>

      <div
        className={style.preview}
        onClick={() => {
          console.log({ profile });
          setProfile(profile);
        }}
      >
        <i className="fa-regular fa-eye"></i>
        <div className={style.text}>Preview</div>
      </div>
    </div>
  );
};

export default Header;
