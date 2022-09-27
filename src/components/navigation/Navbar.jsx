import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useAccount, useDisconnect } from "wagmi";
import Image from "next/image";

import { DiscordImage, logoImage } from "../../images";

const Navbar = () => {
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const [showMediaIcons, setShowMediaIcons] = useState(false);
  return (
    <>
      <div className="container mx-auto">
        <div className="row">
          <nav className="main-nav">
            {/* 1st logo part  */}
            <div className="logo">
              <Image src={logoImage} alt="footer logo" />
            </div>

            {/* 2nd menu part  */}
            <div
              className={
                showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"
              }
            >
              <ul>
                <li>
                  <a href="https://lordsofthelands.io/" target="blank">
                    home
                  </a>
                </li>
                <li>
                  <a href="https://lordsofthelands.io/" target="blank">
                    About
                  </a>
                </li>
                <li>
                  <a href="https://lordsofthelands.io/" target="blank">
                    Roadmap
                  </a>
                </li>
                <li>
                  <a href="https://lordsofthelands.io/" target="blank">
                    Team
                  </a>
                </li>
                <li>
                  <a href="https://lordsofthelands.io/" target="blank">
                    FAQ
                  </a>
                </li>
                {isConnected && (
                  <li>
                    <button onClick={disconnect}>Disconnect</button>
                  </li>
                )}
              </ul>
            </div>

            {/* 3rd social media links */}
            <div className="social-media">
              <ul className="social-media-desktop">
                <li>
                  <a
                    href="https://discord.com/invite/hnCf6WJg5f"
                    target="blank"
                  >
                    <DiscordImage />
                  </a>
                  <p style={{ cursor: "pointer" }}>JOIN</p>
                </li>
              </ul>

              {/* hamburget menu start  */}
              <div className="hamburger-menu">
                <a href="#" onClick={() => setShowMediaIcons(!showMediaIcons)}>
                  <GiHamburgerMenu />
                </a>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
