// hooks/index.ts
import { ethers, utils } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { useContractCall, useContractFunction } from "@usedapp/core";

import BalanceHandlerAbi from "../abi/BalanceHandler.json";
import { balanceHandlerContractAddress } from "../contracts";

import swapperAbi from "../abi/BalanceHandler.json";
import { swapperContractAddress } from "../contracts";

const BalanceHandlerInterface = new utils.Interface(BalanceHandlerAbi);
const SwapperInterface = new utils.Interface(swapperAbi);

var provider = ethers.providers.getDefaultProvider();

const BalanceHandlerContract = new Contract(
  balanceHandlerContractAddress,
  BalanceHandlerInterface,
);

const SwapperContract = new Contract(
  swapperContractAddress,
  SwapperInterface,
);

export function useBalanceHandlerContractMethod(methodName: string) {
    const { state, send } = useContractFunction(BalanceHandlerContract, methodName, {});
    return { state, send };
}

export function useSwapperContractMethod(methodName: string) {
  const { state, send } = useContractFunction(SwapperContract, methodName, {});
  return { state, send };
}

 