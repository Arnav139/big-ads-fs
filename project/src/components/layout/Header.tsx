import React, { useState } from 'react';
import { Menu, Bell, Settings, LogOut, X, Copy, Check } from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import { cn } from '@/lib/utils';
import { WalletIcon } from 'lucide-react';

const Header: React.FC<{ isSidebarOpen: boolean; setIsSidebarOpen: any }> = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const { disconnect, address, userData } = useAuthStore();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address as string);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Left Section: Menu Toggle + Title */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg lg:hidden flex-shrink-0"
            aria-label="Toggle Sidebar"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <h1 className="text-lg md:text-xl font-semibold text-gray-800 truncate">
            Bigads Dashboard
          </h1>
        </div>

        {/* Right Section: Profile Toggle */}
        <div className="relative flex items-center">
          {/* Profile Icon (Always Visible) */}
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="h-8 w-8 rounded-full bg-indigo-600 mr-2 flex items-center justify-center flex-shrink-0"
            aria-label="Toggle Profile Options"
          >
            <span className="text-white text-xs sm:text-sm font-medium">GC</span>
          </button>

          {/* Dropdown for Small Screens / Full Layout for Larger Screens */}
          <div
            className={cn(
              "flex items-center gap-2 sm:gap-4",
              "sm:static sm:flex",
              isProfileOpen ? "absolute top-12 right-0 bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex-col" : "hidden",
              "sm:bg-transparent sm:border-none sm:shadow-none sm:p-0 sm:flex-row"
            )}
          >
            {address && (
              <div className="flex items-start flex-col sm:flex-row gap-2 sm:whitespace-nowrap"> 
                {userData && (
                  <span
                    className={cn(
                      "px-2 py-1 text-xs font-semibold rounded",
                      "bg-green-100 text-green-800"
                    )}
                  >
                    <span className='hidden sm:inline text-xs'>ID:</span> {userData.userId}
                  </span>
                )}
                <span className="text-xs sm:text-sm text-gray-600 flex items-center">
                  {/* Conditionally render the wallet icon for smaller screens */}
                  <span className="sm:hidden">
                    <WalletIcon className="w-4 h-4 text-gray-600 mr-2"  />
                  </span>
                  {address.slice(0, 4)}...{address.slice(-4)}
                  {/* Copy button for larger screens */}
                  <button
                    onClick={handleCopyAddress}
                    className=" p-1 hover:bg-gray-100 rounded text-gray-400"
                    aria-label="Copy Wallet Address"
                  >
                    {isCopied ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-600" />
                    )}
                  </button>
                </span>
              </div>
            )}
            <button
              className=" hover:bg-gray-100 rounded-lg flex gap-2 items-center"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              <span className="text-sm text-gray-600 sm:hidden">Notifications</span>
            </button>
            <button
              className=" hover:bg-gray-100 rounded-lg flex items-center gap-2 w-full text-left"
              aria-label="Settings"
            >
              <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              <span className="text-sm text-gray-600 sm:hidden">Settings</span>
            </button>
            <button
              onClick={disconnect}
              className=" hover:bg-gray-100 rounded-lg flex items-center gap-2 w-full text-left text-red-600"
              title="Disconnect Wallet"
              aria-label="Disconnect Wallet"
            >
              <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:hidden">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;