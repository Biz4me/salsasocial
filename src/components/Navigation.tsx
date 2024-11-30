import { Link, useLocation } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { FiUser, FiBriefcase, FiMessageSquare } from 'react-icons/fi';
import ThemeToggle from './ThemeToggle';

export default function Navigation() {
  const location = useLocation();
  const { role, setRole } = useUser();

  return (
    <nav className="fixed top-0 left-0 right-0 glass-effect z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-2xl font-bold gradient-text">
            Salsa Social
          </Link>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-6">
              <Link 
                to="/events" 
                className={`transition-colors ${
                  location.pathname === '/events' 
                    ? 'gradient-text font-semibold' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Événements
              </Link>
              <Link 
                to="/profile" 
                className={`transition-colors ${
                  location.pathname === '/profile' 
                    ? 'gradient-text font-semibold' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Profil
              </Link>
              <Link 
                to="/messages"
                className={`p-2 rounded-full transition-colors hover:bg-gray-100 ${
                  location.pathname === '/messages'
                    ? 'text-primary'
                    : 'text-gray-600'
                }`}
                title="Messages"
              >
                <FiMessageSquare size={20} />
              </Link>
            </div>
            
            <div className="flex items-center space-x-3 pl-6 border-l border-gray-200">
              <ThemeToggle />
              
              {localStorage.getItem('userRole') === 'professional' && (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setRole('dancer')}
                    className={`p-2 rounded-full transition-all ${
                      role === 'dancer' 
                        ? 'gradient-bg text-white shadow-glow' 
                        : 'text-gray-500 hover:bg-gray-100'
                    }`}
                    title="Mode Danseur"
                  >
                    <FiUser size={20} />
                  </button>
                  <button
                    onClick={() => setRole('professional')}
                    className={`p-2 rounded-full transition-all ${
                      role === 'professional' 
                        ? 'gradient-bg text-white shadow-glow' 
                        : 'text-gray-500 hover:bg-gray-100'
                    }`}
                    title="Mode Professionnel"
                  >
                    <FiBriefcase size={20} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}