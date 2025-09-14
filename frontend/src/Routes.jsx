import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ShoppingCart from './pages/shopping-cart';
import LoginPage from './pages/login';
import OrderTracking from './pages/order-tracking';
import RestaurantMenu from './pages/restaurant-menu';
import Checkout from './pages/checkout';
import Register from './pages/register';
import { UserAccount } from "pages/user/UserAccount";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Checkout />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/order-tracking" element={<OrderTracking />} />
        <Route path="/restaurant-menu" element={<RestaurantMenu />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user-accounts" element={<UserAccount />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
