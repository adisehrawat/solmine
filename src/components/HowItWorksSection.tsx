
import React from "react";
import { Wallet, Star, Shield } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Wallet,
    title: "Connect Your Wallet",
    description: "Link your Solana wallet to get started. We support Phantom, Solflare, and other popular wallets.",
    color: "from-purple-500 to-indigo-500"
  },
  {
    number: "02",
    icon: Star,
    title: "Set Your Goals",
    description: "Create financial goals using our templates or customize your own. Set targets, deadlines, and milestones.",
    color: "from-indigo-500 to-blue-500"
  },
  {
    number: "03",
    icon: Shield,
    title: "Save & Earn",
    description: "Deposit crypto towards your goals and earn rewards. Track progress with real-time blockchain transparency.",
    color: "from-blue-500 to-cyan-500"
  }
];

const HowItWorksSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            How It Works
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Get started in three simple steps and begin your journey to financial success
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <div key={index} className="text-center relative">
                {/* Connection line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-to-r from-gray-700 to-gray-600 z-0"></div>
                )}
                
                <div className="relative z-10">
                  {/* Step number */}
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-800 border-2 border-gray-600 rounded-full text-gray-400 font-bold text-lg mb-6">
                    {step.number}
                  </div>
                  
                  {/* Icon */}
                  <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center mb-6 shadow-2xl`}>
                    <step.icon size={40} color="white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                  <p className="text-gray-400 leading-relaxed max-w-sm mx-auto">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
