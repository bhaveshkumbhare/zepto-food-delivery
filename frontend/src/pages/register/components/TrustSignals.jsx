import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TrustSignals = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "ZeptoFood has been a game-changer for my busy schedule. Fast delivery and amazing food quality!",
      location: "San Francisco, CA"
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "Love the variety of restaurants available. The app is super easy to use and delivery is always on time.",
      location: "New York, NY"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "Best food delivery service I\'ve used. Great customer support and reliable service every time.",
      location: "Los Angeles, CA"
    }
  ];

  const verificationBadges = [
    {
      icon: "Shield",
      title: "SSL Secured",
      description: "Your data is protected with 256-bit encryption"
    },
    {
      icon: "CheckCircle",
      title: "Verified Restaurants",
      description: "All partner restaurants are verified and licensed"
    },
    {
      icon: "Star",
      title: "5-Star Service",
      description: "Rated #1 food delivery app by customers"
    },
    {
      icon: "Clock",
      title: "30-Min Guarantee",
      description: "Fast delivery or your money back"
    }
  ];

  const stats = [
    { number: "50,000+", label: "Happy Customers" },
    { number: "1,200+", label: "Partner Restaurants" },
    { number: "15 min", label: "Average Delivery" },
    { number: "4.9/5", label: "Customer Rating" }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={14}
        className={index < rating ? "text-yellow-400 fill-current" : "text-gray-300"}
      />
    ));
  };

  return (
    <div className="w-full space-y-8">
      {/* Stats Section */}
      <div className="bg-card rounded-lg p-6 shadow-soft">
        <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
          Trusted by Thousands
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats?.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">
                {stat?.number}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat?.label}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Verification Badges */}
      <div className="bg-card rounded-lg p-6 shadow-soft">
        <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
          Your Security Matters
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {verificationBadges?.map((badge, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={badge?.icon} size={20} className="text-primary" />
              </div>
              <div>
                <div className="font-medium text-foreground mb-1">
                  {badge?.title}
                </div>
                <div className="text-sm text-muted-foreground">
                  {badge?.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Customer Testimonials */}
      <div className="bg-card rounded-lg p-6 shadow-soft">
        <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
          What Our Customers Say
        </h3>
        <div className="space-y-4">
          {testimonials?.slice(0, 2)?.map((testimonial) => (
            <div key={testimonial?.id} className="border border-border rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <Image
                    src={testimonial?.avatar}
                    alt={testimonial?.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-medium text-foreground">
                      {testimonial?.name}
                    </span>
                    <div className="flex items-center space-x-1">
                      {renderStars(testimonial?.rating)}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    "{testimonial?.text}"
                  </p>
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Icon name="MapPin" size={12} />
                    <span>{testimonial?.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Payment Security */}
      <div className="bg-card rounded-lg p-6 shadow-soft">
        <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
          Secure Payment Options
        </h3>
        <div className="flex items-center justify-center space-x-6 opacity-70">
          <div className="flex items-center space-x-2">
            <Icon name="CreditCard" size={24} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Credit Cards</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Smartphone" size={24} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Digital Wallets</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={24} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Bank Transfer</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;