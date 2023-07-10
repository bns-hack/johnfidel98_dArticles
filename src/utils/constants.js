import articleContracts from "./ArticlesContract.json";

export const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
export const contractABI = articleContracts.abi;

// util functions
export const shortenAddress = (address) =>
  `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;
