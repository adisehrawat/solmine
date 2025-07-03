

"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { BN } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import { useState, memo } from "react";
import { motion } from "framer-motion";

import {
    Shield, Plane, Car, Home, GraduationCap, Plus, Check,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Dialog, DialogContent, DialogHeader,
    DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
    useGoalProgram,
    useGoalProgramAccount,
} from "./goal-data-access";

type GoalTemplate = {
  icon: React.ComponentType<any>;
  title: string;
  amount: number;
  color: [string, string];   // ← 2‑item tuple
  category: string;
};

export const goalTemplates: GoalTemplate[] = [
  { icon: Shield,        title: "Emergency Fund",      amount: 1,   color: ["#6366F1", "#8B5CF6"], category: "Emergency" },
  { icon: Plane,         title: "Vacation",            amount: 5,   color: ["#3B82F6", "#06B6D4"], category: "Vacation" },
  { icon: Car,           title: "New Car",             amount: 2,   color: ["#10B981", "#34D399"], category: "Car" },
  { icon: Home,          title: "House Down Payment",  amount: 5,   color: ["#F59E0B", "#FBBF24"], category: "Home" },
  { icon: GraduationCap, title: "Education",           amount: 1.5, color: ["#8B5CF6", "#6366F1"], category: "Education" },
];

type GoalCardProps = {
    goal: {
        pda: string;
        title: string;
        target: number;
        current: number;
        icon: any;
        color: [string, string];
        category: string;
    };
};

const GoalCard = memo(({ goal }: GoalCardProps) => {
    const { publicKey } = useWallet();
    const { depositGoal, completeGoal } = useGoalProgramAccount({
        account: new PublicKey(goal.pda),
    });

    const progress = Math.min((goal.current / (goal.target * 1_000_000_000)) * 100, 100);
    const Icon = goal.icon;

    const handleDeposit = async () => {
        const value = prompt("Deposit amount:");
        if (!value || !publicKey) return;

        const parsed = parseFloat(value);
        if (isNaN(parsed) || parsed <= 0) {
            alert("Invalid amount");
            return;
        }

        const amount = Math.round(parsed * 1_000_000_000);
        const targetInSOl = goal.target * 1_000_000_000;
        if (goal.current + amount > targetInSOl) {
            alert("This deposit would exceed the target amount.");
            return;
        }
        await depositGoal.mutateAsync({
            owner: publicKey,
            title: goal.title,
            amount: new BN(amount),
        });
    };

    const handleComplete = async () => {
        if (!publicKey) return;
        await completeGoal.mutateAsync({
            owner: publicKey,
            title: goal.title,
        });
        await completeGoal.mutateAsync({
            owner: publicKey,
            title: goal.title,
        });
    };

    return (
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-gray-600 transition-colors">
            <div className="flex items-center mb-6">
                <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mr-4"
                    style={{ background: `linear-gradient(135deg, ${goal.color[0]}, ${goal.color[1]})` }}
                >
                    <Icon size={24} color="#FFFFFF" />
                </div>
                <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white">{goal.title}</h3>
                    <p className="text-gray-400 text-sm">{goal.category}</p>
                </div>
                <div className="text-right">
                    <div className="text-xl font-bold text-white">{progress.toFixed(0)}%</div>
                </div>
            </div>

            <div className="mb-6">
                <div className="flex items-baseline mb-3">
                    <span className="text-2xl font-bold text-white">
                        {(Number(goal.current) / 1_000_000_000).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })} SOL
                    </span>
                    <span className="text-gray-400 ml-2">of {goal.target.toLocaleString()} SOL</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                    <div
                        className="h-2 rounded-full transition-all duration-300"
                        style={{
                            width: `${progress}%`,
                            background: `linear-gradient(90deg, ${goal.color[0]}, ${goal.color[1]})`,
                        }}
                    />
                </div>
            </div>

            <div className="flex gap-3">
                <Button
                    variant="outline"
                    size="sm"
                    className="border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white"
                    onClick={handleDeposit}
                >
                    <Plus size={16} className="mr-1" />
                    Add Funds
                </Button>

                <Button
                    variant="outline"
                    size="sm"
                    className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                    onClick={handleComplete}
                >
                    <Check size={16} className="mr-1" />
                    Complete
                </Button>
            </div>
        </div>
    );
});
GoalCard.displayName = "GoalCard";

