import hre from "hardhat";
const { ethers } = hre;

async function main() {
  const [deployer] = await ethers.getSigners();
  if (!deployer) {
    throw new Error("No deployer signer available. Ensure DEPLOYER_PRIVATE_KEY is set in .env");
  }

  const network = await ethers.provider.getNetwork();
  const balance = await ethers.provider.getBalance(deployer.address);

  console.log("=================================================");
  console.log("PROBATIO REALITY ATTESTATION DEPLOYMENT");
  console.log("=================================================");
  console.log(`Network Name:     ${hre.network.name}`);
  console.log(`Chain ID:         ${network.chainId}`);
  console.log(`Deployer Address: ${deployer.address}`);
  console.log(`Deployer Balance: ${ethers.formatEther(balance)} BOT`);
  console.log("=================================================");

  if (balance === 0n) {
    throw new Error("Deployer balance is 0 BOT. Please fund the wallet before deploying.");
  }

  console.log("Deploying RealityAttestation contract...");
  const RealityAttestationFactory = await ethers.getContractFactory("RealityAttestation");
  const contract = await RealityAttestationFactory.deploy();
  await contract.waitForDeployment();

  const contractAddress = await contract.getAddress();
  const deployTx = contract.deploymentTransaction();

  console.log("\n Deployment Successful!");
  console.log(`Contract Address: ${contractAddress}`);
  if (deployTx) {
    console.log(`Transaction Hash: ${deployTx.hash}`);
  }

  const explorerUrl =
    Number(network.chainId) === 677
      ? `https://scan.botchain.ai/address/${contractAddress}`
      : `https://scan.bohr.life/address/${contractAddress}`;

  console.log(`Explorer Link:    ${explorerUrl}`);
  console.log("=================================================\n");

  return { contractAddress, deployTxHash: deployTx?.hash };
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
