
import { useState } from 'react';
import { toast } from "@/components/ui/use-toast";

const AuthForm = ({ mode, onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }
    
    if (mode === 'signup' && password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }
    
    // Password strength validation
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }
    
    try {
      await onSubmit({ email, password });
    } catch (err) {
      setError(err.message || 'Authentication failed');
      toast({
        title: mode === 'login' ? "Login failed" : "Sign up failed",
        description: err.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-100 text-red-600 p-3 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="fashion-input w-full px-3 py-2"
          placeholder="your@email.com"
          required
        />
      </div>
      
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="fashion-input w-full px-3 py-2"
          placeholder="••••••••••"
          required
        />
      </div>
      
      {mode === 'signup' && (
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="fashion-input w-full px-3 py-2"
            placeholder="••••••••••"
            required
          />
        </div>
      )}
      
      <button 
        type="submit" 
        className="fashion-button w-full mt-6"
        disabled={loading}
      >
        {loading ? (
          <span>Loading...</span>
        ) : (
          mode === 'login' ? 'Login' : 'Create Account'
        )}
      </button>
      
      {mode === 'login' && (
        <p className="text-sm text-center text-gray-600 mt-4">
          <a href="#" className="text-fashion-purple hover:underline">
            Forgot your password?
          </a>
        </p>
      )}
    </form>
  );
};

export default AuthForm;
