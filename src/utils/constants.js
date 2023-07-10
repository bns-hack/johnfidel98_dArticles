import articleContracts from "./ArticlesContract.json";

export const contractAddress = "0xc9db00d7cb05980807A119EAd2603346B2Cab112";
export const myAddress = "0x483e682441C0e97fAa259CD9dA4C7D332f1A443C";
export const contractABI = articleContracts.abi;

// util functions
export const shortenAddress = (address) =>
  `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;
