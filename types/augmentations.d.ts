// eslint-disable @typescript-eslint/no-explicit-any
import { Fixture } from "ethereum-waffle";
import {
  ChainverseDeveloper,
  ChainverseFactory,
  ChainverseGame,
  ChainverseItem,
  ChainverseItemCategory,
  ChainverseToken,
  MarketService,
  NFTRouter,
} from "../typechain";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { MarketServiceV2 } from "../typechain/MarketServiceV2";
import { BigNumber, Contract } from "ethers";

declare module "mocha" {
  export interface Context {
    marketService: MarketServiceV2;
    ERC721Contract: Contract;
    tokenId: BigNumber;
    listingId: BigNumber;
    MarketService: MarketService;
    loadFixture: <T>(fixture: Fixture<T>) => Promise<T>;
    signers: SignerWithAddress[];
  }
}
