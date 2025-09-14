import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import RegistrationForm from './components/RegistrationForm';
import SocialRegistration from './components/SocialRegistration';
import AddressSection from './components/AddressSection';
import TrustSignals from './components/TrustSignals';

const Register = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showAddressSection, setShowAddressSection] = useState(false);

  const steps = [
    { number: 1, title: 'Account Details', icon: 'User' },
    { number: 2, title: 'Delivery Address', icon: 'MapPin' },
    { number: 3, title: 'Complete Setup', icon: 'CheckCircle' }
  ];

  const handleStepComplete = (step) => {
    if (step === 1) {
      setShowAddressSection(true);
      setCurrentStep(2);
    } else if (step === 2) {
      setCurrentStep(3);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                  <Icon name="Utensils" size={24} color="white" />
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
                  Join ZeptoFood
                </h1>
              </div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Create your account and discover amazing food from local restaurants. 
                Fast delivery, great prices, and thousands of dining options await!
              </p>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              {steps?.map((step, index) => (
                <React.Fragment key={step?.number}>
                  <div className="flex items-center space-x-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-smooth ${
                      currentStep >= step?.number
                        ? 'bg-primary text-white' :'bg-muted text-muted-foreground'
                    }`}>
                      {currentStep > step?.number ? (
                        <Icon name="Check" size={16} />
                      ) : (
                        <Icon name={step?.icon} size={16} />
                      )}
                    </div>
                    <div className="hidden sm:block">
                      <div className={`text-sm font-medium ${
                        currentStep >= step?.number ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {step?.title}
                      </div>
                    </div>
                  </div>
                  {index < steps?.length - 1 && (
                    <div className={`w-8 h-0.5 transition-smooth ${
                      currentStep > step?.number ? 'bg-primary' : 'bg-muted'
                    }`}></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Registration Form Section */}
              <div className="order-2 lg:order-1">
                <div className="max-w-md mx-auto lg:mx-0">
                  {currentStep === 1 && (
                    <div className="space-y-8">
                      <div className="text-center lg:text-left">
                        <h2 className="text-2xl font-bold text-foreground mb-2">
                          Create Your Account
                        </h2>
                        <p className="text-muted-foreground">
                          Choose your preferred registration method
                        </p>
                      </div>

                      {/* Social Registration */}
                      <SocialRegistration />

                      {/* Registration Form */}
                      <RegistrationForm />
                    </div>
                  )}

                  {currentStep === 2 && showAddressSection && (
                    <div className="space-y-8">
                      <AddressSection />
                      
                      <div className="flex space-x-4">
                        <button
                          onClick={() => {
                            setCurrentStep(1);
                            setShowAddressSection(false);
                          }}
                          className="flex-1 px-4 py-2 border border-border rounded-lg text-foreground hover:bg-muted transition-smooth"
                        >
                          Back
                        </button>
                        <button
                          onClick={() => handleStepComplete(2)}
                          className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-smooth"
                        >
                          Continue
                        </button>
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="text-center space-y-6">
                      <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto">
                        <Icon name="CheckCircle" size={40} className="text-success" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-foreground mb-2">
                          Welcome to ZeptoFood!
                        </h2>
                        <p className="text-muted-foreground mb-6">
                          Your account has been created successfully. You can now start exploring 
                          restaurants and placing orders.
                        </p>
                        <button
                          onClick={() => navigate('/restaurant-menu')}
                          className="w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-smooth font-medium"
                        >
                          Start Ordering Food
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Trust Signals Section */}
              <div className="order-1 lg:order-2">
                <div className="sticky top-24">
                  <TrustSignals />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-muted/30 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Why Choose ZeptoFood?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join thousands of satisfied customers who trust us for their daily food needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: 'Zap',
                  title: 'Lightning Fast Delivery',
                  description: 'Average delivery time of just 15 minutes to your doorstep'
                },
                {
                  icon: 'Star',
                  title: 'Premium Quality',
                  description: 'Carefully curated restaurants with verified quality standards'
                },
                {
                  icon: 'Shield',
                  title: 'Safe & Secure',
                  description: 'Your data and payments are protected with bank-level security'
                },
                {
                  icon: 'Headphones',
                  title: '24/7 Support',
                  description: 'Round-the-clock customer support for any questions or issues'
                },
                {
                  icon: 'Percent',
                  title: 'Great Deals',
                  description: 'Exclusive discounts and offers for registered members'
                },
                {
                  icon: 'MapPin',
                  title: 'Wide Coverage',
                  description: 'Serving 50+ cities with thousands of restaurant partners'
                }
              ]?.map((feature, index) => (
                <div key={index} className="bg-card rounded-lg p-6 shadow-soft">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon name={feature?.icon} size={24} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature?.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature?.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-secondary text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Utensils" size={20} color="white" />
              </div>
              <span className="text-xl font-bold">ZeptoFood</span>
            </div>
            <p className="text-gray-300 mb-4">
              Connecting you with the best local restaurants since 2020
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-400">
              <button className="hover:text-white transition-smooth">Privacy Policy</button>
              <button className="hover:text-white transition-smooth">Terms of Service</button>
              <button className="hover:text-white transition-smooth">Contact Us</button>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-600 text-sm text-gray-400">
              © {new Date()?.getFullYear()} ZeptoFood. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Register;