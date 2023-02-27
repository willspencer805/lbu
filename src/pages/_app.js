import "@/styles/globals.css"
import "@rainbow-me/rainbowkit/styles.css"
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { configureChains, createClient, goerli, WagmiConfig } from "wagmi"
import { polygonMumbai } from "wagmi/chains"
import { infuraProvider } from "wagmi/providers/infura"
import { publicProvider } from "wagmi/providers/public"
import { ConnectButton } from "@rainbow-me/rainbowkit"

export default function App({ Component, pageProps }) {
  const { chains, provider } = configureChains(
    [polygonMumbai, goerli],
    [infuraProvider({ apiKey: process.env.INFURA_KEY }), publicProvider()]
  )

  const { connectors } = getDefaultWallets({
    appName: "My RainbowKit App",
    chains,
  })

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  })

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <ConnectButton />
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
