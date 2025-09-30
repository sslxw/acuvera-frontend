import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Recycle, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSessionStore } from '@/store/useSessionStore';
import { cn } from '@/lib/utils';

const BIN_NAMES: Record<string, string> = {
  '1': 'Bin 1',
  '2': 'Bin 2',
  '3': 'Bin 3',
  '4': 'Bin 4',
  '5': 'Bin 5',
  '6': 'Bin 6',
  '7': 'Bin 7',
  '8': 'Bin 8'
};

export const NavBar: React.FC = () => {
  const location = useLocation();
  const { isDarkMode, setDarkMode, currentBin, logout } = useSessionStore();

  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
    // Apply dark mode to document
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const navItems = [
    { path: '/classify', label: 'Classify', exact: true },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/review', label: 'Review' }
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="relative">
              <Recycle className="h-8 w-8 text-primary" />
              <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" />
            </div>
            <span className="text-xl font-bold gradient-text">Acuvera</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  (item.exact ? location.pathname === item.path : location.pathname.startsWith(item.path))
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Current Bin & Actions */}
          <div className="flex items-center space-x-2">
            {currentBin && (
              <div className="hidden md:flex items-center space-x-2 px-3 py-1 bg-muted rounded-lg">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span className="text-sm font-medium">
                  {BIN_NAMES[currentBin] || currentBin}
                </span>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="h-9 w-9"
            >
              {isDarkMode ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={logout}
              className="h-9 w-9"
            >
              <LogOut className="h-4 w-4" />
              <span className="sr-only">Logout</span>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <div className="flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex-1 px-3 py-2 rounded-md text-sm font-medium text-center transition-colors",
                  (item.exact ? location.pathname === item.path : location.pathname.startsWith(item.path))
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
