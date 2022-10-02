import toast from "react-hot-toast";
import { useState, useContext, useRef, useEffect } from "react";
import { useAccount, useContract, useSigner, useNetwork, ConnectorAlreadyConnectedError } from "wagmi";
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
  const [whitelistStatus, setWhitelistStatus] = useState(false);
  const [contractStatus, setContractStatus] = useState(true);

  const contractRef = useRef();

  const contract = useContract({
    addressOrName: mainnetAddress,
    contractInterface: ABI,
    signerOrProvider: signer,
  });

  contractRef.current = contract;

  useEffect(()=> {
		const interval = setInterval( async () => {
      if (address) {
        const maxMintAmount = await contractRef.current.maxMintAmount();
        const nftPrice = await contractRef.current.mintPrice();
        const status = await contractRef.current.whitelistStatus();
        const contractStatus = await contractRef.current.paused();
        setMaxMint(parseInt(maxMintAmount));
        setPrice(parseInt(nftPrice));
        setWhitelistStatus(status);
        setContractStatus(contractStatus);
      }
      
			}, 800);
		return () => clearInterval(interval);}
  );
    

  const mint = async () => {
    setLoading(true);
    try {
      if (!contractStatus) {
          if (!whitelistStatus) {
          const proof = await axios.get(`https://lordapi.herokuapp.com/api/getMerkleProof?address=${address}`);
          if (proof.data !== "Invalid Address") {
              await (
              await contract.mint(address, count, proof.data, {value: (count * price).toString() })
            ).wait();
            toast.success("Successfully Minted");
          } else {
            toast.error("This address is not whitelisted");
            // You cannot mint more than count nfts per wallet.
          }
        } else {
          await (
            await contract.mint(address, count, [], {value: (count * price).toString() })
            ).wait();
            toast.success("Successfully Minted");
        }
      } else {
        toast.error("Minting has not started yet");
      }
      
      
    } catch (err) {
      if (chain?.id !== 1) {
        toast.error("Switch to Mainnet Network");
      } else if (err?.code == 4001) {
        toast.error("User rejected the transaction");
      } else if (err?.error?.code == -32000) {
        toast.error("Insufficient funds to complete the transaction");
      } else {
        console.log(err)
        toast.error(err.message.reason);
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
      <div className="text-center mt-1 mb-1">
          <span onClick={() => (updateCount("subtract"))} className={`${styles.countBtnBgColor} cursor-pointer`}>
          -
          </span>
          <span style={{fontSize:"350%"}}> {count} </span>
          <span onClick={() => (updateCount("add"))} className={`${styles.countBtnBgColor} cursor-pointer`}>
          +
          </span>
          <br/><br/><h1 style={{fontSize:"150%"}}>WL Mint: 0.15 ETH</h1>
          <span>You can mint maximum {maxMint} Lord NFTs per wallet </span>
         
        </div>
        <div
          onClick={() => (isConnected ? mint() : handleModal())}
          className="text-center mt-10 mb-10">
          <span className={`${styles.mintBtnBgColor} cursor-pointer`}>
            {isConnected
              ? loading
                ? "Minting...."
                : `Mint [${(count * (price/1000000000000000000)).toFixed(2)} ETH]`
              : "Connect Wallet"}
          </span>
          <WalletModal />
        </div>
        
      </div>
    </div>
  );
};

export default Mint;
