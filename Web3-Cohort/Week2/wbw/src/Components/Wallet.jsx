import React, { useState } from 'react';
import { ethers } from 'ethers';

const WalletGenerator = () => {
  const [mnemonic, setMnemonic] = useState('');
  const [wallets, setWallets] = useState([]);

  const generateMnemonic = () => {
    const newMnemonic = ethers.Wallet.createRandom().mnemonic.phrase;
    setMnemonic(newMnemonic);
  };

  const createWallet = () => {
    if (!mnemonic) {
      alert('Please generate a mnemonic first!');
      return;
    }

    const newWallet = ethers.Wallet.fromMnemonic(mnemonic, `m/44'/60'/0'/0/${wallets.length}`);
    setWallets([...wallets, newWallet]);
  };

  return (
    <div>
      <button onClick={generateMnemonic}>Generate Mnemonic</button>
      {mnemonic && <p>Mnemonic: {mnemonic}</p>}

      <button onClick={createWallet}>Create Wallet</button>

      <div id="wallets">
        {wallets.map((wallet, index) => (
          <div key={index} className="wallet">
            <strong>Wallet {index + 1}</strong>
            <p>Public Key: {wallet.publicKey}</p>
            <p>Address: {wallet.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WalletGenerator;
