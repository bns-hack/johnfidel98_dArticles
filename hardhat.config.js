require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/WK5vilNJbt2FdH3ftQssOEvMxwdEsr2j',
      accounts: ['03935f27d78a2dcbde09c5b9d90357ba2b42e54f677e26dc6cc72d6bb815450d'],
    },
  },
};
