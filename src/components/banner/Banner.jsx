import Image from "next/image";
import * as images from "../../images";
import Mint from "../mint/Mint";
import styles from "./banner.module.css";

import { useAccount, useContract, useSigner, useNetwork } from "wagmi";
import { mainnetAddress, ABI } from "../../constants";
import { useCallback, useEffect, useRef, useState } from "react";

const Banner = () => {
  // const [totalMinted, setTotalMinted] = useState(0);
  const { data: signer } = useSigner();
  const { isConnected } = useAccount();

  const contractRef = useRef();

  const contract = useContract({
    addressOrName: mainnetAddress,
    contractInterface: ABI,
    signerOrProvider: signer,
  });

  contractRef.current = contract;

  // const fetchTotalSupply = useCallback(async () => {
  //   if (!isConnected) return;
  //   try {
  //     const totalSupply = await contractRef.current.totalSupply();
  //     setTotalMinted(parseInt(totalSupply));
  //     return totalSupply;
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }, [isConnected]);


  // useEffect(() => {
  //   const nftsmintedCountInterval = setInterval(async function () {
  //     let nftsmintedCount = fetchTotalSupply();
  //     if (nftsmintedCount == 10) {
  //       clearInterval(nftsmintedCountInterval);
  //     }
  //   }, 5 * 100);
  // }, [fetchTotalSupply]);
  // Set the date we're counting down to
  var countDownDate =  new Date("Oct 4, 2022 13:30:00 UTC").getTime()
        
  // Update the count down every 1 second
  var x = setInterval(function() {
  
    // Get today's date and time
    var now = Date.parse(new Date().toUTCString())
  
    // Find the distance between now and the count down date
    var distance = countDownDate - now;
  
    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
    // Display the result in the element with id="demo"
    if (typeof window !== "undefined") {
      window.document.getElementById("demo").innerHTML = days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";
  
    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x);
      window.document.getElementById("demo").innerHTML = "Mint is Live";
    }
    }
    
  }, 1000);

  return (
    <div className={`container-fluid mx-auto  ${styles.bgImage}`}>
      <div className="row">
        <div className={`${styles.bHeading} text-center`}>
          <span className="text-2xl md:text-4xl">
            Claim your LOL Lord NFT!
          </span>
          
          <h1 className="text-2xl md:text-4xl" id="demo"></h1>
          <h1 style={{fontSize:"120%"}}>(4th October, 13:30 UTC)</h1>
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
        {/* <div className="text-center">
          {isConnected ? (
            <span className="text-2xl">
              {totalMinted}/2000 Lords Minted{" "}
            </span>
          ) : (
            // <span className="text-2xl">10 VIP Passes Available </span>
            <span></span>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default Banner;
