import Image from "next/image";
import { footerLogoImage } from "../../images";
import Social from "../social/Social";
import styles from "./Footer.module.css";

const Footer = () => (
  <div className="container mx-auto mb-4 ">
    <div className="row">
      <div className="flex-auto flex-col">
        {/* <Social /> */}

        <div className={`${styles.wrapper} mt-20 flex `}>
          <div className={` mt-20 flex `}>
            <div className={` object-cover ml-20${styles.footerLogo}`}>
              <Image src={footerLogoImage} alt="footer logo" />
            </div>
            <p className={`ml-20 ${styles.resml}`}>Copyright &copy; 2022 LOL</p>
          </div>

          <div
            className={`${styles.fNavlinks}flex-auto flex-nowrap  mt-20 text-center`}
          >
            <span className={`${styles.footerNav} cursor pointer`}>HOME</span>
            <span className={`${styles.footerNav} cursor pointer`}>ABOUT</span>
            <span className={`${styles.footerNav} cursor pointer`}>
              ROADMAP
            </span>
            <span className={`${styles.footerNav} cursor pointer`}>TEAM</span>
            <span className={`${styles.footerNav} cursor pointer`}>FAQ</span>
          </div>
        </div>

        <div />
      </div>
    </div>
  </div>
);

export default Footer;
