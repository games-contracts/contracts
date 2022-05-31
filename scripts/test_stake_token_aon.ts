import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers } from "hardhat";
import { BigNumber } from "ethers";

const opts = { gasLimit: 25000000 };

const deploy = async () => {
  const signers: SignerWithAddress[] = await ethers.getSigners();
  const ERC20Factory = await ethers.getContractFactory("Token");
  const AON = await ERC20Factory.deploy(`AON`, `AON`);
  console.log(`AON`, AON.address);
  const StakeFactory = await ethers.getContractFactory("AONStakingPoolRewardToken");
  // _name,
  // address _stakedToken,
  // address _rewardToken,
  // uint _startTime,
  // uint _endTime,
  // uint _limitUsers,
  // uint _limitVolume,
  // uint _limitStakedPerUser,
  // uint _mpr
  const StakeContract = await StakeFactory.deploy(
    "AON Staking Pool - 13%",
    AON.address,
    AON.address,
    0,
    BigNumber.from(30 * 86400),
    BigNumber.from(13),
  );
  console.log(`StakeContract`, StakeContract.address);
  await AON.transfer(StakeContract.address, ethers.utils.parseEther(`10000000`));
  await AON.approve(StakeContract.address, ethers.constants.MaxUint256);
  await StakeContract.stake(ethers.utils.parseEther(`10000`));
};

const harvest = async () => {
  const signers: SignerWithAddress[] = await ethers.getSigners();

  const StakeFactory = await ethers.getContractFactory("AONStakingPoolRewardToken");
  const StakeContract = StakeFactory.attach(`0x441eeBeD3b3F3007Fa92868f871E8287cc711e2d`);
  console.log(await StakeContract.earned(signers[0].address));
  console.log(await StakeContract.users(signers[0].address));
  console.log(await StakeContract.balanceOf(signers[0].address));
  await StakeContract.harvest();
  await StakeContract.withdraw();
};

async function main(): Promise<void> {
  await deploy();
  // await harvest();

}

main()
  .then(() => process.exit(0))
  .catch((error: Error) => {
    console.error(error);
    process.exit(1);
  });

