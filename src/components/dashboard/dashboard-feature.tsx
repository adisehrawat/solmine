import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const DashboardFeatures = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="min-h-screen bg-gray-900"
        >
            <div className="min-h-screen bg-gray-900 ">
                <HeroSection />
                <FeaturesSection />
                <HowItWorksSection />
                <CTASection />
                <Footer />
            </div>
        </motion.div>
    );
};

export default DashboardFeatures;