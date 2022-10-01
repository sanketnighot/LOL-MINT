import toast from "react-hot-toast";
import { ethers } from "ethers";
import { useState, useContext, useRef, useEffect } from "react";
import { useAccount, useContract, useSigner, useNetwork } from "wagmi";
import { UserContext } from "../../context/UserContext";
import { mainnetAddress, ABI } from "../../constants";
import styles from "./Mint.module.css";
import WalletModal from "../walletModal/WalletModal";
import axios from 'axios';

const Mint = () => {
  const { address, isConnected } = useAccount();
  const { data: signer } = useSigner();
  const { chain } = useNetwork();
  const { handleModal } = useContext(UserContext);
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [maxMint, setMaxMint] = useState(5);
  const [price, setPrice] = useState(5);
  const [nftBalance, setBalance] = useState(0);

  const contractRef = useRef();

  const contract = useContract({
    addressOrName: mainnetAddress,
    contractInterface: ABI,
    signerOrProvider: signer,
  });

  contractRef.current = contract;

  useEffect( async ()=> {
		const interval = setInterval( async () => {
      const maxMintAmount = await contractRef.current.maxMintAmount();
      const nftPrice = await contractRef.current.mintPrice();
      const balance = await contractRef.current.balanceOf(address);
      setMaxMint(parseInt(maxMintAmount));
			setPrice(parseInt(nftPrice))
      setBalance(parseInt(balance));
			}, 7000);
		return () => clearInterval(interval);}
  );
    

  const mint = async () => {
    setLoading(true);
    try {
      const proof = await axios.get(`https://lordapi.herokuapp.com/api/getMerkleProof?address=${address}`);
      if (proof.data !== "Invalid Address") {
          await (
          await contract.mint(address, count, proof.data, {value: (count * price).toString() })
        ).wait();
        toast.success("Successfully Minted");
      } else {
        toast.error("This address is not whitelisted");
      }
      
    } catch (err) {
      if (chain?.id !== 5) {
        toast.error("Switch to Goerli Test Network");
      } else if (err?.code == 4001) {
        toast.error("User rejected the transaction");
      } else if (err?.error?.code == -32000) {
        toast.error("Insufficient funds to complete the transaction");
      } else {
        console.log(err)
        toast.error("Something went wrong");
      }
    }
    setLoading(false);
  };

  const updateCount = (action) => {
    if (action === "add" && count < maxMint) {
      setCount(count + 1);
    } else if (action === "subtract" && count > 1) {
      setCount(count - 1);
    }
  }
 
  return (
    <div className="container mx-auto">
      <div className="row">
      <div className="text-center mt-10 mb-10">
          <span onClick={() => (updateCount("subtract"))} className={`${styles.countBtnBgColor} cursor-pointer`}>
          -1
          </span>
          <span style={{fontSize:"350%"}}> {count} Lords </span>
          <span onClick={() => (updateCount("add"))} className={`${styles.countBtnBgColor} cursor-pointer`}>
          +1
          </span>
          <br/><span>You can mint maximum {maxMint} Lord NFTs per wallet </span>

        </div>
        {(nftBalance >= maxMint) ? <div
          onClick={() => (isConnected ? mint() : handleModal())}
          className="text-center mt-10 mb-10">
          <span className={`${styles.mintBtnBgColor} cursor-pointer`}>
            {isConnected
              ? loading
                ? "Minting...."
                : "Mint"
              : "Connect Wallet"}
          </span>
          <WalletModal />
        </div> : <div className="text-center mt-10 mb-10"><h1>This wallet has already minted {nftBalance} Lord NFT's</h1></div>}
        
      </div>
    </div>
  );
};

export default Mint;