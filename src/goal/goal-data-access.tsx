import {
    getSolmineaProgram,
    getSolmineaProgramId,
} from "../../solminea/src/index"

import { BN } from "@coral-xyz/anchor";

import { useConnection } from "@solana/wallet-adapter-react";
import { Cluster, PublicKey } from "@solana/web3.js";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useCluster } from "../components/cluster/cluster-data-access";
import { useAnchorProvider } from "../components/solana/use-anchor-provider";
import { useTransactionToast } from "../components/ui/ui-layout";
import { useMemo } from "react";

interface CreateGoalArgs {
    owner: PublicKey;
    title: string;
    target_amount: BN;
    template: string;
}
interface DepositArgs {
    owner: PublicKey;
    title: string;
    amount: BN;
}
interface CompleteArgs {
    owner: PublicKey;
    title: string;
}
export function useGoalProgram() {
    const { connection } = useConnection();
    const { cluster } = useCluster();
    const transactionToast = useTransactionToast();
    const provider = useAnchorProvider();
    const programId = useMemo(
        () => getSolmineaProgramId(cluster.network as Cluster),
        [cluster]
    );
    const program = getSolmineaProgram(provider);
    console.log(program);

    const accounts = useQuery({
        queryKey: ["goal", "all", { cluster }],
        queryFn: () => program.account.goal.all(),
    });

    const getProgramAccount = useQuery({
        queryKey: ["get-program-account", { cluster }],
        queryFn: () => connection.getParsedAccountInfo(programId),
    });

    const createGoal = useMutation<string, Error, CreateGoalArgs>({
        mutationKey: ["goalEntry", "create", { cluster }],
        mutationFn: async ({ owner, title, target_amount, template }) => {
            try {
                // const [goalAddress] = await PublicKey.findProgramAddress(
                //     [Buffer.from(title), owner.toBuffer()],
                //     program.programId
                // );
                return await program.methods
                    .createGoal(target_amount, title, template)
                    .accounts({
                        // goal: goalAddress,
                        owner,
                        // systemProgram: SystemProgram.programId,
                    })
                    .rpc();
            } catch (e) {
                console.error("CreateGoal error:", e);
                throw e;
            }
        },
        onSuccess: (signature) => {
            transactionToast(signature);
            accounts.refetch();
        },
        onError: (error) => {
            console.error("CreateGoal failed:", error);
            toast.error(`Failed to create goal entry: ${error.message}`);
        },
    });
    return {
        program,
        programId,
        accounts,
        getProgramAccount,
        createGoal,
    };
}

export function useGoalProgramAccount({ account }: { account: PublicKey }) {
    const { cluster } = useCluster();
    const transactionToast = useTransactionToast();
    const { program, accounts } = useGoalProgram();
    const accountQuery = useQuery({
        queryKey: ["goal", "fetch", { cluster, account }],
        queryFn: () => program.account.goal.fetch(account),
    });

    const depositGoal = useMutation<string, Error, DepositArgs>({
        mutationKey: ["goal", "deposit", { cluster }],
        mutationFn: async ({ title, amount, owner }) => {
            return program.methods.deposit(title, amount)
                .accounts({
                    // goal: goalAddress,
                    owner,
                    // systemProgram: SystemProgram.programId,
                })
                .rpc();
        },
        onSuccess: (signature) => {
            transactionToast(signature);
            accounts.refetch();
        },
        onError: (error) => {
            toast.error(`Failed to deposit in goal: ${error.message}`);
        },
    });

    const completeGoal = useMutation<string, Error, CompleteArgs>({
        mutationKey: ["goal", "complete", { cluster }],
        mutationFn: async ({ title, owner }) => {
            // const [goalAddress] = await PublicKey.findProgramAddress(
            //     [Buffer.from(title), owner.toBuffer()],
            //     program.programId
            // );
            return program.methods.completeGoal(title)
                .accounts({
                    // goal: goalAddress,
                    owner,
                    // systemProgram: SystemProgram.programId,
                })
                .rpc();
        }
    });

    return {
        accountQuery,
        depositGoal,
        completeGoal,
    };
}

