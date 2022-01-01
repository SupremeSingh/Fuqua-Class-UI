import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { ethers, utils } from "ethers";
import BalanceHandlerAbi from "../abi/BalanceHandler.json";
import { balanceHandlerContractAddress } from "../contracts";
import { AbiItem } from "web3-utils";

const alchemyKey =
  "https://eth-ropsten.alchemyapi.io/v2/9leoDgecFoI_noGrwAjXq1SdH5QkU_pz";
const web3 = createAlchemyWeb3(alchemyKey);

export const BalanceHandlerContract = new web3.eth.Contract(
  BalanceHandlerAbi as AbiItem[],
  balanceHandlerContractAddress
);

export const loadCurrentMessage = async () => {
  const message = await BalanceHandlerContract.methods.fqOneToken().call();
  return message;
};
