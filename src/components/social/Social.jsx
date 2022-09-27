import * as images from "../../images";
import { Button } from "../../components";
import styles from "./Social.module.css";

const Social = () => (
  <>
    <div className="max-w-sm mx-auto mt-10">
      <h3 className="text-center text-xl">
        {" "}
        JOIN OUR COMMUNITY & GET EARLY ACCESS{" "}
      </h3>
      <p className="text-center">🤙</p>
    </div>
    <div className="max-w-sm mx-auto flex justify-between mt-4 pl-2 pr2">
      <Button text="WHITELIST NOW" className={`mr-10 ${styles.whislistBtn}`} />
      <Button text="DISCORD" className={` ${styles.discordBtn}`} />
    </div>
    <div className={`flex justify-center flex-wrap mx-auto items-center mt-10`}>
      <div className="">
        <div className={`${styles.socialBtn}`}>
          <images.TwitterImage />
        </div>
      </div>

      <div className="">
        <div className={`${styles.socialBtn}`}>
          <images.LinkedInImage />
        </div>
      </div>

      <div className="">
        <div className={`${styles.socialBtn}`}>
          <images.FacebookImage />
        </div>
      </div>

      <div className="">
        <div className={`${styles.socialBtn}`}>
          <images.InstagramImage />
        </div>
      </div>
    </div>
  </>
);

export default Social;
