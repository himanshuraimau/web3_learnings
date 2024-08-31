import { useState } from 'react'
import './App.css'

import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton,
    WalletConnectButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

import '@solana/wallet-adapter-react-ui/styles.css';
import { Airdrop } from './Airdrop';

function App() {


  return (
   <div>
             <ConnectionProvider endpoint={'https://solana-devnet.g.alchemy.com/v2/MEWpR2vF8fLlJn4d0oAbM1CUxfwwafQ8'}>
              <WalletProvider wallets={[]} autoConnect>
               <WalletModalProvider>
                <WalletMultiButton/>
                <WalletDisconnectButton/>
               <Airdrop></Airdrop>
               </WalletModalProvider>
              </WalletProvider>

              </ConnectionProvider>
   </div>
  )
}

export default App
