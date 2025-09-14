import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Mock credentials for authentication
  const mockCredentials = {
    email: 'john.doe@example.com',
    password: 'password123'
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  // const handleSubmit = async (e) => {
  //   e?.preventDefault();
    
  //   if (!validateForm()) {
  //     return;
  //   }

  //   setIsLoading(true);

  //   // Simulate API call
  //   setTimeout(() => {
  //     if (formData?.email === mockCredentials?.email && formData?.password === mockCredentials?.password) {
  //       // Successful login
  //       localStorage.setItem('isAuthenticated', 'true');
  //       localStorage.setItem('user', JSON.stringify({
  //         email: formData?.email,
  //         name: 'John Doe',
  //         loginTime: new Date()?.toISOString()
  //       }));
  //       navigate('/restaurant-menu');
  //     } else {
  //       // Failed login
  //       setErrors({
  //         general: 'Invalid email or password. Please try again.'
  //       });
  //     }
  //     setIsLoading(false);
  //   }, 1500);
  // };

  const handleSubmit = async (e) => {
  e?.preventDefault();

  if (!validateForm()) {
    return;
  }

  setIsLoading(true);

  try {
    const response = await fetch("http://localhost:4000/login-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData?.email,
        password: formData?.password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      // login failed
      setErrors({
        general: data?.error || "Invalid email or password. Please try again.",
      });
      setIsLoading(false);
      return;
    }

    // ✅ Successful login
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem(
      "user",
      JSON.stringify({
        email: data?.email,
        name: data?.fullName,
        userId: data?.userId,
        loginTime: new Date()?.toISOString(),
      })
    );

    navigate("/restaurant-menu", {
      state: {
        message: "Welcome back! 🎉",
        loggedIn: true,
      },
    });

  } catch (error) {
    setErrors({ general: "Server error. Please try again." });
  } finally {
    setIsLoading(false);
  }
};

  const handleForgotPassword = () => {
    // In real app, this would navigate to forgot password page
    alert('Forgot password functionality would be implemented here');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Error Message */}
        {errors?.general && (
          <div className="bg-error/10 border border-error/20 rounded-lg p-4 flex items-center space-x-3">
            <Icon name="AlertCircle" size={20} className="text-error flex-shrink-0" />
            <p className="text-error text-sm font-medium">{errors?.general}</p>
          </div>
        )}

        {/* Email Field */}
        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData?.email}
          onChange={handleInputChange}
          error={errors?.email}
          required
          className="w-full"
        />

        {/* Password Field */}
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData?.password}
          onChange={handleInputChange}
          error={errors?.password}
          required
          className="w-full"
        />

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <Checkbox
            label="Remember me"
            name="rememberMe"
            checked={formData?.rememberMe}
            onChange={handleInputChange}
            size="sm"
          />
          
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-sm text-primary hover:text-primary/80 font-medium transition-smooth"
          >
            Forgot Password?
          </button>
        </div>

        {/* Sign In Button */}
        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isLoading}
          iconName="LogIn"
          iconPosition="left"
          className="mt-6"
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;