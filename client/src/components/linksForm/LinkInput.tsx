import { Dispatch, SetStateAction } from "react";
import { Link } from "../../types/profile";
import style from "./style.module.css";

const LinkInput = ({
  setLinks,
  index,
  link,
}: {
  index: number;
  link: Link;
  setLinks: Dispatch<SetStateAction<Link[]>>;
}) => {
  return (
    <div className={style.linkContainer}>
      <div className={style.row}>
        <div className={style.id}>Link #{index + 1}</div>
        <div
          className={style.remove}
          onClick={() =>
            setLinks((links) => [...links.filter((_, i) => i != index)])
          }
        >
          Remove
        </div>
      </div>

      <div className={style.inputBox}>
        <label>Platform</label>
        <select
          required
          defaultValue={link.platform}
          onChange={({ target: { value } }) =>
            setLinks((links) => {
              links[index].platform = value;
              return [...links];
            })
          }
        >
          <option value="github">Github</option>
          <option value="youtube">Youtube</option>
          <option value="linkedin">Linkedin</option>
          <option value="facebook">Facebook</option>
          <option value="x-twitter">X-twitter</option>
        </select>
      </div>
      <div className={style.inputBox}>
        <label>Link</label>
        <input
          type="url"
          required
          defaultValue={link.url}
          onChange={({ target: { value } }) =>
            setLinks((links) => {
              links[index].url = value;
              return [...links];
            })
          }
        />
      </div>
    </div>
  );
};

export default LinkInput;
