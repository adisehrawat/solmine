import { Shield, Star, Wallet, Link } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Blockchain Security",
    description: "Your goals and funds are secured by Solana's robust blockchain technology, ensuring transparency and immutability.",
    gradient: "from-purple-500 to-indigo-500"
  },
  {
    icon: Wallet,
    title: "Crypto Integration",
    description: "Seamlessly save in SOL, USDC, or other SPL tokens. Your crypto works as hard as you do towards your goals.",
    gradient: "from-indigo-500 to-blue-500"
  },
  {
    icon: Star,
    title: "Smart Rewards",
    description: "Earn rewards for hitting milestones and staying on track. Gamify your savings journey with blockchain incentives.",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: Link,
    title: "DeFi Integration",
    description: "Connect with DeFi protocols to earn yield on your savings while working towards your goals.",
    gradient: "from-cyan-500 to-teal-500"
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Why Choose Our Platform?
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Experience the future of financial goal setting with blockchain technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:transform hover:scale-105 group"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon size={32} color="white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;