export default function GoalUI() {
    const { publicKey } = useWallet();
    const { accounts, createGoal } = useGoalProgram();

    const [showCreateTemplateModal, setShowCreateTemplateModal] = useState(false);
    const [showCreateGoalModal, setShowCreateGoalModal] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState<typeof goalTemplates[number] | null>(null);
    const [draftTitle, setDraftTitle] = useState("");
    const [draftTarget, setDraftTarget] = useState("");

    const handleTemplateSelect = (template: typeof goalTemplates[number]) => {
        setSelectedTemplate(template);
        setDraftTitle(template.title);
        setDraftTarget(String(template.amount));
        setShowCreateTemplateModal(false);
        setShowCreateGoalModal(true);
    };

    const handleSaveGoal = async () => {
        if (!publicKey || !draftTitle || !draftTarget || !selectedTemplate) return;

        await createGoal.mutateAsync({
            owner: publicKey,
            title: draftTitle,
            target_amount: new BN(draftTarget),
            template: selectedTemplate.title,
        });

        setShowCreateGoalModal(false);
        setDraftTitle("");
        setDraftTarget("");
        setSelectedTemplate(null);
    };

    const mappedGoals = (accounts.data || [])
        .filter((acc: any) => acc.account.owner.toBase58() === publicKey?.toBase58())
        .map((acc: any) => {
            const tpl = goalTemplates.find((t) => t.title === acc.account.template);
            return {
                pda: acc.publicKey.toBase58(),
                title: acc.account.title,
                target: Number(acc.account.targetAmount.toString()),
                current: Number(acc.account.depositedAmount.toString()),
                icon: tpl?.icon ?? Shield,
                color: tpl?.color ?? ["#6366F1", "#8B5CF6"],
                category: acc.account.template ?? "Uncategorised",
            };
        });

    const totalSaved = mappedGoals.reduce((s, g) => s + g.current, 0);
    const totalSavedInSOL = totalSaved / 1_000_000_000;
    const avgProgress = mappedGoals.length
        ? mappedGoals.reduce((sum, g) => sum + (g.current / 1_000_000_000) / (g.target / 1_000_000_000), 0) / mappedGoals.length * 100 / 1_000_000_000
        : 0;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="min-h-screen bg-gray-900 text-white flex"
        >
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">Your Goals</h1>
                        <p className="text-gray-400 text-lg">Turn dreams into achievements</p>
                    </div>

                    <Dialog open={showCreateTemplateModal} onOpenChange={setShowCreateTemplateModal}>
                        <DialogTrigger asChild>
                            <Button className="bg-indigo-500 hover:bg-indigo-600 w-12 h-12 rounded-full p-0">
                                <Plus size={24} />
                            </Button>
                        </DialogTrigger>

                        <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-md">
                            <DialogHeader>
                                <DialogTitle className="text-xl font-semibold">Create New Goal</DialogTitle>
                            </DialogHeader>

                            <h3 className="text-lg font-semibold mb-4">Choose a Goal Template</h3>
                            <div className="space-y-3">
                                {goalTemplates.map((template, idx) => {
                                    const Icon = template.icon;
                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => handleTemplateSelect(template)}
                                            className="w-full bg-gray-700 hover:bg-gray-600 flex items-center p-4 rounded-xl border border-gray-600 transition-colors"
                                        >
                                            <div
                                                className="w-12 h-12 rounded-xl flex items-center justify-center mr-4"
                                                style={{ background: `linear-gradient(135deg, ${template.color[0]}, ${template.color[1]})` }}
                                            >
                                                <Icon size={24} color="#FFFFFF" />
                                            </div>
                                            <div className="flex-1 text-left">
                                                <h4 className="font-semibold">{template.title}</h4>
                                                <p className="text-gray-400 text-sm">
                                                    Suggested: {template.amount.toLocaleString()} SOL
                                                </p>
                                            </div>
                                            <div className="text-indigo-500 text-xl">→</div>
                                        </button>
                                    );
                                })}
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="mb-8">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl p-8 text-white">
                        <p className="text-white/80 text-lg mb-2">Total Saved Towards Goals</p>
                        <h2 className="text-5xl font-bold mb-8">{totalSavedInSOL.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })} SOL</h2>
                        <div className="grid grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="text-2xl font-bold">{mappedGoals.length}</div>
                                <div className="text-white/80 text-sm">Active Goals</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold">{avgProgress.toFixed(0)}%</div>
                                <div className="text-white/80 text-sm">Avg Progress</div>
                            </div>
                        </div>
                    </div>
                </div>

                {accounts.isLoading ? (
                    <p className="text-center text-gray-400">Loading goals…</p>
                ) : (
                    <>
                        <h2 className="text-2xl font-semibold mb-6">Active Goals</h2>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
                            {mappedGoals.map((goal) => (
                                <GoalCard key={goal.pda} goal={goal} />
                            ))}
                        </div>
                    </>
                )}

                <Dialog open={showCreateGoalModal} onOpenChange={setShowCreateGoalModal}>
                    <DialogContent className="bg-gray-800 border-gray-700 text-white">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-semibold">Goal Details</DialogTitle>
                        </DialogHeader>

                        <h3 className="text-lg font-semibold mb-4">Fill Goal Info</h3>

                        <Label htmlFor="title" className="text-white mb-2 block">Title</Label>
                        <Input
                            id="title"
                            value={draftTitle}
                            onChange={(e) => setDraftTitle(e.target.value)}
                            placeholder="Goal title"
                            className="bg-gray-700 border-gray-600 text-white"
                        />

                        <Label htmlFor="target" className="text-white mb-2 block mt-4">Target Amount ($)</Label>
                        <Input
                            id="target"
                            type="number"
                            value={draftTarget}
                            onChange={(e) => setDraftTarget(e.target.value)}
                            placeholder="e.g. 5"
                            className="bg-gray-700 border-gray-600 text-white"
                        />

                        <div className="flex justify-end space-x-3 pt-4">
                            <Button
                                variant="outline"
                                onClick={() => setShowCreateGoalModal(false)}
                                className="border-gray-600 text-gray-400 hover:bg-gray-700"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSaveGoal}
                                className="bg-indigo-500 hover:bg-indigo-600"
                                disabled={!draftTitle || !draftTarget}
                            >
                                Save Goal
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </motion.div>
    );
}
