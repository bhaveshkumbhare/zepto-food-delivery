import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';


const SocialLogin = () => {
  const navigate = useNavigate();
  const [loadingProvider, setLoadingProvider] = useState(null);

  const handleSocialLogin = async (provider) => {
    setLoadingProvider(provider);

    // Simulate social login API call
    setTimeout(() => {
      // Mock successful social login
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify({
        email: `user@${provider}.com`,
        name: `${provider} User`,
        provider: provider,
        loginTime: new Date()?.toISOString()
      }));
      
      navigate('/restaurant-menu');
      setLoadingProvider(null);
    }, 2000);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-card text-muted-foreground font-medium">
            Or continue with
          </span>
        </div>
      </div>

      {/* Google Login */}
      <Button
        variant="outline"
        size="lg"
        fullWidth
        loading={loadingProvider === 'google'}
        onClick={() => handleSocialLogin('google')}
        className="border-border hover:bg-muted transition-smooth"
      >
        <div className="flex items-center justify-center space-x-3">
          <div className="w-5 h-5 bg-white rounded flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" className="text-gray-700">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          </div>
          <span className="font-medium text-foreground">
            {loadingProvider === 'google' ? 'Connecting...' : 'Continue with Google'}
          </span>
        </div>
      </Button>

      {/* Facebook Login */}
      <Button
        variant="outline"
        size="lg"
        fullWidth
        loading={loadingProvider === 'facebook'}
        onClick={() => handleSocialLogin('facebook')}
        className="border-border hover:bg-muted transition-smooth"
      >
        <div className="flex items-center justify-center space-x-3">
          <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 24 24" className="text-white">
              <path fill="currentColor" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </div>
          <span className="font-medium text-foreground">
            {loadingProvider === 'facebook' ? 'Connecting...' : 'Continue with Facebook'}
          </span>
        </div>
      </Button>
    </div>
  );
};

export default SocialLogin;