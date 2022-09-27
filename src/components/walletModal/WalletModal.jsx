import { useContext, useEffect, useState } from "react";
import { useAccount, useConnect, useNetwork, useSwitchNetwork } from "wagmi";

import { UserContext } from "../../context/UserContext";

const CHAIN_ID = 1;

const WalletModal = () => {
  const { isModalOpen, handleModal } = useContext(UserContext);
  const { isConnected, connector } = useAccount();
  const { connect, connectors } = useConnect();
  const { chain } = useNetwork();
  const { chains, switchNetwork } = useSwitchNetwork();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    if (!isConnected) return;
    if (chains.find((x) => x.id === chain?.id) > 0) return;

    switchNetwork && switchNetwork(CHAIN_ID);
  }, [chain?.id, chains, isConnected, switchNetwork]);

  return (
    <div className={`walletPage  ${isModalOpen && "active"} `}>
      <div className="overlay"></div>
      <div className="content">
        <div
          onClick={handleModal}
          className="absolute top-4 right-4 text-6xl font-extralight cursor-pointer bg-green-500 w-16 h-16 rounded-full flex items-center justify-center"
        >
          <span className="absolute top-1 left-2 right-3 bottom-1">
            &times;
          </span>
        </div>
        <h2>Select a wallet</h2>
        <p>
          By connecting your wallet, you agree to our
          <a href="#">Terms of Services</a> and our
          <a href="#">Privacy Policy.</a>
        </p>

        {connectors
          .filter((x) => isMounted && x.ready && x.id !== connector?.id)
          .map((x) => (
            <div key={x.id} onClick={() => connect({ connector: x })}>
              <a className="logo-container cursor-pointer">
                <div className="content-container ">
                  <h3 className="text-center font-bold">
                    {x.name === "Injected" ? "MetaMask" : x.name}
                  </h3>
                </div>
              </a>
            </div>
          ))}
      </div>
    </div>
  );
};

export default WalletModal;
