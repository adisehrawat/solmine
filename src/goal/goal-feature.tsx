"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { AppHero, ellipsify } from "../components/ui/ui-layout";
import { ExplorerLink } from "../components/cluster/cluster-ui";
import { useGoalProgram } from "./goal-data-access";
import GoalUI from "./goal-ui";

export default function GoalFeature() {
  const { publicKey } = useWallet();
  const { programId } = useGoalProgram();

  return publicKey ? (
    <div>
      <AppHero title="My Solana Goals" subtitle="Track and achieve your goals on-chain!">
        <p className="mb-6">
          <ExplorerLink
            path={`account/${programId}`}
            label={ellipsify(programId.toString())}
          />
        </p>
        <GoalUI />
      </AppHero>
    </div>
  ) : (
    <div className="max-w-4xl mx-auto">
      <div className="hero py-[64px]">
        <div className="hero-content text-center">
        </div>
      </div>
    </div>
  );
}


