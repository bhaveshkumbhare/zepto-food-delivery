import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const RegistrationPrompt = () => {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate('/register');
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <div className="text-center p-6 bg-card border border-border rounded-lg shadow-soft">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          New to ZeptoFood?
        </h3>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          Join thousands of food lovers and discover amazing restaurants in your area. Get exclusive deals and faster checkout!
        </p>
        
        <Button
          variant="outline"
          size="lg"
          fullWidth
          onClick={handleSignUpClick}
          iconName="UserPlus"
          iconPosition="left"
          className="mb-4"
        >
          Create Account
        </Button>

        <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <span className="w-2 h-2 bg-success rounded-full"></span>
            <span>Free to join</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-2 h-2 bg-primary rounded-full"></span>
            <span>Instant access</span>
          </div>
        </div>
      </div>

      {/* Alternative Text Link */}
      <div className="text-center mt-4">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{' '}
          <button
            onClick={handleSignUpClick}
            className="text-primary hover:text-primary/80 font-medium transition-smooth underline underline-offset-2"
          >
            Sign up here
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegistrationPrompt;