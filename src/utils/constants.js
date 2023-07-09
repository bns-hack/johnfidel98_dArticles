import articleContracts from "./ArticlesContract.json";

export const contractAddress = "0xa40962D060B12a95b3f08CD4E5a06d121c107aa3";
export const myAddress = "0x483e682441C0e97fAa259CD9dA4C7D332f1A443C";
export const contractABI = articleContracts.abi;

// util functions
export const shortenAddress = (address) =>
  `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;
