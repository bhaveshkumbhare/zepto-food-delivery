import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import LoginForm from './components/LoginForm';
import SocialLogin from './components/SocialLogin';
import TrustSignals from './components/TrustSignals';
import RegistrationPrompt from './components/RegistrationPrompt';
import Icon from '../../components/AppIcon';

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      navigate('/restaurant-menu');
    }

    // Set page title
    document.title = 'Sign In - ZeptoFood | Food Delivery';
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-8">
          <div className="w-full max-w-md">
            {/* Header Section */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-soft">
                  <Icon name="Utensils" size={32} color="white" />
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Welcome Back
              </h1>
              <p className="text-muted-foreground text-base leading-relaxed">
                Sign in to your account to continue ordering delicious meals from your favorite restaurants
              </p>
            </div>

            {/* Login Form */}
            <div className="bg-card border border-border rounded-xl shadow-soft p-6 mb-6">
              <LoginForm />
            </div>

            {/* Social Login */}
            <div className="bg-card border border-border rounded-xl shadow-soft p-6 mb-6">
              <SocialLogin />
            </div>

            {/* Trust Signals */}
            <TrustSignals />

            {/* Registration Prompt */}
            <RegistrationPrompt />

            {/* Demo Credentials Notice */}
            <div className="mt-6 p-4 bg-warning/10 border border-warning/20 rounded-lg">
              <div className="flex items-start space-x-3">
                <Icon 
                  name="Info" 
                  size={16} 
                  className="text-warning flex-shrink-0 mt-0.5" 
                />
                <div>
                  <p className="text-sm text-foreground font-medium mb-1">
                    Demo Credentials
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                    Use these credentials to test the login functionality:
                  </p>
                  <div className="text-xs font-mono bg-muted/50 p-2 rounded border">
                    <div>Email: john.doe@example.com</div>
                    <div>Password: password123</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-card border-t border-border py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date()?.getFullYear()} ZeptoFood. All rights reserved.
            </p>
            <div className="flex items-center justify-center space-x-6 mt-2">
              <button className="text-xs text-muted-foreground hover:text-primary transition-smooth">
                Privacy Policy
              </button>
              <button className="text-xs text-muted-foreground hover:text-primary transition-smooth">
                Terms of Service
              </button>
              <button className="text-xs text-muted-foreground hover:text-primary transition-smooth">
                Support
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;