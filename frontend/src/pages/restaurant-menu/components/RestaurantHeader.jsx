import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RestaurantHeader = ({ restaurant, onFavoriteToggle, onShare }) => {
  const [isFavorite, setIsFavorite] = useState(restaurant?.isFavorite);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    onFavoriteToggle(restaurant?.id, !isFavorite);
  };

  const handleShareClick = () => {
    onShare(restaurant);
  };

  return (
    <div className="relative bg-card rounded-lg overflow-hidden shadow-soft mb-6">
      {/* Cover Image */}
      <div className="relative h-48 md:h-64 overflow-hidden">
        <Image
          src={restaurant?.coverImage}
          alt={`${restaurant?.name} restaurant`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handleFavoriteClick}
            className="bg-white/90 backdrop-blur-sm border-white/20 hover:bg-white"
          >
            <Icon 
              name={isFavorite ? "Heart" : "Heart"} 
              size={20} 
              color={isFavorite ? "#E74C3C" : "currentColor"}
              className={isFavorite ? "fill-current" : ""}
            />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleShareClick}
            className="bg-white/90 backdrop-blur-sm border-white/20 hover:bg-white"
          >
            <Icon name="Share2" size={20} />
          </Button>
        </div>

        {/* Restaurant Status */}
        <div className="absolute bottom-4 left-4">
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            restaurant?.isOpen 
              ? 'bg-success text-success-foreground' 
              : 'bg-destructive text-destructive-foreground'
          }`}>
            {restaurant?.isOpen ? 'Open Now' : 'Closed'}
          </div>
        </div>
      </div>
      {/* Restaurant Info */}
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2">
              {restaurant?.name}
            </h1>
            <p className="text-muted-foreground font-body mb-3">
              {restaurant?.cuisine} • {restaurant?.location}
            </p>
            
            {/* Rating and Reviews */}
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={16} color="#F39C12" className="fill-current" />
                <span className="font-body font-semibold text-foreground">
                  {restaurant?.rating}
                </span>
                <span className="text-muted-foreground font-body">
                  ({restaurant?.reviewCount} reviews)
                </span>
              </div>
              <div className="flex items-center space-x-1 text-muted-foreground">
                <Icon name="Clock" size={16} />
                <span className="font-body">{restaurant?.deliveryTime}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {restaurant?.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-muted text-muted-foreground text-sm font-body rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Delivery Info */}
          <div className="bg-muted rounded-lg p-4 md:w-64">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground font-body">Delivery Fee:</span>
                <span className="font-body font-semibold text-foreground">
                  {restaurant?.deliveryFee === 0 ? 'Free' : `$${restaurant?.deliveryFee?.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground font-body">Minimum Order:</span>
                <span className="font-body font-semibold text-foreground">
                  ${restaurant?.minimumOrder?.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground font-body">Estimated Time:</span>
                <span className="font-body font-semibold text-foreground">
                  {restaurant?.deliveryTime}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantHeader;