import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Video, LogOut, Sun, Moon } from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const isLandingPage = location.pathname === '/';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  // Dynamic class styling based on whether it is the landing page
  const navClass = isLandingPage
    ? "fixed top-0 left-0 right-0 z-50 h-16 flex items-center backdrop-blur-md border-b border-theme-lightgray/40 dark:border-border-primary/40 bg-theme-offwhite/90 dark:bg-primary/90 text-theme-charcoal dark:text-theme-offwhite transition-colors duration-300"
    : "fixed top-0 left-0 right-0 z-50 h-16 flex items-center backdrop-blur-md border-b bg-offwhite/90 text-primary border-gray-200/80 dark:bg-primary/90 dark:text-white dark:border-border-primary/80 transition-all duration-300";

  const brandClass = isLandingPage
    ? "flex items-center gap-2.5 text-base font-bold no-underline text-theme-charcoal dark:text-white transition-transform hover:scale-[1.01]"
    : "flex items-center gap-2.5 text-base font-bold no-underline text-primary dark:text-white hover:scale-[1.01] transition-transform";

  const brandIconContainerClass = isLandingPage
    ? "w-8 h-8 bg-theme-charcoal dark:bg-brand rounded-xl flex items-center justify-center text-theme-lime dark:text-primary shadow-sm"
    : "w-8 h-8 bg-primary rounded-xl flex items-center justify-center text-brand shadow-md dark:bg-brand dark:text-primary";

  const themeTogglerClass = isLandingPage
    ? "w-[34px] h-[34px] rounded-full bg-transparent border border-theme-lightgray/60 dark:border-border-primary/60 flex items-center justify-center cursor-pointer transition-all duration-150 text-theme-charcoal/70 dark:text-theme-offwhite/70 hover:text-theme-charcoal dark:hover:text-white hover:border-theme-charcoal dark:hover:border-white"
    : "w-[34px] h-[34px] rounded-full bg-transparent border border-gray-300 dark:border-border-primary flex items-center justify-center cursor-pointer transition-all duration-150 text-secondary dark:text-offwhite/70 hover:text-primary dark:hover:text-white hover:border-primary dark:hover:border-white";

  const adminBtnClass = isLandingPage
    ? "inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border border-theme-lightgray dark:border-border-primary/60 hover:border-theme-charcoal dark:hover:border-white no-underline text-theme-charcoal dark:text-theme-offwhite bg-theme-white dark:bg-surface transition-all duration-150"
    : "inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-full border border-gray-300 dark:border-border-primary no-underline text-primary dark:text-white bg-white dark:bg-surface hover:bg-gray-50 dark:hover:bg-surface-hover hover:border-primary dark:hover:border-white transition-all duration-150";

  const logoutBtnClass = isLandingPage
    ? "inline-flex items-center justify-center gap-1.5 px-4 py-1.5 text-xs font-bold rounded-full border border-theme-lightgray dark:border-border-primary/60 hover:border-theme-charcoal dark:hover:border-white bg-transparent cursor-pointer transition-all duration-150 text-theme-charcoal dark:text-theme-offwhite"
    : "inline-flex items-center justify-center gap-1.5 px-4 py-1.5 text-xs font-bold rounded-full border border-gray-300 dark:border-border-primary bg-transparent cursor-pointer transition-all duration-150 text-secondary dark:text-offwhite hover:text-primary dark:hover:text-white hover:border-primary dark:hover:border-white";

  return (
    <nav className={navClass}>
      <div className="max-w-[1120px] w-full mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          to={isAuthenticated ? (user?.role === 'ADMIN' ? "/admin" : "/dashboard") : "/"}
          className={brandClass}
        >
          <div className={brandIconContainerClass}>
            <Video size={18} />
          </div>
          <span className="font-[Outfit] tracking-tight text-lg">Vidor</span>
        </Link>

        {/* Center Links (Only on Landing Page) */}
        {isLandingPage && (
          <div className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-sm font-semibold text-theme-charcoal/80 dark:text-theme-offwhite/80 hover:text-theme-charcoal dark:hover:text-white hover:scale-[1.02] transition-all no-underline">
              Home
            </a>
            <a href="#features" className="text-sm font-semibold text-theme-charcoal/80 dark:text-theme-offwhite/80 hover:text-theme-charcoal dark:hover:text-white hover:scale-[1.02] transition-all no-underline">
              Features
            </a>
            <a href="#pricing" className="text-sm font-semibold text-theme-charcoal/80 dark:text-theme-offwhite/80 hover:text-theme-charcoal dark:hover:text-white hover:scale-[1.02] transition-all no-underline">
              Pricing Plan
            </a>
            <a href="#about" className="text-sm font-semibold text-theme-charcoal/80 dark:text-theme-offwhite/80 hover:text-theme-charcoal dark:hover:text-white hover:scale-[1.02] transition-all no-underline">
              About
            </a>
          </div>
        )}

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className={themeTogglerClass}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {isAuthenticated ? (
            <>
              {user?.role === 'ADMIN' && (
                <Link
                  to="/admin"
                  className={adminBtnClass}
                >
                  Admin Panel
                </Link>
              )}
              <div className="flex items-center gap-2 px-3 py-1 rounded-full text-sm text-secondary dark:text-offwhite/85">
                <div className="w-7 h-7 rounded-full bg-primary text-brand dark:bg-brand dark:text-primary flex items-center justify-center text-[11px] font-bold shadow-sm">
                  {getInitials(user?.name)}
                </div>
                <span className="hidden sm:inline font-[Outfit] font-semibold">{user?.name || 'User'}</span>
              </div>
              <button
                onClick={handleLogout}
                className={logoutBtnClass}
                title="Log Out"
              >
                <LogOut size={14} />
                <span className="font-[Outfit]">Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-4 py-1.5 text-xs font-bold rounded-full border border-transparent hover:bg-theme-lightgray/30 dark:hover:bg-theme-charcoal/50 text-theme-charcoal dark:text-theme-offwhite no-underline transition-all duration-150"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="inline-flex items-center justify-center px-4 py-1.5 text-xs font-bold rounded-full bg-theme-charcoal dark:bg-theme-lime hover:bg-theme-charcoal/90 dark:hover:bg-theme-lime/90 text-theme-white dark:text-theme-charcoal no-underline border border-theme-charcoal dark:border-theme-lime transition-all duration-150 shadow-sm"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
