import toast from "react-hot-toast";
import { ethers } from "ethers";
import { useState, useContext } from "react";
import { useAccount, useContract, useSigner, useNetwork } from "wagmi";

import { UserContext } from "../../context/UserContext";
import { mainnetAddress, ABI } from "../../constants";
import styles from "./Mint.module.css";
import WalletModal from "../walletModal/WalletModal";

const Mint = () => {
  const { isConnected } = useAccount();
  const { data: signer } = useSigner();
  const { chain } = useNetwork();
  const { handleModal } = useContext(UserContext);

  const [loading, setLoading] = useState(false);

  const contract = useContract({
    addressOrName: mainnetAddress,
    contractInterface: ABI,
    signerOrProvider: signer,
  });

  const mint = async () => {
    setLoading(true);
    try {
      await (
        await contract.mint({ value: ethers.utils.parseEther("0.04") })
      ).wait();
      toast.success("Successfully Minted");
    } catch (err) {
      if (chain?.id !== 1) {
        toast.error("Switch to mainnet");
      } else if (err?.code == 4001) {
        toast.error("User rejected the transaction");
      } else if (err?.error?.code == -32000) {
        toast.error("Insufficient funds to complete the transaction");
      } else toast.error("Something went wrong");
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto">
      <div className="row">
        <div
          onClick={() => (isConnected ? mint() : handleModal())}
          className="text-center mt-10 mb-10"
        >
          <span className={`${styles.mintBtnBgColor} cursor-pointer  `}>
            {isConnected
              ? loading
                ? "Minting...."
                : "Mint"
              : "Connect Wallet"}
          </span>
          <WalletModal />
        </div>
      </div>
    </div>
  );
};

export default Mint;
