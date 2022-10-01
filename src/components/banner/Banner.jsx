import Image from "next/image";
import * as images from "../../images";
import Mint from "../mint/Mint";
import styles from "./banner.module.css";

import { useAccount, useContract, useSigner, useNetwork } from "wagmi";
import { mainnetAddress, ABI } from "../../constants";
import { useCallback, useEffect, useRef, useState } from "react";

const Banner = () => {
  const [totalMinted, setTotalMinted] = useState(0);
  const { data: signer } = useSigner();
  const { isConnected } = useAccount();

  const contractRef = useRef();

  const contract = useContract({
    addressOrName: mainnetAddress,
    contractInterface: ABI,
    signerOrProvider: signer,
  });

  contractRef.current = contract;

  const fetchTotalSupply = useCallback(async () => {
    if (!isConnected) return;
    try {
      const totalSupply = await contractRef.current.totalSupply();
      setTotalMinted(parseInt(totalSupply));
      return totalSupply;
    } catch (err) {
      console.error(err);
    }
  }, [isConnected]);


  useEffect(() => {
    const nftsmintedCountInterval = setInterval(async function () {
      let nftsmintedCount = fetchTotalSupply();
      if (nftsmintedCount == 10) {
        clearInterval(nftsmintedCountInterval);
      }
    }, 5 * 100);
  }, [fetchTotalSupply]);

  return (
    <div className={`container-fluid mx-auto  ${styles.bgImage}`}>
      <div className="row">
        <div className={`${styles.bHeading} text-center`}>
          <span className="text-2xl md:text-4xl">
            Claim your LOL Lord NFT Now!
          </span>
        </div>
        <div className="mt-8 w-124">
          <div
            className={`w-full h-auto overflow-hidden object-cover text-center`}>
            <Image
              className={`${styles.vipPass}`}
              src={images.lolCardImage}
              alt="LORD"
              width={280}
              height={280*1.45}
              priority={true}
            />


          </div>
        </div>
        <div className="mint mt-2 mb-2">
          <Mint />
        </div>
        <div className="text-center">
          {isConnected ? (
            <span className="text-2xl">
              {totalMinted}/2000 Lords Minted{" "}
            </span>
          ) : (
            // <span className="text-2xl">10 VIP Passes Available </span>
            <span></span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;
