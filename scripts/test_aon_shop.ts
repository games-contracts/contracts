import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers } from "hardhat";
import { BigNumber } from "ethers";
import { ArenaBox } from "../typechain";

const opts = { gasLimit: 5000000 };

const deploy = async () => {
  const signers: SignerWithAddress[] = await ethers.getSigners();
  const ERC20Factory = await ethers.getContractFactory("Token");
  const ShopFactory = await ethers.getContractFactory("BoxShop");
  const BoxFactory = await ethers.getContractFactory("ArenaBox");
  const NFTFactory = await ethers.getContractFactory("ArenaNFT");

  // const BUSD = await ERC20Factory.deploy(`BUSD`, `BUSD`);
  // const BoxShop = await ShopFactory.deploy("BoxShop AON");
  // const ArenaBox = await BoxFactory.deploy();
  // const ArenaNFT = await NFTFactory.deploy();
  const BUSD = ERC20Factory.attach(`0xd88128c4FaF70bE440De55cd269D8767d26B5Aa5`);
  const BoxShop = ShopFactory.attach(`0xE5FA6023ceF0E5D542869F4fBbe9595ba3A6415a`);
  const ArenaBox = BoxFactory.attach(`0xfE5690cc88bd96c81DD09f0Aa7B58fb99bB82583`);
  const ArenaNFT = NFTFactory.attach(`0xbb240e710Bb6946c3c6E177Be9c5033271EC22Ab`);

  console.log(`BUSD`, BUSD.address);
  console.log(`BoxShop`, BoxShop.address);
  console.log(`ArenaBox`, ArenaBox.address);
  console.log(`ArenaNFT`, ArenaNFT.address);


  let tx;
  // setup Shop
  await BoxShop.setBox(ArenaBox.address);
  await ArenaBox.grantRole(ethers.utils.id(`MINTER_ROLE`), BoxShop.address);
  await ArenaBox.grantRole(ethers.utils.id(`SIGNER_ROLE`), signers[0].address);
  await ArenaNFT.grantRole(ethers.utils.id(`MINTER_ROLE`), ArenaBox.address);
  tx = await BoxShop.addPackage(
    BigNumber.from(0),
    BigNumber.from(8888888888),
    BigNumber.from(50),
    ethers.utils.parseEther("285"),
    BUSD.address,
    [BigNumber.from(0)],
    [BigNumber.from(3)],
    "Combo 1"
    , opts,
  );
  await tx.wait();
  tx = await BoxShop.addPackage(
    BigNumber.from(0),
    BigNumber.from(8888888888),
    BigNumber.from(100),
    ethers.utils.parseEther("140"),
    BUSD.address,
    [BigNumber.from(1)],
    [BigNumber.from(3)],
    "Combo 2"
    , opts,
  );
  await tx.wait();
  tx = await BoxShop.addPackage(
    BigNumber.from(0),
    BigNumber.from(8888888888),
    BigNumber.from(200),
    ethers.utils.parseEther("85"),
    BUSD.address,
    [BigNumber.from(2)],
    [BigNumber.from(3)],
    "Combo 3"
    , opts,
  );
  await tx.wait();
  // //setup Box
  tx = await ArenaBox.addBoxType(
    "Ultimate",
    ArenaNFT.address,
    "http://aon/ultimate/",
    opts,
  );
  await tx.wait();
  tx = await ArenaBox.addBoxType(
    "Special",
    ArenaNFT.address,
    "http://aon/special/",
    opts,
  );
  await tx.wait();
  tx = await ArenaBox.addBoxType(
    "Novice",
    ArenaNFT.address,
    "http://aon/novice/",
    opts,
  );
  await tx.wait();

  //buy
  tx = await BUSD.approve(BoxShop.address, ethers.constants.MaxUint256);
  await tx.wait();
  tx = await BoxShop.buy(BigNumber.from(0), BigNumber.from(2));
  await tx.wait();
  tx = await BoxShop.buy(BigNumber.from(5), BigNumber.from(2));

};


async function main(): Promise<void> {
  await deploy();
}

main()
  .then(() => process.exit(0))
  .catch((error: Error) => {
    console.error(error);
    process.exit(1);
  });

