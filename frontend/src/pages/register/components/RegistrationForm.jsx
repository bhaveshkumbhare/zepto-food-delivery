import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);

  const validatePassword = (password) => {
    const requirements = {
      length: password?.length >= 8,
      uppercase: /[A-Z]/?.test(password),
      lowercase: /[a-z]/?.test(password),
      number: /\d/?.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/?.test(password)
    };
    return requirements;
  };

  const getPasswordStrength = (password) => {
    const requirements = validatePassword(password);
    const score = Object.values(requirements)?.filter(Boolean)?.length;
    
    if (score < 2) return { level: 'weak', color: 'text-red-500', bg: 'bg-red-500' };
    if (score < 4) return { level: 'medium', color: 'text-yellow-500', bg: 'bg-yellow-500' };
    return { level: 'strong', color: 'text-green-500', bg: 'bg-green-500' };
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData?.fullName?.trim()?.length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData?.phone)) {
      newErrors.phone = 'Phone number must be exactly 10 digits';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else {
      const requirements = validatePassword(formData?.password);
      if (!requirements?.length) {
        newErrors.password = 'Password must be at least 8 characters long';
      }
    }

    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!agreedToTerms) {
      newErrors.terms = 'You must agree to the Terms of Service';
    }

    if (!agreedToPrivacy) {
      newErrors.privacy = 'You must agree to the Privacy Policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

//   const handleSubmit = async (e) => {
//     e?.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     // Register the user
    

//     setIsLoading(true);

//     try {
//       const response = await fetch("http://localhost:4000/user-account-details", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(formData),
//     });

//     console.log(data)

//     const data = await response.json();

//     if (!response.ok) {
//       // show error returned from backend
//       setErrors({ submit: data.error || "Registration failed" });
//       return;
//     }

//     // success → redirect to restaurant menu
//     navigate("/restaurant-menu", {
//       state: {
//         message: "Registration successful! Welcome to ZeptoFood!",
//         newUser: true,
//       },
//     });
// } catch (error) {
//     setErrors({ submit: "Server error. Please try again." });
//   } finally {
//     setIsLoading(false);
//   }}

const handleSubmit = async (e) => {
  e?.preventDefault();

  if (!validateForm()) {
    return;
  }

  setIsLoading(true);

  try {
    const response = await fetch("http://localhost:4000/user-account-details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json(); // ✅ parse response first
    console.log("Registration response:", data);

    if (!response.ok) {
      // show error returned from backend
      setErrors({ submit: data.error || "Registration failed" });
      return;
    }

    // success → redirect to restaurant menu
    navigate("/restaurant-menu", {
      state: {
        message: "Registration successful! Welcome to ZeptoFood!",
        newUser: true,
      },
    });
  } catch (error) {
    setErrors({ submit: "Server error. Please try again." });
  } finally {
    setIsLoading(false);
  }
};

  const passwordStrength = formData?.password ? getPasswordStrength(formData?.password) : null;
  const passwordRequirements = formData?.password ? validatePassword(formData?.password) : {};

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <Input
          label="Full Name"
          type="text"
          name="fullName"
          placeholder="Enter your full name"
          value={formData?.fullName}
          onChange={handleInputChange}
          error={errors?.fullName}
          required
          className="w-full"
        />

        {/* Email */}
        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="Enter your email address"
          value={formData?.email}
          onChange={handleInputChange}
          error={errors?.email}
          required
          className="w-full"
        />

        {/* Phone */}
        <Input
          label="Phone Number"
          type="tel"
          name="phone"
          placeholder="Enter your phone number"
          value={formData?.phone}
          onChange={handleInputChange}
          error={errors?.phone}
          required
          className="w-full"
        />

        {/* Password */}
        <div className="space-y-2">
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Create a strong password"
            value={formData?.password}
            onChange={handleInputChange}
            error={errors?.password}
            required
            className="w-full"
          />
          
          {/* Password Strength Indicator */}
          {formData?.password && (
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${passwordStrength?.bg}`}
                    style={{ 
                      width: `${(Object.values(passwordRequirements)?.filter(Boolean)?.length / 5) * 100}%` 
                    }}
                  ></div>
                </div>
                <span className={`text-sm font-medium ${passwordStrength?.color}`}>
                  {passwordStrength?.level}
                </span>
              </div>
              
              <div className="text-xs text-muted-foreground space-y-1">
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={passwordRequirements?.length ? "Check" : "X"} 
                    size={12} 
                    className={passwordRequirements?.length ? "text-green-500" : "text-gray-400"}
                  />
                  <span>At least 8 characters</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={passwordRequirements?.uppercase ? "Check" : "X"} 
                    size={12} 
                    className={passwordRequirements?.uppercase ? "text-green-500" : "text-gray-400"}
                  />
                  <span>One uppercase letter</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={passwordRequirements?.number ? "Check" : "X"} 
                    size={12} 
                    className={passwordRequirements?.number ? "text-green-500" : "text-gray-400"}
                  />
                  <span>One number</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          placeholder="Confirm your password"
          value={formData?.confirmPassword}
          onChange={handleInputChange}
          error={errors?.confirmPassword}
          required
          className="w-full"
        />

        {/* Terms and Privacy Checkboxes */}
        <div className="space-y-4">
          <Checkbox
            label={
              <span className="text-sm text-foreground">
                I agree to the{' '}
                <button
                  type="button"
                  className="text-primary hover:underline font-medium"
                  onClick={() => window.open('/terms', '_blank')}
                >
                  Terms of Service
                </button>
              </span>
            }
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e?.target?.checked)}
            error={errors?.terms}
            required
          />

          <Checkbox
            label={
              <span className="text-sm text-foreground">
                I agree to the{' '}
                <button
                  type="button"
                  className="text-primary hover:underline font-medium"
                  onClick={() => window.open('/privacy', '_blank')}
                >
                  Privacy Policy
                </button>
              </span>
            }
            checked={agreedToPrivacy}
            onChange={(e) => setAgreedToPrivacy(e?.target?.checked)}
            error={errors?.privacy}
            required
          />
        </div>

        {/* Submit Error */}
        {errors?.submit && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} className="text-red-500" />
              <span className="text-sm text-red-700">{errors?.submit}</span>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isLoading}
          disabled={isLoading}
          iconName="UserPlus"
          iconPosition="left"
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </Button>

        {/* Login Link */}
        <div className="text-center">
          <span className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-primary hover:underline font-medium"
            >
              Sign in here
            </button>
          </span>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;