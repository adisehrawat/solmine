
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-purple-500/20 rounded-full border border-purple-500/30 mb-8">
            <Shield className="w-4 h-4 text-purple-400 mr-2" />
            <span className="text-purple-300 text-sm font-medium">Powered by Solana Blockchain</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Achieve Your
            <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent"> Financial Goals</span>
            <br />
            with Blockchain
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Secure, transparent, and decentralized goal tracking on Solana. 
            Turn your dreams into achievements with the power of Web3.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300">
              Start Your Journey
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute top-1/4 left-10 w-8 h-8 bg-purple-500/30 rounded-full animate-bounce"></div>
      <div className="absolute bottom-1/4 right-10 w-6 h-6 bg-indigo-500/30 rounded-full animate-bounce delay-300"></div>
      <div className="absolute top-3/4 left-1/4 w-4 h-4 bg-blue-500/30 rounded-full animate-bounce delay-700"></div>
    </section>
  );
};

export default HeroSection;
