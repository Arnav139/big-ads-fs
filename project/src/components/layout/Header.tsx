import React from 'react';
import { Menu, Bell, Settings, LogOut } from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import { cn } from '@/lib/utils';

const Header: React.FC = () => {
  const { disconnect, address, userData } = useAuthStore();

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-gray-100 rounded-lg lg:hidden">
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-semibold text-gray-800">Bigads Dashboard</h1>
        </div>
        
        <div className="flex items-center gap-4">
          {address && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                {address.slice(0, 6)}...{address.slice(-4)}
              </span>
              {userData && (
                <span className={cn(
                  "px-2 py-1 text-xs font-medium rounded-full",
                  "bg-green-100 text-green-800"
                )}>
                  ID: {userData.userId}
                </span>
              )}
            </div>
          )}
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Bell className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={disconnect}
            className="p-2 hover:bg-gray-100 rounded-lg text-red-600"
            title="Disconnect Wallet"
          >
            <LogOut className="w-5 h-5" />
          </button>
          <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center">
            <span className="text-white text-sm font-medium">GC</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;