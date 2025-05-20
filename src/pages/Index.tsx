
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useUser } from "../App";

const Index = () => {
  const { user } = useUser();
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="bg-white shadow-sm p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-fashion-deep-purple">StyleSync AI</h1>
          <div className="space-x-4">
            {user ? (
              <Link to="/dashboard">
                <Button variant="outline">Dashboard</Button>
              </Link>
            ) : (
              <Link to="/auth">
                <Button>Login / Sign Up</Button>
              </Link>
            )}
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="flex-1 bg-gradient-to-b from-white to-fashion-light-gray">
        <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-fashion-dark-gray">
              Your Personal AI Stylist
            </h2>
            <p className="text-lg mb-8 text-gray-600">
              Get personalized outfit recommendations based on your skin tone, 
              style preferences, and existing wardrobe. Let our AI be your fashion bestie!
            </p>
            <div className="space-x-4">
              <Link to="/auth">
                <Button className="bg-fashion-purple hover:bg-fashion-deep-purple text-lg px-6 py-3">
                  Get Started
                </Button>
              </Link>
              <Button variant="outline" className="text-lg px-6 py-3">
                Learn More
              </Button>
            </div>
          </div>
          
          <div className="md:w-1/2 mt-10 md:mt-0 animate-slide-in flex justify-center">
            <div className="relative w-80 h-96 bg-fashion-purple rounded-lg overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-fashion-deep-purple opacity-70"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <p className="text-lg font-semibold">What to wear tonight?</p>
                <p className="opacity-80 mb-2">Try this outfit based on your wardrobe</p>
                <div className="bg-white bg-opacity-20 p-4 rounded-lg backdrop-blur-sm">
                  <p className="font-medium">Navy blazer + white tee + dark jeans</p>
                  <p className="text-sm opacity-80">Perfect for your skin tone and tonight's weather!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="fashion-card p-6 text-center">
              <div className="w-16 h-16 bg-fashion-purple rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Create Your Profile</h3>
              <p className="text-gray-600">Take a quick style quiz to let our AI know your skin tone, preferences and more.</p>
            </div>
            
            <div className="fashion-card p-6 text-center">
              <div className="w-16 h-16 bg-fashion-purple rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Upload Your Wardrobe</h3>
              <p className="text-gray-600">Add photos of your favorite clothing items so our AI can work with what you have.</p>
            </div>
            
            <div className="fashion-card p-6 text-center">
              <div className="w-16 h-16 bg-fashion-purple rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Recommendations</h3>
              <p className="text-gray-600">Just ask, and our AI will suggest the perfect outfit for any occasion.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-fashion-dark-gray text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="mb-4 md:mb-0">© 2025 StyleSync AI. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-fashion-purple transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-fashion-purple transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-fashion-purple transition-colors">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
