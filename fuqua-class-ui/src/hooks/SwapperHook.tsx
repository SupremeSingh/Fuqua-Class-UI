import { ethers, utils } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { useContractCall, useContractFunction } from "@usedapp/core";

import swapperAbi from "../abi/Swapper.json";
import { swapperContractAddress } from "../contracts";

const SwapperInterface = new utils.Interface(swapperAbi);

var provider = ethers.providers.getDefaultProvider();

export const SwapperContract = new Contract(swapperContractAddress, SwapperInterface);

export function useSwapperContractMethod(methodName: string) {
  const { state, send } = useContractFunction(SwapperContract, methodName, {});
  return { state, send };
}
