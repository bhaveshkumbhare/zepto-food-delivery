import React, { useState, useContext, createContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const CartContext = createContext({
  items: [],
  itemCount: 0,
  total: 0,
});

const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
});

const OrderContext = createContext({
  activeOrders: [],
  hasActiveOrders: false,
});

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock context data - in real app these would come from actual context providers
  const cartData = {
    items: [
      { id: 1, name: 'Margherita Pizza', price: 12.99, quantity: 2 },
      { id: 2, name: 'Caesar Salad', price: 8.99, quantity: 1 }
    ],
    itemCount: 3,
    total: 34.97
  };

  const authData = {
    isAuthenticated: location?.pathname !== '/login' && location?.pathname !== '/register',
    user: { name: 'John Doe', email: 'john@example.com' }
  };

  const orderData = {
    activeOrders: [
      { id: 'ORD-001', status: 'preparing', restaurant: 'Pizza Palace' }
    ],
    hasActiveOrders: true
  };

  const navigationItems = [
    {
      label: 'Browse Restaurants',
      path: '/restaurant-menu',
      icon: 'Store',
      isActive: location?.pathname === '/restaurant-menu'
    },
    {
      label: 'Track Orders',
      path: '/order-tracking',
      icon: 'MapPin',
      isActive: location?.pathname === '/order-tracking',
      showBadge: orderData?.hasActiveOrders
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleCartClick = () => {
    navigate('/shopping-cart');
    setIsMobileMenuOpen(false);
  };

  const handleAuthClick = () => {
    if (authData?.isAuthenticated) {
       navigate("/user-accounts")
    } else {
      navigate('/login');
    }
    setIsMobileMenuOpen(false);
  };

  const handleSearch = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      // In real app, this would trigger search functionality
      console.log('Searching for:', searchQuery);
      navigate('/restaurant-menu', { state: { searchQuery } });
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen) {
      setSearchQuery('');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-card border-b border-border z-1000">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <button
              onClick={() => handleNavigation('/restaurant-menu')}
              className="flex items-center space-x-2 transition-smooth hover:opacity-80"
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Utensils" size={20} color="white" />
              </div>
              <span className="font-heading font-bold text-xl text-foreground">
                ZeptoFood
              </span>
            </button>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="w-full relative">
              <div className="relative">
                <Icon 
                  name="Search" 
                  size={20} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
                />
                <input
                  type="text"
                  placeholder="Search restaurants, cuisines..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth"
                />
              </div>
            </form>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-body font-medium transition-smooth relative ${
                  item?.isActive
                    ? 'text-primary bg-primary/10' :'text-foreground hover:text-primary hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.label}</span>
                {item?.showBadge && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full"></div>
                )}
              </button>
            ))}

            {/* Cart Button */}
            <button
              onClick={handleCartClick}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg font-body font-medium text-foreground hover:text-primary hover:bg-muted transition-smooth relative"
            >
              <Icon name="ShoppingCart" size={18} />
              <span className="hidden lg:inline">Cart</span>
              {cartData?.itemCount > 0 && (
                <div className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce-gentle">
                  {cartData?.itemCount}
                </div>
              )}
            </button>

            {/* Auth Button */}
            <Button
              variant={authData?.isAuthenticated ? "outline" : "default"}
              onClick={handleAuthClick}
              iconName={authData?.isAuthenticated ? "User" : "LogIn"}
              iconPosition="left"
              className="font-body font-medium"
            >
              {authData?.isAuthenticated ? 'Accounts' : 'Login'}
            </Button>
          </nav>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Search Toggle */}
            <button
              onClick={toggleSearch}
              className="p-2 rounded-lg text-foreground hover:text-primary hover:bg-muted transition-smooth"
            >
              <Icon name="Search" size={20} />
            </button>

            {/* Mobile Cart */}
            <button
              onClick={handleCartClick}
              className="p-2 rounded-lg text-foreground hover:text-primary hover:bg-muted transition-smooth relative"
            >
              <Icon name="ShoppingCart" size={20} />
              {cartData?.itemCount > 0 && (
                <div className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartData?.itemCount}
                </div>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg text-foreground hover:text-primary hover:bg-muted transition-smooth"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="md:hidden py-3 border-t border-border">
            <form onSubmit={handleSearch} className="relative">
              <Icon 
                name="Search" 
                size={20} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
              />
              <input
                type="text"
                placeholder="Search restaurants, cuisines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth"
                autoFocus
              />
            </form>
          </div>
        )}
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card border-t border-border shadow-soft">
          <div className="px-4 py-3 space-y-2">
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg font-body font-medium transition-smooth relative ${
                  item?.isActive
                    ? 'text-primary bg-primary/10' :'text-foreground hover:text-primary hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={20} />
                <span>{item?.label}</span>
                {item?.showBadge && (
                  <div className="absolute right-3 w-2 h-2 bg-accent rounded-full"></div>
                )}
              </button>
            ))}

            <div className="border-t border-border pt-2 mt-2">
              <button
                onClick={handleAuthClick}
                className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg font-body font-medium text-foreground hover:text-primary hover:bg-muted transition-smooth"
              >
                <Icon name={authData?.isAuthenticated ? "User" : "LogIn"} size={20} />
                <span>{authData?.isAuthenticated ? 'Account' : 'Login'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Order Status Notification */}
      {orderData?.hasActiveOrders && (
        <div className="fixed top-16 right-4 bg-success text-success-foreground px-4 py-2 rounded-lg shadow-elevated z-1100 transition-smooth">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} />
            <span className="font-caption text-sm">Order preparing - 15 min</span>
            <button
              onClick={() => handleNavigation('/order-tracking')}
              className="ml-2 text-success-foreground hover:opacity-80 transition-smooth"
            >
              <Icon name="ExternalLink" size={14} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;