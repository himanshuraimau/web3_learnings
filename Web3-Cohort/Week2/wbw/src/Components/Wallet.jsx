import React, { useState } from 'react';

const WalletGenerator = () => {
  const [mnemonic, setMnemonic] = useState('');
  const [wallets, setWallets] = useState([]);
  const [inputMnemonic, setInputMnemonic] = useState('');
  const [theme, setTheme] = useState('light');
  const [generatedKey, setGeneratedKey] = useState('');

  const generateMnemonic = () => {
    const newMnemonic = window.ethers.Wallet.createRandom().mnemonic.phrase;
    setMnemonic(newMnemonic);
    setInputMnemonic('');
    setGeneratedKey('');
  };

  const createWallet = () => {
    const mnemo = inputMnemonic || mnemonic;

    if (!mnemo) {
      alert('Please generate or input a mnemonic first!');
      return;
    }

    const newWallet = window.ethers.Wallet.fromMnemonic(mnemo, `m/44'/60'/0'/0/${wallets.length}`);
    setWallets([...wallets, newWallet]);
    setGeneratedKey(newWallet.privateKey);
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
    <div className={`${theme === 'light' ? 'bg-gray-100 text-gray-800' : 'bg-gray-900 text-gray-100'} min-h-screen flex flex-col items-center justify-center font-sans p-4`}>
      <h1 className="mb-10 text-3xl md:text-5xl font-extrabold text-center">Web Wallet Generator</h1>

      <div className="w-full max-w-lg">
        <div className="flex flex-col items-center mb-10">
          <button
            onClick={generateMnemonic}
            className="w-full px-4 md:px-6 py-3 mb-4 text-lg text-white bg-green-600 rounded-lg hover:bg-green-700 transition duration-300 shadow-lg"
          >
            Generate Mnemonic
          </button>
          {mnemonic && (
            <div className="mt-4 p-4 rounded-lg bg-white dark:bg-gray-800 w-full shadow-lg border-l-4 border-green-500 overflow-x-auto">
              <p className="italic text-gray-700 dark:text-gray-200">Mnemonic:</p>
              <p className="font-mono mt-2 mb-2 text-green-700 dark:text-green-400 break-words">{mnemonic}</p>
              <button
                onClick={() => copyToClipboard(mnemonic)}
                className="mt-2 px-4 py-2 w-full text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Copy Mnemonic
              </button>
            </div>
          )}
        </div>

        <div className="mb-10 flex flex-col items-center">
          <input
            type="text"
            placeholder="Input your mnemonic"
            value={inputMnemonic}
            onChange={handleMnemonicChange}
            className={`px-4 py-2 mb-4 w-full border ${theme === 'light' ? 'border-gray-300' : 'border-gray-600'} rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          <button
            onClick={createWallet}
            className="w-full px-4 md:px-6 py-3 text-lg text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300 shadow-lg"
          >
            Create Wallet
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {wallets.map((wallet, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${theme === 'light' ? 'bg-white border border-gray-300' : 'bg-gray-800 border border-gray-600'} shadow-lg transition-transform transform hover:scale-105 overflow-x-auto`}
            >
              <strong className="block mb-2 text-xl">Wallet {index + 1}</strong>
              <p className="mb-1 text-sm text-gray-600 dark:text-gray-300">Public Key:</p>
              <p className="font-mono mb-2 text-blue-600 dark:text-blue-400 break-words">{wallet.publicKey}</p>
              <button
                onClick={() => copyToClipboard(wallet.publicKey)}
                className="w-full px-4 py-2 mb-4 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Copy Public Key
              </button>
              <p className="mb-1 text-sm text-gray-600 dark:text-gray-300">Address:</p>
              <p className="font-mono mb-2 text-blue-600 dark:text-blue-400 break-words">{wallet.address}</p>
              <button
                onClick={() => copyToClipboard(wallet.address)}
                className="w-full px-4 py-2 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Copy Address
              </button>
            </div>
          ))}
        </div>

        {generatedKey && (
          <div className="mt-10 p-4 rounded-lg bg-white dark:bg-gray-800 shadow-lg w-full border-l-4 border-red-500 overflow-x-auto">
            <p className="text-lg font-bold text-gray-700 dark:text-gray-200">Private Key:</p>
            <p className="font-mono mt-2 mb-4 text-red-600 dark:text-red-400 break-words">{generatedKey}</p>
            <button
              onClick={() => copyToClipboard(generatedKey)}
              className="w-full px-4 py-2 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600 transition duration-300"
            >
              Copy Private Key
            </button>
          </div>
        )}
      </div>

      <button
        onClick={toggleTheme}
        className="mt-10 px-6 py-3 text-lg text-white bg-gray-700 dark:bg-gray-200 dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-300 transition duration-300 shadow-lg"
      >
        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
      </button>

      <footer className={`${theme === 'light' ? 'bg-gray-100' : 'bg-gray-900'} mt-auto py-6 border-t w-full text-center`}>
        <p className="text-sm text-gray-500 dark:text-gray-400">Created by Himanshu!</p>
      </footer>
    </div>
  );
};

export default WalletGenerator;
