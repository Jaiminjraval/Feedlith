// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
// import "./index.css";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // // /// // /// / / Before Adding Ganache in Metamask /// /// // // // /

// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
// import "./index.css";
// import "@rainbow-me/rainbowkit/styles.css";

// import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
// import { WagmiProvider } from "wagmi";
// import {
//   mainnet,
//   polygon,
//   optimism,
//   arbitrum,
//   base,
//   sepolia,
//   hardhat, // Added hardhat for local testing
// } from "wagmi/chains";
// import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

// // 1. Configure Wagmi & RainbowKit
// // Replace 'YOUR_PROJECT_ID' with a real one from https://cloud.walletconnect.com
// // For testing locally, 'YOUR_PROJECT_ID' often works, but get a real one for prod.
// const config = getDefaultConfig({
//   appName: "Feedlith",
//   projectId: "05ecc0a18925e1b0c4e949bbb24e6a97",
//   chains: [sepolia, hardhat],
// });

// const queryClient = new QueryClient();

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <WagmiProvider config={config}>
//       <QueryClientProvider client={queryClient}>
//         <RainbowKitProvider>
//           <App />
//         </RainbowKitProvider>
//       </QueryClientProvider>
//     </WagmiProvider>
//   </React.StrictMode>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

// --- 1. DEFINE CUSTOM GANACHE NETWORK ---
const ganache = {
  id: 1337,
  name: "Ganache Local",
  iconUrl:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_f5tJjB8eQj_f5tJjB8eQj_f5tJjB8eQj_w&s", // Optional icon
  iconBackground: "#fff",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["http://127.0.0.1:7545"] }, // This must match your Ganache RPC
  },
};

// --- 2. ADD TO CONFIG ---
// Replace 'YOUR_PROJECT_ID' with 'test' or a real ID from walletconnect.com
const config = getDefaultConfig({
  appName: "Feedlith",
  projectId: "YOUR_PROJECT_ID",
  chains: [ganache, mainnet, sepolia], // <--- Added ganache here
  ssr: false, // Useful for Vite apps to prevent hydration errors
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
);
