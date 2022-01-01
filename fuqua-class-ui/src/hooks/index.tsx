// hooks/index.ts
import { ethers, utils } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { useContractCall, useContractFunction } from "@usedapp/core";
import BalanceHandlerAbi from "../abi/BalanceHandler.json";
import { balanceHandlerContractAddress } from "../contracts";


const BalanceHandlerInterface = new utils.Interface(BalanceHandlerAbi);

var provider = ethers.providers.getDefaultProvider();

const BalanceHandlerContract = new Contract(
  balanceHandlerContractAddress,
  BalanceHandlerInterface,
  provider
);

export function useContractMethod(methodName: string) {
    const { state, send } = useContractFunction(BalanceHandlerContract, methodName, {});
    return { state, send };
  }


 