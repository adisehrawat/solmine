"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { AppHero } from "../components/ui/ui-layout";
import GoalUI from "./goal-ui";

export default function GoalFeature() {
  const { publicKey } = useWallet();

  return publicKey ? (
    <div>
      <AppHero title="My Solana Goals" subtitle="Track and achieve your goals on-chain!">
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


