import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyCart = () => {
  const navigate = useNavigate();

  const handleBrowseRestaurants = () => {
    navigate('/restaurant-menu');
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-32 h-32 bg-muted/30 rounded-full flex items-center justify-center mb-6">
        <Icon name="ShoppingCart" size={48} className="text-muted-foreground" />
      </div>
      <h2 className="font-heading font-bold text-2xl text-foreground mb-3 text-center">
        Your cart is empty
      </h2>
      <p className="font-body text-muted-foreground text-center mb-8 max-w-md">
        Looks like you haven't added any delicious items to your cart yet. 
        Browse our restaurants and discover amazing food!
      </p>
      <Button
        variant="default"
        size="lg"
        onClick={handleBrowseRestaurants}
        iconName="Search"
        iconPosition="left"
        className="font-heading font-semibold"
      >
        Browse Restaurants
      </Button>
      {/* Popular Categories */}
      <div className="mt-12 w-full max-w-md">
        <h3 className="font-heading font-semibold text-foreground text-center mb-4">
          Popular Categories
        </h3>
        
        <div className="grid grid-cols-2 gap-3">
          {[
            { name: 'Pizza', icon: 'Pizza' },
            { name: 'Burgers', icon: 'Beef' },
            { name: 'Asian', icon: 'Utensils' },
            { name: 'Desserts', icon: 'Cookie' }
          ]?.map((category, index) => (
            <button
              key={index}
              onClick={handleBrowseRestaurants}
              className="flex items-center space-x-3 p-4 bg-card border border-border rounded-lg hover:shadow-soft transition-smooth"
            >
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={category?.icon} size={18} className="text-primary" />
              </div>
              <span className="font-body font-medium text-foreground">
                {category?.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;