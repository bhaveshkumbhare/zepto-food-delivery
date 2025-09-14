import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import RestaurantHeader from './components/RestaurantHeader';
import CategoryNavigation from './components/CategoryNavigation';
import MenuFilters from './components/MenuFilters';
import MenuSection from './components/MenuSection';
import CartSummary from './components/CartSummary';
import CustomizationModal from './components/CustomizationModal';
import Icon from '../../components/AppIcon';


const RestaurantMenu = () => {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState('appetizers');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [customizationModal, setCustomizationModal] = useState({ isOpen: false, item: null });
  const [cart, setCart] = useState({
    items: [],
    itemCount: 0,
    subtotal: 0,
    total: 0
  });
  const [filters, setFilters] = useState({
    dietary: [],
    sort: 'popular'
  });

  // Mock restaurant data
  const restaurant = {
    id: 'rest-001',
    name: 'Bella Vista Italian Kitchen',
    cuisine: 'Italian',
    location: 'Downtown District',
    rating: 4.6,
    reviewCount: 1247,
    deliveryTime: '25-35 min',
    deliveryFee: 2.99,
    minimumOrder: 15.00,
    isOpen: true,
    isFavorite: false,
    coverImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=400&fit=crop',
    tags: ['Fast Delivery', 'Highly Rated', 'Family Friendly']
  };

  // Mock menu categories
  const categories = [
    { id: 'appetizers', name: 'Appetizers', itemCount: 8, description: 'Start your meal right' },
    { id: 'salads', name: 'Salads', itemCount: 6, description: 'Fresh and healthy options' },
    { id: 'pasta', name: 'Pasta', itemCount: 12, description: 'Authentic Italian pasta dishes' },
    { id: 'pizza', name: 'Pizza', itemCount: 10, description: 'Wood-fired artisan pizzas' },
    { id: 'mains', name: 'Main Courses', itemCount: 15, description: 'Hearty and satisfying meals' },
    { id: 'desserts', name: 'Desserts', itemCount: 7, description: 'Sweet endings to your meal' },
    { id: 'beverages', name: 'Beverages', itemCount: 12, description: 'Drinks and refreshments' }
  ];

  // Mock menu items
  const menuItems = {
    appetizers: [
      {
        id: 'app-001',
        name: 'Bruschetta Trio',
        description: 'Three varieties of our signature bruschetta with fresh tomatoes, basil, and mozzarella',
        price: 12.99,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&h=300&fit=crop',
        rating: 4.8,
        prepTime: '10-15 min',
        isPopular: true,
        discount: null,
        dietaryInfo: ['vegetarian'],
        hasCustomizations: false
      },
      {
        id: 'app-002',
        name: 'Calamari Fritti',
        description: 'Crispy fried squid rings served with marinara sauce and lemon wedges',
        price: 14.99,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop',
        rating: 4.5,
        prepTime: '12-18 min',
        isPopular: false,
        discount: null,
        dietaryInfo: [],
        hasCustomizations: true,
        customizationGroups: [
          {
            id: 'sauce',
            name: 'Dipping Sauce',
            required: false,
            minSelections: 0,
            maxSelections: 2,
            options: [
              { id: 'marinara', name: 'Marinara', price: 0, description: 'Classic tomato sauce' },
              { id: 'aioli', name: 'Garlic Aioli', price: 1.50, description: 'Creamy garlic sauce' },
              { id: 'spicy', name: 'Spicy Arrabbiata', price: 1.00, description: 'Hot and spicy' }
            ]
          }
        ]
      }
    ],
    salads: [
      {
        id: 'sal-001',
        name: 'Caesar Salad',
        description: 'Crisp romaine lettuce with parmesan cheese, croutons, and our house Caesar dressing',
        price: 11.99,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop',
        rating: 4.7,
        prepTime: '8-12 min',
        isPopular: true,
        discount: null,
        dietaryInfo: ['vegetarian'],
        hasCustomizations: true,
        customizationGroups: [
          {
            id: 'protein',
            name: 'Add Protein',
            required: false,
            minSelections: 0,
            maxSelections: 1,
            options: [
              { id: 'chicken', name: 'Grilled Chicken', price: 4.99, description: 'Seasoned and grilled' },
              { id: 'shrimp', name: 'Grilled Shrimp', price: 6.99, description: 'Fresh gulf shrimp' },
              { id: 'salmon', name: 'Grilled Salmon', price: 8.99, description: 'Atlantic salmon fillet' }
            ]
          }
        ]
      }
    ],
    pasta: [
      {
        id: 'pas-001',
        name: 'Spaghetti Carbonara',
        description: 'Classic Roman pasta with eggs, pecorino cheese, pancetta, and black pepper',
        price: 18.99,
        originalPrice: 21.99,
        image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop',
        rating: 4.9,
        prepTime: '15-20 min',
        isPopular: true,
        discount: 15,
        dietaryInfo: [],
        hasCustomizations: true,
        customizationGroups: [
          {
            id: 'pasta-type',
            name: 'Pasta Type',
            required: true,
            minSelections: 1,
            maxSelections: 1,
            options: [
              { id: 'spaghetti', name: 'Spaghetti', price: 0, description: 'Traditional long pasta' },
              { id: 'fettuccine', name: 'Fettuccine', price: 1.00, description: 'Flat ribbon pasta' },
              { id: 'penne', name: 'Penne', price: 0, description: 'Tube-shaped pasta' }
            ]
          },
          {
            id: 'extras',
            name: 'Extra Toppings',
            required: false,
            minSelections: 0,
            maxSelections: 3,
            options: [
              { id: 'extra-cheese', name: 'Extra Pecorino', price: 2.50, description: 'Additional cheese' },
              { id: 'mushrooms', name: 'Sautéed Mushrooms', price: 3.00, description: 'Fresh mushrooms' },
              { id: 'truffle', name: 'Truffle Oil', price: 4.99, description: 'Premium truffle oil drizzle' }
            ]
          }
        ]
      }
    ],
    pizza: [
      {
        id: 'piz-001',
        name: 'Margherita Pizza',
        description: 'San Marzano tomatoes, fresh mozzarella, basil, and extra virgin olive oil',
        price: 16.99,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop',
        rating: 4.8,
        prepTime: '18-25 min',
        isPopular: true,
        discount: null,
        dietaryInfo: ['vegetarian'],
        hasCustomizations: true,
        customizationGroups: [
          {
            id: 'size',
            name: 'Pizza Size',
            required: true,
            minSelections: 1,
            maxSelections: 1,
            options: [
              { id: 'personal', name: 'Personal (10")', price: 0, description: 'Perfect for one' },
              { id: 'medium', name: 'Medium (12")', price: 3.00, description: 'Serves 2-3 people' },
              { id: 'large', name: 'Large (16")', price: 6.00, description: 'Serves 3-4 people' }
            ]
          }
        ]
      }
    ],
    mains: [
      {
        id: 'mai-001',
        name: 'Osso Buco',
        description: 'Braised veal shanks with vegetables, white wine, and broth, served with risotto',
        price: 32.99,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
        rating: 4.9,
        prepTime: '35-45 min',
        isPopular: false,
        discount: null,
        dietaryInfo: [],
        hasCustomizations: false
      }
    ],
    desserts: [
      {
        id: 'des-001',
        name: 'Tiramisu',
        description: 'Classic Italian dessert with ladyfingers, mascarpone, coffee, and cocoa',
        price: 8.99,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop',
        rating: 4.7,
        prepTime: '5 min',
        isPopular: true,
        discount: null,
        dietaryInfo: ['vegetarian'],
        hasCustomizations: false
      }
    ],
    beverages: [
      {
        id: 'bev-001',
        name: 'Italian Soda',
        description: 'Refreshing sparkling water with your choice of Italian syrup flavors',
        price: 4.99,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop',
        rating: 4.3,
        prepTime: '2 min',
        isPopular: false,
        discount: null,
        dietaryInfo: ['vegetarian', 'vegan', 'gluten-free'],
        hasCustomizations: true,
        customizationGroups: [
          {
            id: 'flavor',
            name: 'Syrup Flavor',
            required: true,
            minSelections: 1,
            maxSelections: 1,
            options: [
              { id: 'lemon', name: 'Lemon', price: 0, description: 'Fresh citrus flavor' },
              { id: 'cherry', name: 'Cherry', price: 0, description: 'Sweet cherry flavor' },
              { id: 'vanilla', name: 'Vanilla', price: 0, description: 'Classic vanilla' }
            ]
          }
        ]
      }
    ]
  };

  // Initialize search from navigation state
  useEffect(() => {
    if (location?.state?.searchQuery) {
      setSearchQuery(location?.state?.searchQuery);
    }
  }, [location?.state]);

  // Filter and sort menu items
  const getFilteredItems = (categoryItems) => {
    let filtered = [...categoryItems];

    // Apply search filter
    if (searchQuery?.trim()) {
      filtered = filtered?.filter(item =>
        item?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        item?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }

    // Apply dietary filters
    if (filters?.dietary?.length > 0) {
      filtered = filtered?.filter(item =>
        filters?.dietary?.some(diet => item?.dietaryInfo?.includes(diet))
      );
    }

    // Apply sorting
    switch (filters?.sort) {
      case 'price-low':
        filtered?.sort((a, b) => a?.price - b?.price);
        break;
      case 'price-high':
        filtered?.sort((a, b) => b?.price - a?.price);
        break;
      case 'rating':
        filtered?.sort((a, b) => (b?.rating || 0) - (a?.rating || 0));
        break;
      case 'popular':
      default:
        filtered?.sort((a, b) => {
          if (a?.isPopular && !b?.isPopular) return -1;
          if (!a?.isPopular && b?.isPopular) return 1;
          return (b?.rating || 0) - (a?.rating || 0);
        });
        break;
    }

    return filtered;
  };

  // Handle adding items to cart
  const handleAddToCart = (item, quantity) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart?.items?.findIndex(
        cartItem => cartItem?.id === item?.id && cartItem?.customizations === item?.customizations
      );

      let newItems;
      if (existingItemIndex >= 0) {
        newItems = [...prevCart?.items];
        if (quantity === 0) {
          newItems?.splice(existingItemIndex, 1);
        } else {
          newItems[existingItemIndex] = { ...newItems?.[existingItemIndex], quantity };
        }
      } else if (quantity > 0) {
        newItems = [...prevCart?.items, { 
          ...item, 
          quantity,
          price: item?.finalPrice || item?.price
        }];
      } else {
        newItems = prevCart?.items;
      }

      const itemCount = newItems?.reduce((sum, item) => sum + item?.quantity, 0);
      const subtotal = newItems?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0);
      const total = subtotal + restaurant?.deliveryFee;

      return {
        items: newItems,
        itemCount,
        subtotal,
        total
      };
    });
  };

  // Handle item customization
  const handleCustomizeItem = (item) => {
    setCustomizationModal({ isOpen: true, item });
  };

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => {
      if (filterType === 'dietary') {
        const newDietary = prev?.dietary?.includes(value)
          ? prev?.dietary?.filter(item => item !== value)
          : [...prev?.dietary, value];
        return { ...prev, dietary: newDietary };
      } else if (filterType === 'sort') {
        return { ...prev, sort: value };
      }
      return prev;
    });
  };

  // Clear all filters
  const handleClearFilters = () => {
    setFilters({ dietary: [], sort: 'popular' });
    setSearchQuery('');
  };

  // Handle restaurant actions
  const handleFavoriteToggle = (restaurantId, isFavorite) => {
    console.log('Toggle favorite:', restaurantId, isFavorite);
  };

  const handleShare = (restaurant) => {
    if (navigator.share) {
      navigator.share({
        title: restaurant?.name,
        text: `Check out ${restaurant?.name} on ZeptoFood!`,
        url: window.location?.href,
      });
    } else {
      navigator.clipboard?.writeText(window.location?.href);
      // In a real app, show a toast notification
      console.log('Link copied to clipboard');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Restaurant Header */}
          <RestaurantHeader
            restaurant={restaurant}
            onFavoriteToggle={handleFavoriteToggle}
            onShare={handleShare}
          />

          {/* Category Navigation */}
          <CategoryNavigation
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          <div className="flex flex-col lg:flex-row gap-8 mt-8">
            {/* Main Content */}
            <div className="flex-1">
              {/* Filters */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-heading font-bold text-foreground">
                    Menu Items
                  </h2>
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden flex items-center space-x-2 text-primary font-body font-medium"
                  >
                    <span>Filters</span>
                    <Icon name={showFilters ? "ChevronUp" : "ChevronDown"} size={16} />
                  </button>
                </div>

                <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
                  <MenuFilters
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    activeFilters={filters}
                    onFilterChange={handleFilterChange}
                    onClearFilters={handleClearFilters}
                  />
                </div>
              </div>

              {/* Menu Sections */}
              <div className="space-y-8">
                {categories?.map((category) => {
                  const categoryItems = menuItems?.[category?.id] || [];
                  const filteredItems = getFilteredItems(categoryItems);
                  
                  if (filteredItems?.length === 0 && (searchQuery || filters?.dietary?.length > 0)) {
                    return null;
                  }

                  return (
                    <MenuSection
                      key={category?.id}
                      category={category}
                      items={filteredItems}
                      onAddToCart={handleAddToCart}
                      onCustomizeItem={handleCustomizeItem}
                    />
                  );
                })}
              </div>

              {/* No Results */}
              {(searchQuery || filters?.dietary?.length > 0) && 
               categories?.every(cat => getFilteredItems(menuItems?.[cat?.id] || [])?.length === 0) && (
                <div className="text-center py-12">
                  <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                    No items found
                  </h3>
                  <p className="text-muted-foreground font-body mb-4">
                    Try adjusting your search or filters to find what you're looking for.
                  </p>
                  <button
                    onClick={handleClearFilters}
                    className="text-primary font-body font-medium hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Cart Summary */}
        <CartSummary
          cart={cart}
          restaurant={restaurant}
          isVisible={cart?.items?.length > 0}
        />

        {/* Customization Modal */}
        <CustomizationModal
          item={customizationModal?.item}
          isOpen={customizationModal?.isOpen}
          onClose={() => setCustomizationModal({ isOpen: false, item: null })}
          onAddToCart={handleAddToCart}
        />
      </main>
    </div>
  );
};

export default RestaurantMenu;