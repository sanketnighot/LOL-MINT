import "../styles/globals.css";
import "../styles/walletModal.css";
import "../styles/navbar.css";

import { Toaster } from "react-hot-toast";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import {
  WagmiConfig,
  createClient,
  configureChains,
  defaultChains,
} from "wagmi";

import { Layout } from "../src/components";
import { UserContextProvider } from "../src/context/UserContext";

const { provider, webSocketProvider } = configureChains(defaultChains, [
  publicProvider(),
]);

const client = createClient({
  connectors: [
    new MetaMaskConnector(),
    new WalletConnectConnector({ options: { qrcode: true } }),
    new CoinbaseWalletConnector({ options: { appName: "VIP_LOL_PASS" } }),
  ],
  autoConnect: true,
  provider,
  webSocketProvider,
});

const MyApp = ({ Component, pageProps }) => (
  <WagmiConfig client={client}>
    <UserContextProvider>
      <Layout>
        <Toaster containerClassName={{ fontSize: "2rem" }} />
        <Component {...pageProps} />
      </Layout>
    </UserContextProvider>
  </WagmiConfig>
);

export default MyApp;
