const hre = require("hardhat");

const main = async () => {
  const aContract = await hre.ethers.deployContract("ArticlesContract110");

  // wait for deployment
  await aContract.waitForDeployment();
  console.log(`Articles deployed to ${aContract.target}`);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
