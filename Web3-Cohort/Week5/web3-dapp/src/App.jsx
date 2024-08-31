import { useState } from 'react'
import './App.css'

import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

import '@solana/wallet-adapter-react-ui/styles.css';

function App() {


  return (
   <div>
             <ConnectionProvider endpoint={endpoint}>
              <WalletProvider wallets={wallets} autoConnect>
               <WalletModalProvider>
                <div>
                  HI there
                </div>
               </WalletModalProvider>
              </WalletProvider>

              </ConnectionProvider>
   </div>
  )
}

export default App
