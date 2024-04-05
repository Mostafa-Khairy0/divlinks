import { Profile } from "../../types/profile";
import style from "./style.module.css";

const capitalize = (word: string): string => {
  let capitale = "";
  capitale += word[0].toUpperCase();
  capitale += word.slice(1);
  return capitale;
};
const FastPreview = ({ profile }: { profile: Profile }) => {
  // console.log({ profile });
  const links = [0, 1, 2, 3, 4];
  return (
    <div className={style.container}>
      <div className={style.preview}>
        <div className={style.image}>
          {profile?.image && <img src={profile?.image} alt="user" />}
        </div>
        <div
          className={`${style.name} ${
            profile?.firstName || profile?.lastName ? style.show : ""
          }`}
        >
          {profile?.firstName && <p>{profile?.firstName}</p>}
          {profile?.lastName && <p>{profile?.lastName}</p>}
        </div>
        <div className={`${style.email} ${profile?.email ? style.show : ""}`}>
          {profile?.email && <p>{profile?.email}</p>}
        </div>
        {links.map((link) => {
          return (
            <div className={style.link} key={link}>
              {(profile?.links ?? [])[link] && (
                <div
                  className={style.linkShow}
                  style={{
                    backgroundColor: `var(--${
                      (profile?.links ?? [])[link].platform
                    })`,
                  }}
                >
                  <div className={style.box}>
                    <i
                      className={`fa-brands fa-${
                        (profile?.links ?? [])[link].platform
                      }`}
                    ></i>
                    <p>{capitalize((profile?.links ?? [])[link].platform)}</p>
                  </div>
                  {(profile?.links ?? [])[link].url.length > 0 && (
                    <a href={(profile?.links ?? [])[link].url} target="_blank">
                      <i className="fa-solid fa-arrow-right"></i>
                    </a>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FastPreview;
