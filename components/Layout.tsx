import React from 'react';
import { User, LogOut } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  onProfileClick?: () => void;
  onLogoutClick?: () => void;
  showNav?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, onProfileClick, onLogoutClick, showNav = true }) => {
  return (
    <div className="min-h-screen bg-[#0f172a] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/40 via-[#0f172a] to-[#0f172a] text-white overflow-x-hidden">
      {showNav && (
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center backdrop-blur-sm border-b border-white/5">
          <div className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 cursor-pointer">
            DAREDASH
          </div>
          <div className="flex gap-4">
             {onProfileClick && (
                <button onClick={onProfileClick} className="p-2 rounded-full hover:bg-white/10 transition">
                  <User className="w-6 h-6 text-gray-300" />
                </button>
             )}
             {onLogoutClick && (
                <button onClick={onLogoutClick} className="p-2 rounded-full hover:bg-white/10 transition" title="Exit Game">
                  <LogOut className="w-6 h-6 text-gray-300" />
                </button>
             )}
          </div>
        </nav>
      )}
      <main className="container mx-auto px-4 pt-24 pb-12 min-h-screen flex flex-col">
        {children}
      </main>
    </div>
  );
};