import { Profile } from "../../types/profile";
import style from "./style.module.css";
import { useRef, Dispatch, SetStateAction, useState } from "react";

const ProfileForm = ({
  profile,
  setProfile,
}: {
  profile: Profile;
  setProfile: Dispatch<SetStateAction<Profile>>;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [isSelectImage, setSelectImage] = useState<boolean>(false);
  return (
    <div className={style.container}>
      <div className={style.title}>Profile Details</div>
      <div className={style.description}>
        Add your details to create a personle touch to your profile
      </div>
      <div className={style.inputBox}>
        <label>Profile picture</label>
        <div
          className={style.inputImage}
          onClick={() => inputRef.current?.click()}
        >
          <img src={profile?.image ?? "/user.png"} alt="imge" ref={imageRef} />
          <input
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={({ target: { files } }) => {
              const image = URL.createObjectURL((files ?? [])[0]);
              //@ts-expect-error never equal null
              imageRef.current.src = image;
              setProfile((profile) => ({ ...profile, image }));
              setSelectImage(false);
            }}
          />
          <div className={style.text}>
            <i className="fa-solid fa-image"></i>
            {isSelectImage ? "Change" : "Select"} Image
          </div>
        </div>
      </div>
      <div className={style.inputBox}>
        <label>First Name</label>
        <input
          type="text"
          required
          defaultValue={profile?.firstName}
          onChange={({ target: { value: firstName } }) => {
            setProfile((profile) => ({ ...profile, firstName }));
          }}
        />
      </div>
      <div className={style.inputBox}>
        <label>Last Name</label>
        <input
          type="text"
          required
          defaultValue={profile?.lastName}
          onChange={({ target: { value: lastName } }) => {
            setProfile((profile) => ({ ...profile, lastName }));
          }}
        />
      </div>
      <div className={style.inputBox}>
        <label>Email </label>
        <input
          type="email"
          required
          defaultValue={profile?.email}
          onChange={({ target: { value: email } }) => {
            setProfile((profile) => ({ ...profile, email }));
          }}
        />
      </div>
    </div>
  );
};

export default ProfileForm;
