import { ethers, utils } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { useContractCall, useContractFunction } from "@usedapp/core";

import BalanceHandlerAbi from "../abi/BalanceHandler.json";
import { balanceHandlerContractAddress } from "../contracts";

const BalanceHandlerInterface = new utils.Interface(BalanceHandlerAbi);

var provider = ethers.providers.getDefaultProvider();

export const BalanceHandlerContract = new Contract(
  balanceHandlerContractAddress,
  BalanceHandlerInterface
);

export function useBalanceHandlerContractMethod(methodName: string) {
  const { state, send } = useContractFunction(
    BalanceHandlerContract,
    methodName,
    {}
  );
  return { state, send };
}
