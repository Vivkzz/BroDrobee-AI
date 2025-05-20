
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../App.tsx';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import AuthForm from '../components/AuthForm';

const AuthPage = () => {
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const { user, session } = useUser();
  const navigate = useNavigate();
  
  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);
  
  const handleAuth = async (userData) => {
    try {
      if (mode === 'signup') {
        const { data, error } = await supabase.auth.signUp({
          email: userData.email,
          password: userData.password,
          options: {
            // This ensures we get redirected back to our app after email verification
            emailRedirectTo: window.location.origin
          }
        });
        
        if (error) {
          console.error("Signup error:", error);
          toast({
            title: "Sign up failed",
            description: error.message,
            variant: "destructive",
          });
          throw error;
        }
        
        if (data?.user) {
          toast({
            title: "Account created",
            description: "Please check your email to verify your account before logging in.",
          });
          
          // Switch to login mode after successful signup
          setMode('login');
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: userData.email,
          password: userData.password,
        });
        
        if (error) {
          console.error("Login error:", error);
          toast({
            title: "Login failed",
            description: error.message,
            variant: "destructive",
          });
          throw error;
        }
        
        if (data?.user) {
          toast({
            title: "Login successful",
            description: "Welcome back!",
          });
          
          // After login navigate to dashboard
          navigate('/dashboard');
        }
      }
    } catch (error) {
      console.error("Authentication error:", error);
      toast({
        title: "Authentication error",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
      throw error;
    }
  };
  
  return (
    <div className="min-h-screen flex justify-center items-center bg-fashion-light-gray">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-fashion-deep-purple">StyleSync AI</h1>
          <p className="text-gray-600 mt-2">Your personal AI wardrobe assistant</p>
        </div>
        
        <div className="fashion-card p-8">
          <div className="flex border-b border-gray-200 mb-6">
            <button 
              onClick={() => setMode('login')} 
              className={`flex-1 py-2 text-center font-medium ${mode === 'login' ? 'text-fashion-purple border-b-2 border-fashion-purple' : 'text-gray-500'}`}
            >
              Login
            </button>
            <button 
              onClick={() => setMode('signup')} 
              className={`flex-1 py-2 text-center font-medium ${mode === 'signup' ? 'text-fashion-purple border-b-2 border-fashion-purple' : 'text-gray-500'}`}
            >
              Sign Up
            </button>
          </div>
          
          <AuthForm mode={mode} onSubmit={handleAuth} />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
