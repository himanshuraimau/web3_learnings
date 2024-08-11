import React, { useState } from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { ethers } from 'ethers'; // Ensure ethers is imported

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: background-color 0.3s, color 0.3s;
    margin: 0;
    font-family: Arial, sans-serif;
  }
`;

const theme = {
  light: {
    body: '#fff',
    text: '#333',
    primary: '#4CAF50',
    secondary: '#007bff',
  },
  dark: {
    body: '#222',
    text: '#fff',
    primary: '#4CAF50',
    secondary: '#007bff',
  },
};

const WalletGenerator = () => {
  const [mnemonic, setMnemonic] = useState('');
  const [wallets, setWallets] = useState([]);
  const [inputMnemonic, setInputMnemonic] = useState('');
  const [currentTheme, setCurrentTheme] = useState('light');

  const generateMnemonic = () => {
    const newMnemonic = ethers.Wallet.createRandom().mnemonic.phrase;
    setMnemonic(newMnemonic);
    setInputMnemonic('');
  };

  const createWallet = () => {
    const mnemo = inputMnemonic || mnemonic;

    if (!mnemo) {
      alert('Please generate or input a mnemonic first!');
      return;
    }

    const newWallet = ethers.Wallet.fromMnemonic(mnemo, `m/44'/60'/0'/0/${wallets.length}`);
    setWallets([...wallets, newWallet]);
  };

  const handleMnemonicChange = (event) => {
    setInputMnemonic(event.target.value);
  };

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeProvider theme={theme[currentTheme]}>
      <GlobalStyle />
      <Container>
        <Title>Web Based Wallet</Title>

        <MnemonicSection>
          <GenerateButton onClick={generateMnemonic}>Generate Mnemonic</GenerateButton>
          {mnemonic && <MnemonicText>Mnemonic: {mnemonic}</MnemonicText>}
        </MnemonicSection>

        <InputSection>
          <Input
            type="text"
            placeholder="Input your mnemonic"
            value={inputMnemonic}
            onChange={handleMnemonicChange}
          />
        </InputSection>

        <CreateButton onClick={createWallet}>Create Wallet</CreateButton>

        <WalletList>
          {wallets.map((wallet, index) => (
            <WalletItem key={index}>
              <strong>Wallet {index + 1}</strong>
              <p>Public Key: {wallet.publicKey}</p>
              <p>Address: {wallet.address}</p>
            </WalletItem>
          ))}
        </WalletList>

        <ThemeToggle onClick={toggleTheme}>
          {currentTheme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        </ThemeToggle>
      </Container>
    </ThemeProvider>
  );
};

export default WalletGenerator;

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: ${({ theme }) => theme.body};
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 2em;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.text};
`;

const MnemonicSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const GenerateButton = styled.button`
  background-color: ${({ theme }) => theme.primary};
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-right: 10px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.primary + 'CC'}; /* Slightly darker primary color */
  }
`;

const MnemonicText = styled.p`
  font-style: italic;
  color: ${({ theme }) => theme.text};
`;

const InputSection = styled.div`
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 300px;
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
`;

const CreateButton = styled(GenerateButton)`
  background-color: ${({ theme }) => theme.secondary};

  &:hover {
    background-color: ${({ theme }) => theme.secondary + 'CC'}; /* Slightly darker secondary color */
  }
`;

const WalletList = styled.div`
  margin-top: 20px;
  width: 100%;
`;

const WalletItem = styled.div`
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
  padding: 10px;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.text + '20'}; /* Slightly lighter text color */
  }
`;
