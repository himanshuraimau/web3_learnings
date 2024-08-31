import React, { useState } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export function Airdrop() {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const [amount, setAmount] = useState("");

  const sendAirdropToUser = async () => {
    if (!publicKey) {
      console.error("Wallet not connected!");
      return;
    }

    const lamports = parseFloat(amount) * LAMPORTS_PER_SOL;
    
    try {
        console.log('publicKey', publicKey.toString())
      const signature = await connection.requestAirdrop(publicKey, lamports);
      console.log(`Airdrop successful! Signature: ${signature}`);
    } catch (error) {
      console.error("Error requesting airdrop:", error);
    }
  };

  return (
    <div className="airdrop">
      <input
        type="number"
        placeholder="Amount in SOL"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={sendAirdropToUser}>Airdrop</button>
    </div>
  );
}