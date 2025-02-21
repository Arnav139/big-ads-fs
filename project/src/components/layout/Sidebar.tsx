import React from 'react';
import { Home, GamepadIcon, CalendarClock, Key, FileText, BarChart3, BookOpen, UserPlus } from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import { parse } from 'uuid';
import { Link } from 'react-router-dom';

const navigation = [
  { name: 'Overview', icon: Home, href: '/dashboard' },
  { name: 'Games', icon: GamepadIcon, href: '/dashboard/games' },
  { name: 'Events', icon: CalendarClock, href: '/dashboard/events' },
  { name: 'API Keys', icon: Key, href: '/dashboard/api-keys' },
  { name: 'Documentation', icon: BookOpen, href: '/dashboard/docs' },
  { name: 'Analytics', icon: BarChart3, href: '/dashboard/analytics' },
  { name: 'Pending Requests', icon: UserPlus, href: '/dashboard/pending-requests' },
];

const Sidebar: React.FC = () => {
  const { isAuthenticated, user } = useAuthStore();
  
  // Get user role from localStorage
  const getAuthFromStorage = () => {
    const authData = localStorage.getItem('auth-storage');
    console.log(authData, "authData")
    if (authData) {
      try {
        const parsedData = JSON.parse(authData);
        console.log(parsedData?.state?.userData?.role, "parsedData")
        return parsedData?.state?.userData?.role;
      } catch (error) {
        console.error('Error parsing auth data:', error);
        return null;
      }
    }
    return null;
  };

  // Filter navigation items based on user role from localStorage
  const filteredNavigation = navigation.filter(item => {
    if (item.name === 'Pending Requests') {
      const userRole = getAuthFromStorage();
      return userRole === 'admin';
    }
    return true;
  });

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
      <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
        <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
          <div className="flex flex-shrink-0 items-center px-4">
            <GamepadIcon className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">Bigads</span>
          </div>
          <nav className="mt-8 flex-1 space-y-1 px-2">
            {filteredNavigation.map((item) => (
              item.name === 'Documentation' ? (
                <a
                  key={item.name}
                  href="https://data-center-7yhai.ondigitalocean.app/api-docs"
                  target="_blank"
                  className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <item.icon
                    className="mr-3 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  onClick={(e) => {
                    if (!isAuthenticated) {
                      e.preventDefault();
                    }
                  }}
                >
                  <item.icon
                    className="mr-3 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              )
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;