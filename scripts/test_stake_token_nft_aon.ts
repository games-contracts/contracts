import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers } from "hardhat";
import { BigNumber } from "ethers";

const opts = { gasLimit: 25000000 };

const deploy = async () => {
  const signers: SignerWithAddress[] = await ethers.getSigners();
  const ERC721Factory = await ethers.getContractFactory("NFT");
  const ERC20Factory = await ethers.getContractFactory("Token");
  const NFT = ERC721Factory.attach(`0x85a2Dc779F5a03d4f5256E087CdDE1459bC4Bb51`); //await ERC721Factory.deploy(`AON NFT`, `AON NFT`);
  const AON = ERC20Factory.attach(`0xF2e9212e14Cc47f8105F5cC5f20FD077F4Ae7C36`);//await ERC20Factory.deploy(`AON`, `AON`);
  console.log(`AON`, AON.address);
  console.log(`NFT`, NFT.address);

  const StakeFactory = await ethers.getContractFactory("AONStakingPoolRewardNFT");
  // _name,
  // address _stakedToken,
  const StakeContract = await StakeFactory.deploy(
    "AON Staking Pool Reward NFT",
    AON.address,
  );
  // const StakeContract = StakeFactory.attach(`0x07406b3D9fc724A2735E33a55f6F83550DAe8A66`);
  console.log(`StakeContract`, StakeContract.address);
  await NFT["mintMany(address,uint256[])"](StakeContract.address, ["10", "11"]);
  await AON.approve(StakeContract.address, ethers.constants.MaxUint256);
  await StakeContract.addPackage(
    ethers.utils.parseEther("10000"),
    BigNumber.from(600),
    NFT.address,
  );
  await StakeContract.stake(BigNumber.from(1));

};
const stake = async () => {
  const signers: SignerWithAddress[] = await ethers.getSigners();
  const StakeFactory = await ethers.getContractFactory("AONStakingPoolRewardNFT");
  const StakeContract = StakeFactory.attach(`0x7ed27a04017a48fd45F8C1ae8c4352F17639AE0a`);
  // const tx = await StakeContract.initRewardIds("0", ["10", "11"]);
  // await tx.wait();
  await StakeContract.stake("0");
};
const withdraw = async () => {
  const signers: SignerWithAddress[] = await ethers.getSigners();
  const StakeFactory = await ethers.getContractFactory("AONStakingPoolRewardNFT");
  const StakeContract = StakeFactory.attach(`0x7ed27a04017a48fd45F8C1ae8c4352F17639AE0a`);
  const tx = await StakeContract.withdraw("0");
  await tx.wait();
};
const addPackage = async () => {
  const signers: SignerWithAddress[] = await ethers.getSigners();
  const StakeFactory = await ethers.getContractFactory("AONStakingPoolRewardNFT");
  const StakeContract = StakeFactory.attach(`0x7d87373D2DDE85a34db9b056752d69E1f05ec18b`);
  await StakeContract.addPackage(
    ethers.utils.parseEther("10000"),
    BigNumber.from(600),
    `0x85a2Dc779F5a03d4f5256E087CdDE1459bC4Bb51`,
  );
};

async function main(): Promise<void> {
  // await deploy();
  await stake();
  // await withdraw();
  // await addPackage();

}

main()
  .then(() => process.exit(0))
  .catch((error: Error) => {
    console.error(error);
    process.exit(1);
  });

