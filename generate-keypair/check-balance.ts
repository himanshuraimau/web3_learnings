import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { sha256 } from 'js-sha256';
import { Buffer } from 'buffer';

// Constants for the Solana Name Service program
const NAME_SERVICE_PROGRAM_ID = new PublicKey("ApPAyQsEqpJN6jachpeEdarFAeH3AW8paBCwRf153jFe");

async function getHashedName(name) {
  const hashed = sha256.digest(name);
  return Buffer.from(hashed);
}

async function getNameAccountKey(hashedName) {
  const [nameAccountKey] = await PublicKey.findProgramAddress(
    [Buffer.from(hashedName), Buffer.from(NAME_SERVICE_PROGRAM_ID.toBuffer())],
    NAME_SERVICE_PROGRAM_ID
  );
  return nameAccountKey;
}

async function getWalletPublicKey(connection, domain) {
  const hashedName = await getHashedName(domain);
  const nameAccountKey = await getNameAccountKey(hashedName);
  const nameAccountInfo = await connection.getAccountInfo(nameAccountKey);

  if (nameAccountInfo === null) {
    throw new Error(`Failed to fetch name account info for ${domain}`);
  }

  const ownerPublicKey = new PublicKey(nameAccountInfo.data.slice(32, 64));
  return ownerPublicKey;
}

async function getWalletBalance(connection, domain) {
  try {
    const publicKey = await getWalletPublicKey(connection, domain);
    const balanceInLamports = await connection.getBalance(publicKey);
    const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

    console.log(`💰 The balance for the wallet ${domain} at address ${publicKey} is ${balanceInSOL} SOL!`);
  } catch (error) {
    console.error(`❌ Error resolving wallet domain ${domain}:`, error);
  }
}

async function fetchBalances() {
  const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");
  const walletDomains = ["toly.sol", "shaq.sol", "mccann.sol"];

  for (const domain of walletDomains) {
    await getWalletBalance(connection, domain);
  }
}

fetchBalances().catch(console.error);
