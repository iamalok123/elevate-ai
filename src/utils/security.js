// Security utilities for the IDP application

// Sanitize user input to prevent XSS attacks
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
};

// Validate email format
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate password strength
export const validatePassword = (password) => {
  const minLength = 6;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  
  return {
    isValid: password.length >= minLength && hasLetter && hasNumber,
    minLength,
    hasLetter,
    hasNumber,
    strength: password.length >= 8 && hasLetter && hasNumber ? 'strong' : 
              password.length >= 6 && (hasLetter || hasNumber) ? 'medium' : 'weak'
  };
};

// Encrypt sensitive data (basic implementation)
export const encryptData = (data) => {
  // In a real application, use proper encryption libraries like crypto-js
  // This is a basic obfuscation for demo purposes
  return btoa(JSON.stringify(data));
};

// Decrypt sensitive data
export const decryptData = (encryptedData) => {
  try {
    return JSON.parse(atob(encryptedData));
  } catch (error) {
    console.error('Failed to decrypt data:', error);
    return null;
  }
};

// Secure storage with encryption
export const secureStorage = {
  setItem: (key, value) => {
    try {
      const encrypted = encryptData(value);
      localStorage.setItem(`secure_${key}`, encrypted);
      return true;
    } catch (error) {
      console.error('Failed to store data securely:', error);
      return false;
    }
  },
  
  getItem: (key) => {
    try {
      const encrypted = localStorage.getItem(`secure_${key}`);
      if (!encrypted) return null;
      return decryptData(encrypted);
    } catch (error) {
      console.error('Failed to retrieve data securely:', error);
      return null;
    }
  },
  
  removeItem: (key) => {
    localStorage.removeItem(`secure_${key}`);
  }
};

// Session management
export const sessionManager = {
  createSession: (userData) => {
    const sessionData = {
      user: userData,
      timestamp: Date.now(),
      expires: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
    };
    
    secureStorage.setItem('session', sessionData);
    return sessionData;
  },
  
  getSession: () => {
    const session = secureStorage.getItem('session');
    if (!session) return null;
    
    // Check if session has expired
    if (Date.now() > session.expires) {
      sessionManager.clearSession();
      return null;
    }
    
    return session;
  },
  
  clearSession: () => {
    secureStorage.removeItem('session');
  },
  
  isSessionValid: () => {
    const session = sessionManager.getSession();
    return session !== null;
  }
};

// Input validation
export const validators = {
  required: (value) => !!value || 'This field is required',
  
  email: (value) => validateEmail(value) || 'Please enter a valid email address',
  
  password: (value) => {
    const validation = validatePassword(value);
    return validation.isValid || `Password must be at least ${validation.minLength} characters with letters and numbers`;
  },
  
  minLength: (min) => (value) => 
    value.length >= min || `Must be at least ${min} characters`,
  
  maxLength: (max) => (value) => 
    value.length <= max || `Must be no more than ${max} characters`,
  
  numeric: (value) => !isNaN(value) || 'Must be a number',
  
  positive: (value) => parseFloat(value) > 0 || 'Must be a positive number'
};

// Rate limiting (simple implementation)
export const rateLimiter = {
  attempts: new Map(),
  
  checkLimit: (key, maxAttempts = 5, windowMs = 15 * 60 * 1000) => {
    const now = Date.now();
    const userAttempts = rateLimiter.attempts.get(key) || [];
    
    // Remove old attempts outside the time window
    const recentAttempts = userAttempts.filter(timestamp => now - timestamp < windowMs);
    
    if (recentAttempts.length >= maxAttempts) {
      return false;
    }
    
    recentAttempts.push(now);
    rateLimiter.attempts.set(key, recentAttempts);
    return true;
  },
  
  clearAttempts: (key) => {
    rateLimiter.attempts.delete(key);
  }
};
