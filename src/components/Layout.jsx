import { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../App.tsx';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

const Layout = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast({
          title: "Error signing out",
          description: error.message,
          variant: "destructive"
        });
        return;
      }
      navigate('/');
    } catch (error) {
      console.error('Sign out error:', error);
      toast({
        title: "Error signing out",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Side Navigation */}
      <aside className="bg-fashion-deep-purple text-white w-full md:w-64 md:min-h-screen p-6">
        <div className="flex items-center justify-center md:justify-start mb-8">
          <h1 className="text-xl font-bold">BroDrobe AI</h1>
        </div>

        <nav className="flex flex-row md:flex-col justify-around md:justify-start md:space-y-4">
          <Link
            to="/dashboard"
            className={`p-2 hover:bg-fashion-dark-purple rounded-md transition-colors duration-200 ${
              isActive('/dashboard')
                ? 'bg-fashion-purple text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Dashboard
          </Link>
          <Link
            to="/wardrobe"
            className={`p-2 hover:bg-fashion-dark-purple rounded-md transition-colors duration-200 ${
              isActive('/wardrobe')
                ? 'bg-fashion-purple text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            My Wardrobe
          </Link>
          <Link
            to="/profile"
            className={`p-2 hover:bg-fashion-dark-purple rounded-md transition-colors duration-200 ${
              isActive('/profile')
                ? 'bg-fashion-purple text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Profile
          </Link>
          <button
            onClick={handleSignOut}
            className="p-2 text-left hover:bg-fashion-dark-purple rounded-md transition-colors duration-200 md:mt-auto"
          >
            Sign Out
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
