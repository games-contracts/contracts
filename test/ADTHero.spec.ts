import { ethers } from "hardhat";

import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BigNumber } from "ethers";
import { Token } from "../typechain/Token";
import { ADTHero } from "../typechain/ADTHero";

const { expect } = require("chai");


describe("ADT Hero Buy NFT", () => {
  let signers: SignerWithAddress[];
  let ADTHero: ADTHero;
  let Token: Token;
  const fixture = async () => {
    const TokenFactory = await ethers.getContractFactory("Token");
    const ADTHeroFactory = await ethers.getContractFactory("ADTHero");
    Token = await TokenFactory.deploy("100000000000000000000000000000");
    ADTHero = await ADTHeroFactory.deploy();
    await ADTHero.setCurrency(Token.address);
    await Token.transfer(signers[2].address, ethers.utils.parseEther(`10000000`));
    await Token.connect(signers[2]).approve(ADTHero.address, ethers.utils.parseEther(`10000000`));
  };

  before(async () => {
    signers = await ethers.getSigners();
    await fixture();
  });

  describe("sign and buy nft", () => {
    it("succeeds grant role minter for sign msg", async () => {

      const tx = await ADTHero.grantRole(ethers.utils.id(`MINTER_ROLE`), signers[1].address);
      await tx.wait();
      expect(await ADTHero.hasRole(ethers.utils.id(`MINTER_ROLE`), signers[1].address)).eq(true);

    });

    it("succeeds for sign and buy", async () => {

      const info = {
        name: `ADT Character #1`,
        military: BigNumber.from(4),
        sex: BigNumber.from(1),
        army: BigNumber.from(2),
        level: BigNumber.from(3),
      };

      const expiry = BigNumber.from(Math.floor(new Date().getTime() / 1000 + 2 * 86400));
      const price = ethers.utils.parseEther("2000");

      const hash = ethers.utils.solidityKeccak256(
        ["address", "uint256", "string", "uint8", "uint8", "uint8", "uint8", "address", "uint256"],
        [signers[2].address, price, info.name, info.military, info.sex, info.army, info.level, ADTHero.address, expiry],
      );
      const messageHashBinary = ethers.utils.arrayify(hash);
      const signature = await signers[1].signMessage(messageHashBinary);

      const tx = await ADTHero.connect(signers[2]).buy(info, price, expiry, signature);
      await tx.wait();

      console.log(await ADTHero.getHero(BigNumber.from(1)));

      expect(await ADTHero.balanceOf(signers[2].address)).eq(BigNumber.from(1));

      const tx2 = ADTHero.connect(signers[2]).buy(info, price, expiry, signature);
      await expect(tx2).to.be.revertedWith(`signature has been used`);

    });

  });
})
;
