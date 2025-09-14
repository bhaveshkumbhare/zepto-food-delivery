import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustBadges = [
    {
      id: 1,
      icon: 'Shield',
      title: 'SSL Secured',
      description: '256-bit encryption'
    },
    {
      id: 2,
      icon: 'CreditCard',
      title: 'Secure Payments',
      description: 'PCI DSS compliant'
    },
    {
      id: 3,
      icon: 'CheckCircle',
      title: 'Verified Platform',
      description: 'Trusted by 50K+ users'
    }
  ];

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <div className="grid grid-cols-3 gap-4">
        {trustBadges?.map((badge) => (
          <div
            key={badge?.id}
            className="flex flex-col items-center text-center p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-smooth"
          >
            <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center mb-2">
              <Icon 
                name={badge?.icon} 
                size={16} 
                className="text-success" 
              />
            </div>
            <h4 className="text-xs font-semibold text-foreground mb-1">
              {badge?.title}
            </h4>
            <p className="text-xs text-muted-foreground leading-tight">
              {badge?.description}
            </p>
          </div>
        ))}
      </div>
      {/* Additional Security Notice */}
      <div className="mt-6 p-4 bg-primary/5 border border-primary/10 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon 
            name="Lock" 
            size={16} 
            className="text-primary flex-shrink-0 mt-0.5" 
          />
          <div>
            <p className="text-sm text-foreground font-medium mb-1">
              Your data is protected
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              We use industry-standard security measures to protect your personal information and payment details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;