import React, { useState } from 'react';

const WalletGenerator = () => {
  const [mnemonic, setMnemonic] = useState('');
  const [wallets, setWallets] = useState([]);
  const [inputMnemonic, setInputMnemonic] = useState('');
  const [theme, setTheme] = useState('light');

  const generateMnemonic = () => {
    const newMnemonic = window.ethers.Wallet.createRandom().mnemonic.phrase;
    setMnemonic(newMnemonic);
    setInputMnemonic('');
  };

  const createWallet = () => {
    const mnemo = inputMnemonic || mnemonic;

    if (!mnemo) {
      alert('Please generate or input a mnemonic first!');
      return;
    }

    const newWallet = window.ethers.Wallet.fromMnemonic(mnemo, `m/44'/60'/0'/0/${wallets.length}`);
    setWallets([...wallets, newWallet]);
  };

  const handleMnemonicChange = (event) => {
    setInputMnemonic(event.target.value);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className={`${theme === 'light' ? 'bg-gray-100 text-gray-800' : 'bg-gray-900 text-gray-100'} min-h-screen flex flex-col items-center justify-center font-sans`}>
      <h1 className="mb-8 text-4xl font-bold">Web Based Wallet</h1>

      <div className="mb-8">
        <button
          onClick={generateMnemonic}
          className="px-6 py-3 text-lg text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors"
        >
          Generate Mnemonic
        </button>
        {mnemonic && (
          <div className="mt-4">
            <p className="italic">Mnemonic: {mnemonic}</p>
            <button
              onClick={() => copyToClipboard(mnemonic)}
              className="mt-2 px-4 py-2 text-sm text-white bg-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Copy Mnemonic
            </button>
          </div>
        )}
      </div>

      <div className="mb-8">
        <input
          type="text"
          placeholder="Input your mnemonic"
          value={inputMnemonic}
          onChange={handleMnemonicChange}
          className={`px-4 py-2 w-72 border ${theme === 'light' ? 'border-gray-300' : 'border-gray-600'} rounded-lg bg-white text-gray-800`}
        />
      </div>

      <button
        onClick={createWallet}
        className="px-6 py-3 text-lg text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Create Wallet
      </button>

      <div className="mt-8 space-y-4 w-full max-w-md">
        {wallets.map((wallet, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${theme === 'light' ? 'bg-white border border-gray-300' : 'bg-gray-800 border border-gray-600'}`}
          >
            <strong>Wallet {index + 1}</strong>
            <p>Public Key: {wallet.publicKey}</p>
            <button
              onClick={() => copyToClipboard(wallet.publicKey)}
              className="mt-2 px-4 py-2 text-sm text-white bg-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Copy Public Key
            </button>
            <p>Address: {wallet.address}</p>
            <button
              onClick={() => copyToClipboard(wallet.address)}
              className="mt-2 px-4 py-2 text-sm text-white bg-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Copy Address
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={toggleTheme}
        className="mt-8 px-6 py-3 text-lg text-white bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
      >
        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
      </button>

      <footer className={`${theme === 'light' ? 'bg-gray-100' : 'bg-gray-900'} mt-auto py-4 border-t w-full text-center`}>
        Created by Himanshu!
      </footer>
    </div>
  );
};

export default WalletGenerator;
