import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { Link } from 'react-router-dom';

const CTASection = () => {
    return (
        <section className="py-20 bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900">
            <div className="container mx-auto px-4 text-center">
                <div className="max-w-4xl mx-auto">
                    <div className="inline-flex items-center px-4 py-2 bg-white/10 rounded-full border border-white/20 mb-8">
                        <Star className="w-4 h-4 text-yellow-400 mr-2" />
                        <span className="text-white text-sm font-medium">Join thousands of successful savers</span>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                        Ready to Transform Your
                        <br />
                        <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                            Financial Future?
                        </span>
                    </h2>

                    <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
                        Start your journey today with the most secure and rewarding way to save for your goals.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/goal">
                            <Button className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300">
                                Get Started Now
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;